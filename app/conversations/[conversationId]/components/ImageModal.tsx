"use client";

import Modal from "@/components/modals/Modal";
import Image from "next/image";
import React from "react";

interface ImageModalProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal = ({ src, isOpen, onClose }: ImageModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image alt="image" className="object-cover" fill src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
