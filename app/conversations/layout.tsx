import { IHaveChildren } from "@/types";
import Sidebar from "@/components/sidebar/Sidebar";

import getConversations from "@/actions/getConversations";

import ConversationList from "./components/ConversationList";
import getUsers from "@/actions/getUsers";

interface ConversationLayoutProps extends IHaveChildren {}

const ConversationLayout = async ({ children }: ConversationLayoutProps) => {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList users={users} initialConversations={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationLayout;
