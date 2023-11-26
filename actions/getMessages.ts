import db from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

const getMessages = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return [];
    }

    const messages = await db.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (err) {
    console.log("GET MESSAGES ERROR", err);
    return [];
  }
};

export default getMessages;
