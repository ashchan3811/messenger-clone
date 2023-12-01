"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import useConversation from "@/hooks/useConversation";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";

interface DeleteConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const DeleteConversationModal = ({
  isOpen,
  onClose,
}: DeleteConfirmModalProps) => {
  const router = useRouter();
  const { conversationId } = useConversation();

  const [loading, setLoading] = useState(false);

  const onDelete = useCallback(async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/conversations/${conversationId}`);
      onClose();

      router.push("/conversations");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [conversationId, onClose, router]);

  return (
    <DeleteConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title={"Delete Conversation"}
      message={
        "Are you sure you want to delete this conversation? This action cannot be undone."
      }
    />
  );
};

export default DeleteConversationModal;
