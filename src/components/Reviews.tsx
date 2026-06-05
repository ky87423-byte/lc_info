import { reviews } from "@/data/site";

export default function Reviews() {
  return (
    <section id="reviews" className="border-b border-zinc-800 bg-zinc-900/40">
      <div className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-center text-2xl font-extrabold sm:text-3xl">이용 후기</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <div className="text-sm text-yellow-400" aria-label={`별점 ${review.rating}점`}>
                {"★".repeat(review.rating)}
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-zinc-300">
                “{review.body}”
              </blockquote>
              <figcaption className="mt-4 text-xs font-bold text-zinc-500">
                {review.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
