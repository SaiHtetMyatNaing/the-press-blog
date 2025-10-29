import NextAuth from "next-auth"
import { Prisma } from "./src/generated/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(Prisma),
  providers: [],
})  