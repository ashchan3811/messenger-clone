import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const getCurrentSession = async () => {
  return await getServerSession(authOptions);
};

export default getCurrentSession;
