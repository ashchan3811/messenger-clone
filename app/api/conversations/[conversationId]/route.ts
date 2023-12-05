import { NextResponse } from "next/server";

import db from "@/lib/db";
import _ from "lodash";
import { IConversationParams } from "@/types";
import getCurrentUser from "@/actions/getCurrentUser";

export async function DELETE(
  req: Request,
  { params }: { params: IConversationParams },
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: params.conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid ID", { status: 404 });
    }

    const deletedConversation = await db.conversation.deleteMany({
      where: {
        id: params.conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (err) {
    console.log("CONVERSATION DELETE ERROR", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
