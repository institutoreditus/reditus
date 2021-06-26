// Ignore some eslint rules due to the way next-auth is setup (functions that have capitalized names)
/* eslint new-cap: ["error", { "capIsNewExceptions": ["Adapters.Prisma.Adapter", "Providers.Email", "NextAuth"] }] */
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";
import createDIContainer from "../../../dependency_injection/createDIContainer";
import { Session, User } from "../../../hooks/useSession";

import RoxContainer from "../../../services/rox/RoxContainer";
import roxService from "../../../services/rox/RoxService";

roxService(RoxContainer);

const from: string = process.env.MAILER_EMAIL || "sistema@reditus.org.br";
const email: string = process.env.MAILER_EMAIL || "";
const pass: string = process.env.MAILER_PASS || "";
const service: string = process.env.MAILER_SERVICE || "mailhog";

if (!from || !email || !pass || !service)
  throw new Error("Invalid auth configuration.");

async function notImplemented() {
  throw new Error("Not implemented");
}

// TODO: Maybe we can share this with the nodemailer config
const serviceServer =
  service === "gmail"
    ? {
        port: 465,
        host: "smtp.gmail.com",
        secure: true,
        tls: {
          rejectUnauthorized: false,
        },
      }
    : {
        host: "localhost",
        port: 1025,
      };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const dashboardEnabled = JSON.parse(RoxContainer.dashboardEnabled.getValue());
  if (dashboardEnabled) {
    const container = await createDIContainer();
    const scope = container.createScope();

    try {
      const prisma: PrismaClient = scope.resolve("dbClient");
      const baseAdapter = Adapters.Prisma.Adapter({ prisma });
      const adapter = {
        ...baseAdapter,
        createUser: notImplemented,
        deleteUser: notImplemented,
        unlinkAccount: notImplemented,
      };

      const options: InitOptions = {
        // Configure one or more authentication providers
        providers: [
          Providers.Email({
            server: {
              ...serviceServer,
              auth: {
                user: email,
                pass,
              },
            },
            from,
          }),
        ],
        adapter,
        callbacks: {
          async session(session): Promise<Session> {
            if (session.user.email) {
              const dbUser = await prisma.user.findFirst({
                where: { email: session.user.email },
              });
              if (dbUser) {
                const { email, firstName, lastName } = dbUser;
                const user: User = {
                  email,
                  firstName,
                  lastName,
                };
                return { ...session, user };
              }
            }

            throw new Error("User without email");
          },
        },
      };

      await NextAuth(req, res, options);
    } finally {
      scope.dispose();
    }
  } else {
    res.status(404).json({});
  }
};
