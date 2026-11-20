import { SectionHeading } from "@features/home/components/section-heading";

const STEPS = [
  {
    title: "Watch one chapter",
    body: "Lectures and notes are split into short chapters, so you take in one idea at a time.",
  },
  {
    title: "Hit the checkpoint",
    body: "When the chapter ends, the video stops and the studio opens. The next chapter stays locked.",
  },
  {
    title: "Ask and answer",
    body: "Write a question about what you just saw and answer it. Stuck? Atlas suggests one drawn only from that chapter.",
  },
  {
    title: "Explain it back",
    body: "Record a 30 to 60 second explanation in your own style. Atlas compares it with the source and shows what you missed.",
  },
];

export function LearningLoopSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="loop-title"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24"
    >
      <SectionHeading
        id="loop-title"
        title="Four steps, every chapter"
        description="The same loop repeats for each chapter, so recall happens while the material is still fresh."
      />

      <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-3 border-t pt-5">
            <span className="font-heading text-4xl font-semibold tracking-tight text-muted-foreground/50 tabular-nums">
              {i + 1}
            </span>
            <h3 className="text-lg font-semibold tracking-tight">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
