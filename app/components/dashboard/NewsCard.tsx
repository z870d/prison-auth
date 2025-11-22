type NewsCardProps = {
  title: string;
  description: string;
  date: string;
  image: string;
  url: string;
};

export default function NewsCard({
  title,
  description,
  date,
  image,
  url,
}: NewsCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      
      {/* Bigger full-width image */}
      <div className="w-full">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            className="h-56 w-full object-cover rounded-t-2xl"
          />
        ) : (
          <div className="h-28 w-full rounded-t-2xl bg-gray-100" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
          <p className="text-xs text-gray-500">
            {new Date(date).toLocaleDateString()}
          </p>
        </div>

        <p className="text-sm text-gray-700 line-clamp-3">{description}</p>

        {/* Better Read More button */}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
        >
          Read more
        </a>
      </div>

    </article>
  );
}
