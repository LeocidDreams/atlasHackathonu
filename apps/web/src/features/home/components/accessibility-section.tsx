import { CaptionsIcon, KeyboardIcon, VideoOffIcon } from "lucide-react";
import { SectionHeading } from "@features/home/components/section-heading";

const FEATURES = [
  {
    icon: CaptionsIcon,
    title: "Captions on every clip",
    body: "Word-by-word captions are generated from the audio, for students who are deaf or hard of hearing and anyone studying somewhere quiet.",
  },
  {
    icon: VideoOffIcon,
    title: "No camera required",
    body: "Type or speak your explanation and an avatar presents it. Useful if you're camera shy, or if speaking on video is hard for you.",
  },
  {
    icon: KeyboardIcon,
    title: "Works with a keyboard and screen reader",
    body: "Every control in the player and the studio can be reached by keyboard and is labelled for assistive technology.",
  },
];

export function AccessibilitySection() {
  return (
    <section aria-labelledby="a11y-title" className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          id="a11y-title"
          title="Built so everyone can take part"
          description="A learning tool only works if every student in the class can use it."
        />
        <ul className="mt-12 grid gap-10 md:grid-cols-3">
          {FEATURES.map((f) => (
            <li key={f.title} className="flex flex-col gap-3">
              <f.icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-lg font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
