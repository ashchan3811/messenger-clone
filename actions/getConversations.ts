import db from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return [];
    }

    const conversations = await db.conversation.findMany({
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
      orderBy: {
        lastMessageAt: "desc",
      },
    });

    return conversations;
  } catch (err) {
    console.log("GET CONVERSATIONS ERROR", err);
    return [];
  }
};

export default getConversations;

