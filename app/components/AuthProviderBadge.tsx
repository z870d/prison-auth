type AuthProviderBadgeProps = {
  provider?: string;
};

export default function AuthProviderBadge({ provider }: AuthProviderBadgeProps) {
  if (provider !== "microsoft") return null;

  return (
    <span className="inline-flex items-center gap-2  px-3 py-1 text-xs font-medium text-gray-600">
      <span className="inline-flex h-4 w-4 items-center justify-center">
        <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
          <rect width="9" height="9" x="1" y="1" fill="#F25022" />
          <rect width="9" height="9" x="10" y="1" fill="#7FBA00" />
          <rect width="9" height="9" x="1" y="10" fill="#00A4EF" />
          <rect width="9" height="9" x="10" y="10" fill="#FFB900" />
        </svg>
      </span>
      <span>Signed up using Microsoft</span>
    </span>
  );
}
