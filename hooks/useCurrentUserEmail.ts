import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useCurrentUserEmail = () => {
  const session = useSession();

  const email = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  return email;
};

export default useCurrentUserEmail;
