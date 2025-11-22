import NextAuth, { type NextAuthConfig } from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

const microsoftClientId =
  process.env.AUTH_MICROSOFT_ENTRA_ID_ID ?? process.env.AZURE_AD_CLIENT_ID;
const microsoftClientSecret =
  process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET ??
  process.env.AZURE_AD_CLIENT_SECRET;
const microsoftTenantId =
  process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID ??
  process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT ??
  process.env.AZURE_AD_TENANT_ID;

type EmailType = "personal" | "company" | "academic" | "unknown";

async function fetchGraphProfilePhoto(accessToken?: string | null) {
  if (!accessToken) return null;

  try {
    const response = await fetch(
      "https://graph.microsoft.com/v1.0/me/photo/$value",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");
    return `data:image/jpeg;base64,${base64Image}`;
  } catch {
    return null;
  }
}

function detectEmailType(email?: string | null): EmailType {
  if (!email) return "unknown";

  const lowerEmail = email.toLowerCase();
  const domain = lowerEmail.split("@")[1] ?? "";

  const personalDomains = new Set([
    "gmail.com",
    "outlook.com",
    "hotmail.com",
    "yahoo.com",
    "icloud.com",
    "proton.me",
    "live.com",
  ]);

  if (personalDomains.has(domain)) return "personal";
  if (domain.endsWith(".edu") || domain.endsWith(".edu.sa")) return "academic";
  if (domain) return "company";
  return "unknown";
}

const authConfig: NextAuthConfig = {
  providers: [
    MicrosoftEntraID({
      clientId: microsoftClientId!,
      clientSecret: microsoftClientSecret!,
      tenantId: microsoftTenantId!,
      authorization: {
        params: {
          scope: "openid profile email offline_access User.Read",
        },
      },
      profile(profile) {
        const picture =
          (profile as { picture?: string }).picture ??
          (profile as { photo?: string }).photo ??
          (profile as { avatar_url?: string }).avatar_url;

        return {
          id:
            (profile as { oid?: string }).oid ??
            (profile as { sub?: string }).sub ??
            (profile as { id?: string }).id,
          name: (profile as { name?: string }).name,
          email: (profile as { email?: string }).email,
          image: picture,
        };
      },
      checks: ["pkce", "state"],
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, profile, account, trigger, session }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      if (account?.provider) {
        token.authProvider = account.provider === "credentials" ? "credentials" : "microsoft";
      }

      // Allow updating email/name via session update trigger if needed
      if (trigger === "update" && session?.user?.email) {
        token.email = session.user.email;
        token.name = session.user.name;
      }

      if (profile) {
        token.picture =
          (profile as { picture?: string }).picture ??
          (profile as { photo?: string }).photo ??
          token.picture;
        token.name =
          (profile as { name?: string }).name ??
          (token.name as string | null | undefined);
        token.email =
          (profile as { email?: string }).email ??
          (token.email as string | null | undefined);
      }

      const emailFromToken =
        (token.email as string | null | undefined) ??
        (session?.user?.email as string | undefined) ??
        null;
      token.emailType = detectEmailType(emailFromToken);

      token.id =
        (token.sub as string | undefined) ??
        (token.id as string | undefined) ??
        undefined;

      if (!token.picture && token.accessToken) {
        const graphPhoto = await fetchGraphProfilePhoto(
          token.accessToken as string,
        );
        if (graphPhoto) {
          token.picture = graphPhoto;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id =
          (token.id as string | undefined) ?? (token.sub as string | undefined);
        session.user.name =
          (token.name as string | null | undefined) ?? session.user.name;
        session.user.email =
          (token.email as string | null | undefined) ?? session.user.email;
        session.user.image =
          (token.picture as string | null | undefined) ?? session.user.image;
        session.user.accessToken = token.accessToken as string | undefined;
        session.user.authProvider = (token.authProvider as string | undefined) ?? "unknown";
        session.user.emailType = (token.emailType as EmailType | undefined) ?? "unknown";
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
export const { GET, POST } = handlers;
