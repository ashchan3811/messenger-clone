import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { IConversation } from "@/types";

const useOtherUser = (conversation: IConversation) => {
  const session = useSession();
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    const otherUserList = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );

    return otherUserList[0];
  }, [session?.data?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;
