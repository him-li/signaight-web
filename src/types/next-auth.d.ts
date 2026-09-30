import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: string;
    idToken: string & DefaultSession["user"];
  }

  interface Profile {
    id: string;
    idToken: string & Profile;
  }
}
