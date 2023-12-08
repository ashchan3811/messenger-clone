"use client";

import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
  users?: User[];
}

const AvatarGroup = ({ users = [] }: AvatarGroupProps) => {
  const only3Users = users.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div className="relative h-11 w-11">
      {only3Users.map((user, index) => (
        <div
          key={index}
          className={cn(
            "absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px]",
            positionMap[index as keyof typeof positionMap],
          )}
        >
          <Image
            alt="avatar"
            fill
            src={user.image || "/images/placeholder.jpg"}
          />
        </div>
      ))}
      <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3  md:w-3"></span>
    </div>
  );
};

export default AvatarGroup;
