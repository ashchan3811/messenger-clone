"use client";

import { SessionProvider } from "next-auth/react";

import { IHaveChildren } from "@/@types/children";

interface AuthContextProps extends IHaveChildren {}

const AuthContext = ({ children }: AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
