import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import _ from "lodash";

import db from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { PUSHER_EVENTS } from "@/types";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unuauthorized", { status: 401 });
    }

    const { message, image, conversationId } = await req.json();

    if (!conversationId || (!message && !image)) {
      return new NextResponse("Missing required data", { status: 401 });
    }

    const newMessage = await db.message.create({
      data: {
        body: message,
        image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    const updatedConversation = await db.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    await pusherServer.trigger(
      conversationId,
      PUSHER_EVENTS.newMessage,
      newMessage,
    );

    const lastMessage = _.last(updatedConversation.messages);
    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, PUSHER_EVENTS.updateConversation, {
        id: conversationId,
        message: [lastMessage],
      });
    });

    return NextResponse.json(newMessage);
  } catch (err) {
    console.log("SAVE MESSAGE ERROR", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
