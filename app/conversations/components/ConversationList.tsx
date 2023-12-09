"use client";

import { useEffect, useState } from "react";
import ConversationBox from "./ConversationBox";
import { IConversation, IConversationParams, PUSHER_EVENTS } from "@/types";
import { useRouter } from "next/navigation";
import useConversation from "@/hooks/useConversation";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";
import useCurrentUserEmail from "@/hooks/useCurrentUserEmail";
import { pusherClient } from "@/lib/pusher";
import _ from "lodash";

interface ConversationListProps {
  initialConversations: IConversation[];
  users: Array<User>;
}

const ConversationList = ({
  initialConversations,
  users,
}: ConversationListProps) => {
  const [conversations, setConversations] = useState(initialConversations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const { conversationId, isOpen } = useConversation();

  const userEmail = useCurrentUserEmail();

  useEffect(() => {
    if (!userEmail) {
      return;
    }

    pusherClient.subscribe(userEmail);

    const newConversationHandler = (conversation: IConversation) => {
      setConversations((current) => {
        if (_.find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateConversationHandler = (conversation: IConversation) => {
      setConversations((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return { ...currentConversation, messages: conversation.messages };
          }

          return currentConversation;
        }),
      );
    };

    const deleteConversationHandler = (params: IConversationParams) => {
      setConversations((current) => {
        return [
          ...current.filter(
            (conversation) => conversation.id !== params.conversationId,
          ),
        ];
      });

      if (params.conversationId === conversationId) {
        router.push(`/conversations`);
        router.refresh();
      }
    };

    pusherClient.bind(PUSHER_EVENTS.CONVERSATION.NEW, newConversationHandler);

    pusherClient.bind(
      PUSHER_EVENTS.CONVERSATION.UPDATE,
      updateConversationHandler,
    );

    pusherClient.bind(
      PUSHER_EVENTS.CONVERSATION.DELETE,
      deleteConversationHandler,
    );

    return () => {
      pusherClient.unsubscribe(userEmail);

      pusherClient.unbind(
        PUSHER_EVENTS.CONVERSATION.NEW,
        newConversationHandler,
      );

      pusherClient.unbind(
        PUSHER_EVENTS.CONVERSATION.UPDATE,
        updateConversationHandler,
      );

      pusherClient.unbind(
        PUSHER_EVENTS.CONVERSATION.DELETE,
        deleteConversationHandler,
      );
    };
  }, [userEmail, router, conversationId]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
          isOpen ? "hidden" : "block w-full left-0",
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2 bg-gray-100 text-gr-600 cursor-pointer hover:opacity-75 transition"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {conversations.map((item) => (
            <ConversationBox
              key={item.id}
              selected={item.id === conversationId}
              conversation={item}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
