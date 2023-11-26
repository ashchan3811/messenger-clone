"use client";

import { useMemo } from "react";

import useOtherUser from "@/hooks/useOtherUser";
import { IConversationWithUsers } from "@/types";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "@/components/Avatar";

interface ConversationHeaderProps {
  conversation: IConversationWithUsers;
}

const ConversationHeader = ({ conversation }: ConversationHeaderProps) => {
  const otherUser = useOtherUser(conversation);

  const statusTest = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-x-3 items-center">
        <Link
          className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          href={"/conversation"}
        >
          <HiChevronLeft size={24}/>
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <div>{conversation.name || otherUser.name}</div>
          <div className="text-sm font-light text-neutral-500">
            {statusTest}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className="text-sky-500 cursor-pointer hover:text-sk-600 transition"
      />
    </div>
  );
};

export default ConversationHeader;
