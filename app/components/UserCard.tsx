import AuthProviderBadge from "./AuthProviderBadge";
import type { Session } from "next-auth";

type UserCardProps = {
  user: Session["user"] | null | undefined;
};

export default function UserCard({ user }: UserCardProps) {
  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      {/* Layout responsive */}
      <div className="flex flex-col sm:flex-row sm:items-start items-center gap-5 sm:gap-6">

        {/* Avatar */}
        {user.image ? (
          <img
            src={user.image}
            alt={user.name ?? "User avatar"}
            className="h-14 w-16 rounded-full object-cover ring-2 ring-blue-100 shadow-sm"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-xl font-semibold text-blue-700 shadow-sm">
            {(user.name ?? "User")
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
        )}

        {/* Info + Badge */}
        <div className="flex flex-col w-full text-center sm:text-left gap-2">

          {/* Name + Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-xl font-semibold text-gray-900 leading-tight">
              {user.name ?? "Authenticated User"}
            </h2>

            {/* Badge aligned right on desktop, centered on mobile */}
            <div className="flex justify-center sm:justify-end">
              <AuthProviderBadge provider={user.authProvider} />
            </div>
          </div>

          {/* Email */}
          <p className="text-sm text-gray-600 break-all">{user.email ?? "No email"}</p>

        </div>

      </div>
    </div>
  );
}
