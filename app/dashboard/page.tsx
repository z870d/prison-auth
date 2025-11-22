import LogoutButton from "@/app/components/LogoutButton";
import UserCard from "@/app/components/UserCard";
import NewsWidget from "@/app//components/dashboard/NewsWidget";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex items-center justify-between gap-4 pb-6">
          <div>
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Welcome to PrisonAuth demo
            </p>
            <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <LogoutButton />
        </div>

        <UserCard user={session.user} />
        <div className="mt-8">
          <NewsWidget />
        </div>
      </main>
    </div>
  );
}
