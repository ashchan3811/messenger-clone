"use client";

import { FiAlertTriangle } from "react-icons/fi";

import { Dialog } from "@headlessui/react";

import Modal from "@/components/modals/Modal";
import Button from "@/components/Button";

interface DeleteConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onClick: () => void;
  title: string;
  message: string;
  btnText: string;
  disabled?: boolean;
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onClick,
  title,
  message,
  btnText,
  disabled,
}: DeleteConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => !disabled && onClose()}>
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
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button
          type="button"
          variant={"danger"}
          onClick={onClick}
          disabled={disabled}
        >
          {btnText}
        </Button>
        <Button
          type="button"
          variant={"secondary"}
          onClick={onClose}
          disabled={disabled}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
