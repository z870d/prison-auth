type AuthProviderBadgeProps = {
  provider?: string;
};

export default function AuthProviderBadge({ provider }: AuthProviderBadgeProps) {
  if (provider !== "microsoft") return null;

  return (
    <span
      className="
        inline-flex items-center gap-1.5 
        sm:gap-2
        px-2.5 sm:px-3 
        py-1 
        text-[10px] sm:text-xs 
        font-medium 
        text-gray-700 
        bg-gray-100 
        rounded-full 
        shadow-sm
        whitespace-nowrap
      "
    >
      {/* Larger icon on small screens */}
      <span className="inline-flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center">
        <svg viewBox="0 0 20 20" className="h-full w-full" aria-hidden="true">
          <rect width="9" height="9" x="1" y="1" fill="#F25022" />
          <rect width="9" height="9" x="10" y="1" fill="#7FBA00" />
          <rect width="9" height="9" x="1" y="10" fill="#00A4EF" />
          <rect width="9" height="9" x="10" y="10" fill="#FFB900" />
        </svg>
      </span>

      {/* Text shrinks on mobile */}
      <span className="hidden xs:inline sm:inline">
        Signed up using Microsoft
      </span>

      {/* Short, clean text on tiny screens */}
      <span className="xs:hidden sm:hidden">Microsoft</span>
    </span>
  );
}
