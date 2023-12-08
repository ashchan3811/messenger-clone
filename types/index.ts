import getConversations from "@/actions/getConversations";
import getMessages from "@/actions/getMessages";
import { Conversation, User } from "@prisma/client";

export interface IHaveChildren {
  children: React.ReactNode;
}

export type Variant = "LOGIN" | "REGISTER";
export type SocialLoginTypes = "github" | "google";

export type IConversationList = Awaited<ReturnType<typeof getConversations>>;
export type IConversation = IConversationList[number];

export interface IConversationParams {
  conversationId: string;
}

export type IMessageList = Awaited<ReturnType<typeof getMessages>>;
export type IMessage = IMessageList[number];

export type IConversationWithUsers = Conversation & {
  users: User[];
};

export const PUSHER_EVENTS = {
  newMessage: "messages:new",
  updateConversation: "conversation:update",
};
