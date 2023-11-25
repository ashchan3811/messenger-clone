import db from "@/lib/db";

import getCurrentSession from "@/actions/getCurrentSession";

const getCurrentUser = async () => {
  try {
    const session = await getCurrentSession();
    if (session?.user?.email) {
      const currentUser = await db.user.findUnique({
        where: {
          email: session?.user.email,
        },
      });

      return currentUser || null;
    }

    return null;
  } catch (err) {
    console.log("GET CURRENT USER ERROR", err);
    return null;
  }
};

export default getCurrentUser;
