import {
  CircleAlertIcon,
  CircleCheckIcon,
  FileTextIcon,
  PlayIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Progress } from "@components/ui/progress";
import { SectionHeading } from "@features/home/components/section-heading";

const COVERED = [
  "Hash function maps a key to a bucket",
  "Collisions are stored in a linked list",
];

export function FeedbackSection() {
  return (
    <section
      aria-labelledby="feedback-title"
      className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 lg:grid-cols-2"
    >
      <div className="flex flex-col gap-8">
        <SectionHeading
          id="feedback-title"
          title="Feedback that points to the source"
          description="Atlas transcribes your clip and compares it with the lecture transcript and notes you uploaded. It never answers from general knowledge, so every comment links back to a page or a timestamp."
        />
        <dl className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <dt className="text-sm font-semibold">Only your course material</dt>
            <dd className="text-sm leading-relaxed text-muted-foreground">
              Questions and feedback come from the indexed transcript and PDF
              notes, nothing else.
            </dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="text-sm font-semibold">Shared when it's right</dt>
            <dd className="text-sm leading-relaxed text-muted-foreground">
              Clips that match the source by 80% or more earn a verified badge
              and join the campus revision feed.
            </dd>
          </div>
        </dl>
      </div>

      <article
        aria-label="Example feedback report"
        className="flex flex-col gap-6 rounded-2xl border bg-card p-6 shadow-sm"
      >
        <header className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">Handling collisions</h3>
            <p className="text-sm text-muted-foreground">
              Your 52-second explanation
            </p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-emerald-600/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            <ShieldCheckIcon className="size-3.5" aria-hidden="true" />
            Verified
          </span>
        </header>

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium">Matches the source</span>
            <span className="font-heading text-2xl font-semibold tabular-nums">
              85%
            </span>
          </div>
          <Progress value={85} aria-label="Source match 85%" />
        </div>

        <ul className="flex flex-col gap-3 text-sm">
          {COVERED.map((c) => (
            <li key={c} className="flex gap-2.5">
              <CircleCheckIcon
                className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />
              {c}
            </li>
          ))}
          <li className="flex gap-2.5">
            <CircleAlertIcon
              className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
              aria-hidden="true"
            />
            <span>
              You skipped when the table resizes. It's covered in two places:
            </span>
          </li>
        </ul>

        <div className="flex flex-wrap gap-2 pl-6.5">
          <span className="flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs">
            <FileTextIcon className="size-3.5" aria-hidden="true" />
            Notes, page 4
          </span>
          <span className="flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs">
            <PlayIcon className="size-3.5" aria-hidden="true" />
            Video at 02:15
          </span>
        </div>
      </article>
    </section>
  );
}
