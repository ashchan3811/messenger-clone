"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";
import clsx from "clsx";
import { format } from "date-fns";

import Avatar from "@/components/Avatar";
import { IMessage } from "@/types";
import Image from "next/image";

interface MessageBoxProps {
  isLast: boolean;
  message: IMessage;
}

const MessageBox = ({ isLast, message }: MessageBoxProps) => {
  const session = useSession();

  const isOwn = useMemo(() => {
    return session?.data?.user?.email === message?.sender?.email;
  }, [session.data?.user?.email, message]);

  const seenList = useMemo(() => {
    return (message.seen || [])
      .filter((user) => user.email != message.sender.email)
      .map((user) => user.name)
      .join(", ");
  }, [message.seen, message.sender.email]);

  const container = clsx("flex gap p-4", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const messageClsx = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    message.image ? "rounded p-0" : "rounded-full py-2 px-3",
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={message.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{message.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(message.createdAt), "p")}
          </div>
        </div>
        <div className={messageClsx}>
          {message.image ? (
            <Image
              src={message.image}
              alt="message-image"
              height="288"
              width="288"
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <div>{message.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            Seen by {seenList}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
