import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

import db from "@/lib/db";

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

    await db.conversation.update({
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

    return NextResponse.json(newMessage);
  } catch (err) {
    console.log("SAVE MESSAGE ERROR", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
