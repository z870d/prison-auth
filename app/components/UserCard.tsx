import AuthProviderBadge from "./AuthProviderBadge";
import type { Session } from "next-auth";

type UserCardProps = {
  user: Session["user"] | null | undefined;
};

export default function UserCard({ user }: UserCardProps) {
  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="flex items-start gap-5">

        {/* User Avatar */}
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name ?? "User avatar"}
            className="h-16 w-16 rounded-full object-cover ring-2 ring-blue-100 shadow-sm"
          />
        ) : (
          <div className="flex h-14 w-16 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700 shadow-sm">
            {(user.name ?? "User")
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
        )}

        {/* Info + Badge on Same Line */}
        <div className="flex flex-col gap-1 w-full">

          {/* First row: name + badge on the right */}
          <div className="flex items-center justify-between">
            <div>

              <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                {user.name ?? "Authenticated User"}
              </h2>
            </div>

            {/* Badge on the right */}
            <AuthProviderBadge provider={user.authProvider} />
          </div>

          {/* Email under name */}
          <p className="text-sm text-gray-600">{user.email ?? "No email"}</p>
        </div>

      </div>
    </div>
  );
}
