"use client";

import { signIn } from "next-auth/react";
import { useTransition } from "react";

type MicrosoftSignInButtonProps = {
  label?: string;
};

export default function MicrosoftSignInButton({
  label = "Sign up with Microsoft",
}: MicrosoftSignInButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = () => {
    startTransition(() =>
      signIn("microsoft-entra-id", {
        callbackUrl: "/dashboard",
        redirect: true,
      }),
    );
  };

  return (
    <button
      type="button"
      onClick={handleSignIn}
      disabled={isPending}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:border-gray-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-white">
        <svg
          viewBox="0 0 20 20"
          className="h-6 w-6"
          aria-hidden="true"
          focusable="false"
        >
          <rect width="9.5" height="9.5" x="0.75" y="0.75" fill="#f25022" />
          <rect width="9.5" height="9.5" x="10.25" y="0.75" fill="#7fba00" />
          <rect width="9.5" height="9.5" x="0.75" y="10.25" fill="#00a4ef" />
          <rect width="9.5" height="9.5" x="10.25" y="10.25" fill="#ffb900" />
        </svg>
      </span>
      <span>{isPending ? "Signing in..." : label}</span>
    </button>
  );
}
