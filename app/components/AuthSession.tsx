"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

type AuthSessionProps = {
  children: ReactNode;
};

export default function AuthSession({ children }: AuthSessionProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
