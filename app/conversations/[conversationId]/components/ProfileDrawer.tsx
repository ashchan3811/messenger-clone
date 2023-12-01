"use client";

import { format } from "date-fns";
import { useMemo, useState } from "react";
import { IoTrash } from "react-icons/io5";

import Avatar from "@/components/Avatar";
import Drawer from "@/components/Drawer";
import useOtherUser from "@/hooks/useOtherUser";
import { IConversationWithUsers } from "@/types";

import DeleteConversationModal from "./DeleteConversationModal";

interface ProfileDrawerProps {
  conversation: IConversationWithUsers;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer = ({
  conversation,
  isOpen,
  onClose,
}: ProfileDrawerProps) => {
  const otherUser = useOtherUser(conversation);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return conversation.name || otherUser.name;
  }, [conversation.name, otherUser.name]);

  const statusTest = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <>
      <DeleteConversationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
      />

      <Drawer isOpen={isOpen} onClose={onClose} direction={"right"}>
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <Avatar user={otherUser} />
          </div>
          <div>{title}</div>
          <div className="text-sm text-gray-500">{statusTest}</div>
          <div className="flex gap-10 my-8">
            <div
              onClick={() => setIsConfirmOpen(true)}
              className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
            >
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                <IoTrash size={20} />
              </div>
              <div className="text-sm font-light text-neutral-600">Delete</div>
            </div>
          </div>
          <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
            <div className="space-y-8 px-4 sm:space-y-6 sm:px-6">
              {!conversation.isGroup && (
                <>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                      Email
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                      {otherUser.email}
                    </dd>
                  </div>

                  <hr />

                  <div>
                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                      Joined
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                      <time dateTime={joinedDate}>{joinedDate}</time>
                    </dd>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
