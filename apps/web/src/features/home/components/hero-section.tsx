import { Link } from "react-router";
import { Button } from "@components/ui/button";
import { CheckpointPlayer } from "@features/home/components/checkpoint-player";
import { VerticalClip } from "@features/home/components/vertical-clip";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto grid max-w-6xl items-center gap-16 px-6 pt-16 pb-24 lg:grid-cols-[1fr_1.05fr] lg:pt-24"
    >
      <div className="flex flex-col gap-6">
        <h1
          id="hero-title"
          className="font-heading text-5xl leading-[1.02] font-semibold tracking-tighter text-balance sm:text-6xl"
        >
          Stop watching. Start explaining.
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
          Atlas pauses your lecture at the end of every chapter and asks you to
          teach it back in a 60-second vertical clip. Then it checks your
          explanation against the course material.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/auth/signup">Start learning</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#how-it-works">See how it works</a>
          </Button>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-xl pr-10 pb-16 sm:pr-24">
        <CheckpointPlayer />
        <VerticalClip
          animate
          score={86}
          caption="Two keys land in the same bucket, so we chain them in a list."
          className="absolute -right-0 -bottom-4 w-36 sm:w-44"
        />
      </div>
    </section>
  );
}
