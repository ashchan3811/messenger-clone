import { IHaveChildren } from "@/@types/children";

import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import MobileFooter from "@/components/sidebar/MobileFooter";

interface SidebarProps extends IHaveChildren {}

const Sidebar = async ({ children }: SidebarProps) => {
  return (
    <div className='h-full'>
      <DesktopSidebar />
      <MobileFooter />
      <main className='lg:pl-20 h-full'>{children}</main>
    </div>
  );
};

export default Sidebar;
