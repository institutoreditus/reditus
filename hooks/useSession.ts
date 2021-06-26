// Wraps NextAuth useSession but overriding the typing to include our custom fields.

import {
  Session as NextAuthSession,
  useSession as nextAuthUseSession,
} from "next-auth/client";

export type User = {
  email: string;
  firstName: string;
  lastName: string;
};

export interface Session extends NextAuthSession {
  user: User;
}

// Tricking typescript to believe that we know what we are doing.
const useSession = (): [Session | null, boolean] => {
  const [session, loading] = nextAuthUseSession();
  return [(session as unknown) as Session | null, loading];
};

export default useSession;
