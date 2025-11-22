import AuthLayout from "@/app/components/AuthLayout";
import MicrosoftSignInButton from "@/app/components/MicrosoftSignInButton";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Use your Microsoft account for secure access to the PrisonAuth demo."
    >
      <div className="space-y-6">
        <form className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 shadow-inner outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 shadow-inner outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>

        <div className="relative" aria-hidden="true">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-dashed border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              or
            </span>
          </div>
        </div>

        <MicrosoftSignInButton />

        <p className="text-center text-xs text-gray-500">
          The email and password fields are placeholders. Please sign in with
          Microsoft to enter the dashboard.
        </p>
      </div>
    </AuthLayout>
  );
}
