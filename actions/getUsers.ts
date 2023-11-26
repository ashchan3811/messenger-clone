import db from "@/lib/db";
import getCurrentSession from "@/actions/getCurrentSession";

const getUsers = async () => {
  try {
    const session = await getCurrentSession();
    if (!session?.user?.email) {
      return [];
    }

    const users = await db.user.findMany({
      where: {
        NOT: {
          email: session.user.email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch (err) {
    console.log("GET USERS ERROR", err);
    return [];
  }
};

export default getUsers;
