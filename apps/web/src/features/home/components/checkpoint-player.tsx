import { LockIcon, PlayIcon } from "lucide-react";
import { cn } from "cn";

const CHAPTERS = [
  { title: "What a hash table is", width: "w-[30%]", done: true },
  { title: "Handling collisions", width: "w-[38%]", done: true },
  { title: "Load factor and resizing", width: "w-[32%]", done: false },
];

/** A lecture player paused at the end of a chapter. */
export function CheckpointPlayer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-card shadow-sm",
        className,
      )}
    >
      <div className="relative flex aspect-video items-center justify-center bg-foreground text-background">
        <div className="flex flex-col items-center gap-3 px-6 text-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-background/15">
            <LockIcon className="size-5" aria-hidden="true" />
          </span>
          <p className="text-sm font-medium">
            Chapter 2 is done. Explain it before you move on.
          </p>
        </div>
        <span className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-background/70">
          <PlayIcon className="size-3.5" aria-hidden="true" />
          14:32 / 22:10
        </span>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-1" aria-hidden="true">
          {CHAPTERS.map((c) => (
            <span
              key={c.title}
              className={cn(
                "h-1.5 rounded-full",
                c.width,
                c.done ? "bg-foreground" : "bg-muted",
              )}
            />
          ))}
        </div>
        <ol className="flex flex-col gap-1.5 text-xs">
          {CHAPTERS.map((c, i) => (
            <li
              key={c.title}
              className={cn(
                "flex items-center justify-between",
                c.done ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span>
                {i + 1}. {c.title}
              </span>
              {i === 1 && (
                <span className="font-medium text-foreground">Checkpoint</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
