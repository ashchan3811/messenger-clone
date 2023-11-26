import { IHaveChildren } from "@/types";
import Sidebar from "@/components/sidebar/Sidebar";

import getConversations from "@/actions/getConversations";

import ConversationList from "./components/ConversationList";

interface ConversationLayoutProps extends IHaveChildren {}

const ConversationLayout = async ({ children }: ConversationLayoutProps) => {
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList initialConversations={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationLayout;
