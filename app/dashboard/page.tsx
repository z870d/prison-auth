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
<footer className="mt-12 border-t border-gray-200 bg-white">
  <div className="mx-auto max-w-4xl px-6 py-6 text-center">
    <p className="text-sm text-gray-500">
      Developed by{" "}
      <span className="font-semibold text-indigo-600">Ziyad T. Almaghrabi</span>
    </p>
  </div>
</footer>

    </div>
  );
}
