import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: DefaultSession["user"] & {
      id?: string;
      accessToken?: string;
      authProvider?: string;
      emailType?: "personal" | "company" | "academic" | "unknown";
    };
  }

  interface User extends DefaultUser {
    id?: string;
    accessToken?: string;
    authProvider?: string;
    emailType?: "personal" | "company" | "academic" | "unknown";
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    picture?: string | null;
    accessToken?: string;
    authProvider?: string;
    emailType?: "personal" | "company" | "academic" | "unknown";
  }
}
