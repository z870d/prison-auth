import { auth } from "@/auth";

export default auth((req) => {
  const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");
  const isLoginRoute = req.nextUrl.pathname === "/login";

  // Unauthenticated users trying to access protected routes → /login
  if (!req.auth && isDashboardRoute) {
    const loginUrl = new URL("/login", req.url);
    return Response.redirect(loginUrl);
  }

  // Authenticated users visiting the login page → /dashboard
  if (req.auth && isLoginRoute) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return Response.redirect(dashboardUrl);
  }
});
