"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import _ from "lodash";

import useConversation from "@/hooks/useConversation";
import { IMessageList, IMessage, PUSHER_EVENTS } from "@/types";

import MessageBox from "./MessageBox";
import { pusherClient } from "@/lib/pusher";

interface ConversationBodyProps {
  initialMessages: IMessageList;
}

const ConversationBody = ({ initialMessages }: ConversationBodyProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: IMessage) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (_.find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: IMessage) => {
      setMessages((current) =>
        current.map((msg) => {
          if (msg.id == newMessage.id) {
            return newMessage;
          }

          return msg;
        }),
      );
    };

    pusherClient.bind(PUSHER_EVENTS.MESSAGE.NEW, messageHandler);
    pusherClient.bind(PUSHER_EVENTS.MESSAGE.UPDATE, updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind(PUSHER_EVENTS.MESSAGE.NEW, messageHandler);
      pusherClient.unbind(PUSHER_EVENTS.MESSAGE.UPDATE, updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          message={message}
          isLast={i === messages.length - 1}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default ConversationBody;
