import { GlobeIcon } from "lucide-react";
import { Link } from "react-router";

type AuthLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function AuthLayout({
  title,
  description,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col px-6 py-8 sm:px-10">
        <Link
          to="/home"
          className="flex w-fit items-center gap-2 rounded-md font-heading text-base font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <GlobeIcon className="size-6" strokeWidth={1.5} aria-hidden="true" />
          Atlas
        </Link>

        <main className="flex flex-1 items-center justify-center py-12">
          <div className="flex w-full max-w-sm flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground text-pretty">
                {description}
              </p>
            </div>

            {children}

            <div className="text-center text-sm text-muted-foreground">
              {footer}
            </div>
          </div>
        </main>
      </div>

      <AuthAside />
    </div>
  );
}

function AuthAside() {
  return (
    <aside className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:flex lg:flex-col lg:justify-end">
      <GlobeIcon
        aria-hidden="true"
        strokeWidth={0.4}
        className="absolute -top-24 -right-32 size-[46rem] opacity-25"
      />

      <figure className="relative flex max-w-md flex-col gap-4 p-12">
        <blockquote className="font-heading text-2xl leading-snug font-medium tracking-tight text-balance">
          Every route starts with knowing where you are.
        </blockquote>
        <figcaption className="text-sm text-primary-foreground/70">
          Pick up where your team left off.
        </figcaption>
      </figure>
    </aside>
  );
}

