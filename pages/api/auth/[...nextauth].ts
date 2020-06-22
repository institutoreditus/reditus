import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";

// TODO: Use dotenv to setup test config.
const site = process.env.SITE || "http://localhost:3000";
const server =
  process.env.EMAIL_SERVER || "smtp://mailhog:password@localhost:1025";
const from = process.env.EMAIL_FROM || "sistema@reditus.org.br";

if (!site || !server || !from) throw new Error("Invalid auth configuration.");

const options: InitOptions = {
  site,

  // Configure one or more authentication providers
  providers: [
    Providers.Email({
      server,
      from,
    }),
  ],

  database: {
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
