import { IHaveChildren } from "@/@types/children";

import Sidebar from "@/components/sidebar/Sidebar";

interface UsersLayoutProps extends IHaveChildren {}

const UsersLayout = async ({ children }: UsersLayoutProps) => {
  return (
    <Sidebar>
      <div className='h-full'>{children}</div>
    </Sidebar>
  );
};

export default UsersLayout;
