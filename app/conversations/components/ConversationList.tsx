"use client";

import { useState } from "react";
import ConversationBox from "./ConversationBox";
import { IConversationList } from "@/types";
import { useRouter } from "next/navigation";
import useConversation from "@/hooks/useConversation";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";

interface ConversationListProps {
  initialConversations: IConversationList;
}

const ConversationList = ({ initialConversations }: ConversationListProps) => {
  const [conversations, setConversation] = useState(initialConversations);

  const router = useRouter();
  const { conersationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className='px-5'>
        <div className='flex justify-between mb-4 pt-4'>
          <div className='text-2xl font-bold text-neutral-800'>Messages</div>
          <div className='rounded-full p-2 bg-gray-100 text-gr-600 cursor-pointer hover:opacity-75 transition'>
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {conversations.map((item) => (
          <ConversationBox
            key={item.id}
            selected={item.id === conersationId}
            conversation={item}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
