import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";

// TODO: Use dotenv to setup test config.
const site = process.env.SITE || "http://localhost:3000";
const server =
  process.env.EMAIL_SERVER || "smtp://mailhog:password@localhost:1025";
const from = process.env.EMAIL_FROM || "sistema@reditus.org.br";


const email: string = process.env.MAILER_EMAIL || "";
const pass: string = process.env.MAILER_PASS || "";
const prisma = new PrismaClient()

if (!site || !server || !from) throw new Error("Invalid auth configuration.");

const baseAdapter = Adapters.Prisma.Adapter({ prisma });
async function notImplemented() {
  throw new Error("Not implemented");
}
const adapter = {
  ...baseAdapter,
  createUser: notImplemented,
  deleteUser: notImplemented,
  unlinkAccount: notImplemented,
}

const options: InitOptions = {
  // Configure one or more authentication providers
  providers: [
    Providers.Email({
      server: {
        host: "localhost",
        port: 1025,
        auth: {
          user: email,
          pass,
        },
      },
      from,
    }),
  ],
  adapter,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
