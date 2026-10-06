import { container } from "@/lib/styles";

// Скелет страницы, пока сервер готовит данные: место под содержимое зарезервировано заранее,
// поэтому страница не «прыгает». Блоки спокойные, без мигания.
export default function Loading() {
  return (
    <div className={container} aria-busy="true">
      <span className="sr-only" role="status">
        Загрузка…
      </span>
      <div className="border-b border-line pb-10 pt-10 sm:pt-16">
        <div className="h-4 w-40 rounded-sm bg-sunken" />
        <div className="mt-4 h-11 w-72 max-w-full rounded-sm bg-sunken" />
        <div className="mt-3 h-6 w-96 max-w-full rounded-sm bg-sunken" />
      </div>
      <div className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(min(15rem,100%),1fr))] gap-x-6 gap-y-10">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="flex flex-col gap-3.5">
            <div className="aspect-[4/3] rounded-sm bg-sunken" />
            <div className="h-3 w-1/2 rounded-sm bg-sunken" />
            <div className="h-5 w-3/4 rounded-sm bg-sunken" />
          </div>
        ))}
      </div>
    </div>
  );
}
