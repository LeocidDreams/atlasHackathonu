export function ProblemSection() {
  return (
    <section aria-labelledby="problem-title" className="border-y bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-16">
        <h2
          id="problem-title"
          className="font-heading text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl"
        >
          Watching a lecture feels like learning. A week later, most of it is
          gone.
        </h2>
        <div className="flex flex-col gap-5 text-base leading-relaxed text-muted-foreground">
          <p>
            Passive video builds an illusion of competence: the explanation
            makes sense while you watch it, so you assume you know it. You find
            out you don't in the exam.
          </p>
          <p>
            The fix is old and well tested. Pull the idea back out of your own
            head, then explain it to someone else. Atlas builds both steps into
            the lecture, in the format that suits how you learn.
          </p>
        </div>
      </div>
    </section>
  );
}
