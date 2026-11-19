import { Link } from "react-router";
import { Button } from "@components/ui/button";

export function CtaSection() {
  return (
    <section aria-labelledby="cta-title" className="px-6 pb-24">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-3xl bg-primary px-8 py-14 text-primary-foreground sm:px-14 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-xl flex-col gap-3">
          <h2
            id="cta-title"
            className="font-heading text-3xl font-semibold tracking-tight text-balance"
          >
            Your next lecture can end with you teaching it.
          </h2>
          <p className="text-primary-foreground/70">
            Upload a lecture video and its notes to set up your first
            checkpoint.
          </p>
        </div>
        <Button asChild size="lg" variant="secondary">
          <Link to="/auth/signup">Create a free account</Link>
        </Button>
      </div>
    </section>
  );
}
