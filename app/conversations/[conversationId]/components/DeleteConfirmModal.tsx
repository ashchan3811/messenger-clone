"use client";

import Modal from "@/components/Modal";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteConfirmModal = ({ isOpen, onClose }: DeleteConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p>Hello Modal</p>
    </Modal>
  );
};

export default DeleteConfirmModal;
