"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { User } from "@prisma/client";
import Avatar from "@/components/Avatar";

interface UserBoxProps {
  user: User;
}

const UserBox = ({ user }: UserBoxProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await axios.post("/api/conversations", {
        userId: user.id,
      });

      router.push(`/conversations/${response.data.id}`);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [router, user.id]);

  return (
    <div
      onClick={handleClick}
      className='w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'
    >
      <Avatar user={user} />
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-sm font-medium text-gray-900'>{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
