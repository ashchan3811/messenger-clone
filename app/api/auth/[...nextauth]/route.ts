import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import db from "@/lib/db";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          type: "password",
          label: "password",
        },
      },
      authorize: async (creds) => {
        if (!creds?.email || !creds.password) {
          throw new Error("Invalid creds");
        }

        const user = await db.user.findUnique({
          where: {
            email: creds.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid creds");
        }

        const isCorrectPassword = await bcrypt.compare(
          creds.password,
          user.hashedPassword,
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid creds");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
