"use client";

import { FiAlertTriangle } from "react-icons/fi";

import { Dialog } from "@headlessui/react";
import Modal from "@/components/modals/Modal";

interface DeleteConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  title,
  message,
}: DeleteConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle className="h-6 w-6  text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className={"text-base font-semibold leading-6 text-gray-900"}
          >
            {title}
          </Dialog.Title>
          <div className="mt-2">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
