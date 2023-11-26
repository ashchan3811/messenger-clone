import { IHaveChildren } from "@/@types/children";
import getUsers from "@/actions/getUsers";

import Sidebar from "@/components/sidebar/Sidebar";

import UserList from "@/app/users/components/UserList";

interface UsersLayoutProps extends IHaveChildren {}

const UsersLayout = async ({ children }: UsersLayoutProps) => {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className='h-full'>
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
};

export default UsersLayout;
