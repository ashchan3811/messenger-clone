import { IHaveChildren } from "@/@types/children";

import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import MobileFooter from "@/components/sidebar/MobileFooter";

import getCurrentUser from "@/actions/getCurrentUser";

interface SidebarProps extends IHaveChildren {}

const Sidebar = async ({ children }: SidebarProps) => {
  const currentUser = await getCurrentUser();

  return (
    <div className='h-full'>
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className='lg:pl-20 h-full'>{children}</main>
    </div>
  );
};

export default Sidebar;
