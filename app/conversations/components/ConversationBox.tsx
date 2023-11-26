"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { IConversation } from "@/types";

interface ConversationBoxProps {
  conversation: IConversation;
}

const ConversationBox = ({ conversation }: ConversationBoxProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await axios.post("/api/conversations", {
        id: conversation.id,
      });

      router.push(`/conversations/${response.data.id}`);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [router, conversation.id]);

  return (
    <div
      onClick={handleClick}
      className='w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'
    >
      conversation
    </div>
  );
};

export default ConversationBox;
