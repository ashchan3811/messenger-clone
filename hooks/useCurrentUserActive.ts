import { User } from "@prisma/client";
import useActiveUserList from "./useActiveUserList";

const useCurrentUserActive = (user?: User) => {
  const { members } = useActiveUserList();
  const isActive = members.indexOf(user?.email!) > -1;

  return isActive;
};

export default useCurrentUserActive;
