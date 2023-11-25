import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getCurrentSession = async () => {
  return await getServerSession(authOptions);
};

export default getCurrentSession;
