import getConversations from "@/actions/getConversations";

export interface IHaveChildren {
  children: React.ReactNode;
}

export type Variant = "LOGIN" | "REGISTER";
export type SocialLoginTypes = "github" | "google";

export type IConversationList = Awaited<ReturnType<typeof getConversations>>;
export type IConversation = IConversationList[number];
