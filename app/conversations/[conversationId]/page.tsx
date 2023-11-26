import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import { IConversationParams } from "@/types";

import EmptyState from "@/components/EmptyState";

import ConversationHeader from "./components/ConversationHeader";
import ConversationBody from "./components/ConversationBody";
import ConversationForm from "./components/ConversationForm";

const CoversationDetailPage = async ({
  params,
}: {
  params: IConversationParams;
}) => {
  const conversation = await getConversationById(params.conversationId);
  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  const messages = await getMessages(params.conversationId);

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <ConversationHeader conversation={conversation} />
        <ConversationBody />
        <ConversationForm />
      </div>
    </div>
  );
};

export default CoversationDetailPage;
