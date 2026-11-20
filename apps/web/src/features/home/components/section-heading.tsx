import { cn } from "cn";

type SectionHeadingProps = {
  id?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  id,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-3", className)}>
      <h2
        id={id}
        className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
