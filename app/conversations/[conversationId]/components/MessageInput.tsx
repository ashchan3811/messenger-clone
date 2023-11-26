"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

const MessageInput = ({
  id,
  type,
  placeholder,
  register,
  errors,
  required,
}: MessageInputProps) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 w-full bg-neutral-100 rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
