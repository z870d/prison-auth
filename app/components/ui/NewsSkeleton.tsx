type NewsSkeletonProps = {
  count?: number;
};

export default function NewsSkeleton({ count = 6 }: NewsSkeletonProps) {
  return (
 <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
        >
          {/* Image skeleton */}
          <div className="h-56 w-full bg-gray-200 animate-pulse rounded-t-2xl" />

          {/* Content */}
          <div className="flex flex-col gap-3 p-4">
            {/* Title + Date skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
              <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse" />
            </div>

            {/* Description skeleton (3 lines) */}
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
              <div className="h-3 w-5/6 rounded bg-gray-200 animate-pulse" />
              <div className="h-3 w-2/3 rounded bg-gray-200 animate-pulse" />
            </div>

            {/* Read more button skeleton */}
            <div className="mt-2 h-8 w-24 rounded bg-gray-200 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
