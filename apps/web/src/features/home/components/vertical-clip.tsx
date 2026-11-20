import { useEffect, useState } from "react";
import { ShieldCheckIcon, UserIcon } from "lucide-react";
import { cn } from "cn";

type VerticalClipProps = {
  caption?: string;
  score?: number;
  animate?: boolean;
  className?: string;
  children?: React.ReactNode;
};

/** A 9:16 student explanation clip with word-by-word captions. */
export function VerticalClip({
  caption,
  score,
  animate = false,
  className,
  children,
}: VerticalClipProps) {
  const words = caption ? caption.split(" ") : [];
  const active = useActiveWord(words.length, animate);

  return (
    <div
      className={cn(
        "relative flex aspect-[9/16] flex-col overflow-hidden rounded-[1.75rem] border-[6px] border-foreground bg-muted shadow-xl",
        className,
      )}
    >
      {children ?? (
        <div className="flex flex-1 items-center justify-center text-muted-foreground/40">
          <UserIcon className="size-1/2" strokeWidth={1} aria-hidden="true" />
        </div>
      )}

      {score !== undefined && (
        <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[0.7rem] font-medium text-emerald-700 backdrop-blur dark:text-emerald-400">
          <ShieldCheckIcon className="size-3.5" aria-hidden="true" />
          RAG verified {score}%
        </div>
      )}

      {words.length > 0 && (
        <p className="absolute inset-x-3 bottom-6 text-center text-sm leading-snug font-semibold text-balance">
          {words.map((word, i) => (
            <span
              key={i}
              className={cn(
                "rounded px-0.5 transition-colors duration-200",
                i === active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground",
              )}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

function useActiveWord(count: number, animate: boolean) {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(
      () => setActive((i) => (i + 1) % (count + 3)),
      420,
    );
    return () => window.clearInterval(id);
  }, [animate, count]);

  return active;
}
