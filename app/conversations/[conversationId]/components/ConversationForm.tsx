"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { useState } from "react";
import toast from "react-hot-toast";
import clsx from "clsx";

import useConversation from "@/hooks/useConversation";
import MessageInput from "./MessageInput";

interface ConversationFormProps {}

const ConversationForm = ({}: ConversationFormProps) => {
  const { conversationId } = useConversation();
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsSending(true);

      setValue("message", "", { shouldValidate: true });
      await axios.post("/api/messages", { ...data, conversationId });
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4">
      <HiPhoto
        size={30}
        className="text-sky-500 cursor-pointer hover:text-sky-600"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          disabled={isSending}
          className={clsx(
            "rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition",
            isSending && "opacity-50 cursor-default",
          )}
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default ConversationForm;
