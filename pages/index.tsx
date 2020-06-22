import Head from "next/head";
import { useSession, Session } from "next-auth/client";

const renderMain = (loading: boolean, session?: Session) => {
  if (loading) return <div>Loading...</div>;
  if (!session)
    return (
      <p>
        <a href="/api/auth/signin">Sign in</a>
      </p>
    );
  return (
    <>
      <h1 className="title">Welcome to Reditus</h1>
      <p>Welcome {session.user.email} </p>
      <p>
        <a href="/api/auth/signout">Sign out</a>
      </p>
    </>
  );
};

export default function Home() {
  const [session, loading] = useSession();

  return (
    <div className="container">
      <Head>
        <title>Reditus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{renderMain(loading, session)}</main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
