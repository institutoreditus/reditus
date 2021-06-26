/* eslint-disable react/prop-types */
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import useSession from "../../hooks/useSession";
import { getSession, signIn, signOut } from "next-auth/client";
import createDIContainer from "../../dependency_injection/createDIContainer";
import { PrismaClient } from "@prisma/client";

import RoxContainer from "../../services/rox/RoxContainer";
import service from "../../services/rox/RoxService";

service(RoxContainer);

interface Props {
  university?: string;
  error?: boolean;
}

const DemoAuth: NextPage<Props> = ({ university, error }) => {
  // Just a lame way to hide this behind a feature flag
  if (error) {
    return <div></div>;
  }

  // This runs on client-side and makes a request to "/api/auth/session" to get
  // session data. We are using our own version of useSession instead of the
  // NextAuth's one because we are overriding the user type.
  const [session, loading] = useSession();

  return (
    <div>
      <Head>
        <title>Reditus</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* Demo on how to use next-auth hooks. */}
        {loading}
        {!session && (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user.lastName}, {session.user.firstName} (
            {session.user.email}) <br />
            University {university}
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
      </main>
    </div>
  );
};

// Alternative to get user data from the backend
DemoAuth.getInitialProps = async (ctx) => {
  const dashboardEnabled = JSON.parse(RoxContainer.dashboardEnabled.getValue());

  if (!dashboardEnabled) {
    return { error: true };
  }

  const session = await getSession(ctx);
  const container = await createDIContainer();
  const scope = container.createScope();
  const dbClient: PrismaClient = scope.resolve("dbClient");

  if (session && session.user.email) {
    const user = await dbClient.user.findFirst({
      where: { email: session.user.email },
    });
    if (user) {
      return { university: user.university };
    }
  }

  scope.dispose();
  return {};
};

export default DemoAuth;
