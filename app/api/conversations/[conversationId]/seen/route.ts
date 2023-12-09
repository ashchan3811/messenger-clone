import { NextResponse } from "next/server";
import _ from "lodash";

import db from "@/lib/db";
import { IConversationParams, PUSHER_EVENTS } from "@/types";
import getCurrentUser from "@/actions/getCurrentUser";
import { pusherServer } from "@/lib/pusher";

export async function POST(
  req: Request,
  { params }: { params: IConversationParams },
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unuauthorized", { status: 401 });
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: params.conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid ID", { status: 404 });
    }

    const lastMessage = _.last(conversation.messages);
    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    // update seen of last message
    const updatedMessage = await db.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    await pusherServer.trigger(
      currentUser.email,
      PUSHER_EVENTS.CONVERSATION.UPDATE,
      {
        id: params.conversationId,
        messages: [updatedMessage],
      },
    );

    if (lastMessage.seenIds.indexOf(currentUser.id) > -1) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(
      params.conversationId,
      PUSHER_EVENTS.MESSAGE.UPDATE,
      updatedMessage,
    );

    return NextResponse.json(updatedMessage);
  } catch (err) {
    console.log("SEEN ERROR", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
