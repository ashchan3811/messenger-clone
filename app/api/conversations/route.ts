import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

import db from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { PUSHER_EVENTS } from "@/types";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unuauthorized", { status: 401 });
    }

    const body = await req.json();

    // user id - one to one chat
    // isGroup, member, name - group chat
    const { userId, isGroup, members, name } = body;
    if (isGroup && (!members || members?.length < 2 || !name?.length)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
      const groupChat = await db.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: any) => {
                return {
                  id: member.value,
                };
              }),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      groupChat.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(
            user.email,
            PUSHER_EVENTS.CONVERSATION.NEW,
            groupChat,
          );
        }
      });

      return NextResponse.json(groupChat);
    }

    const existingConversations = await db.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
      include: {
        users: true,
      },
    });

    if (existingConversations?.length > 0) {
      return NextResponse.json(existingConversations[0]);
    }

    const newConversation = await db.conversation.create({
      data: {
        isGroup: false,
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          PUSHER_EVENTS.CONVERSATION.NEW,
          newConversation,
        );
      }
    });

    return NextResponse.json(newConversation);
  } catch (err) {
    console.log("SAVE CONVERSATION ERROR", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
