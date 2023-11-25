import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  const conersationId = useMemo(() => {
    if (!params?.conersationId) {
      return "";
    }
    return params.conersationId as string;
  }, [params?.conersationId]);

  const isOpen = useMemo(() => !!conersationId, [conersationId]);

  return useMemo(() => {
    return {
      isOpen,
      conersationId,
    };
  }, [isOpen, conersationId]);
};

export default useConversation;
