"use client";

import { useState } from "react";
import { User } from "@prisma/client";

import useRoutes from "@/hooks/useRoutes";
import DesktopSidebarItem from "@/components/sidebar/DesktopSidebarItem";
import Avatar from "@/components/Avatar";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar = ({ currentUser }: DesktopSidebarProps) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between'>
      <nav className='mt-4 flex flex-col justify-between'>
        <ul role='list' className='flex flex-col items-center space-y-1'>
          {routes.map((item) => (
            <DesktopSidebarItem
              key={item.label}
              label={item.label}
              href={item.href}
              active={item.active}
              icon={item.icon}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav className='mt-4 flex flex-col justify-between items-center'>
        <div
          onClick={() => setIsOpen(true)}
          className=' cursor-pointer hover:opacity-75 transition'
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
