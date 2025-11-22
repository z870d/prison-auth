import type { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 text-gray-900">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
          <div className="p-8">
            <div className="mb-8 space-y-2 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500">
                PrisonAuth
              </p>
              <h1 className="text-2xl font-semibold">{title}</h1>
              {subtitle ? (
                <p className="text-sm text-gray-500">{subtitle}</p>
              ) : null}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
