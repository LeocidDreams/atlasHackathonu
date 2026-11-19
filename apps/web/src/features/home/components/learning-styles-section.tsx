import {
  CodeIcon,
  EyeIcon,
  MicIcon,
  NotebookPenIcon,
  PresentationIcon,
  UserIcon,
  VideoIcon,
  type LucideIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { SectionHeading } from "@features/home/components/section-heading";
import { VerticalClip } from "@features/home/components/vertical-clip";

type Style = {
  id: string;
  label: string;
  icon: LucideIcon;
  mode: string;
  body: string;
  details: string[];
  preview: React.ReactNode;
};

const STYLES: Style[] = [
  {
    id: "visual",
    label: "Visual",
    icon: EyeIcon,
    mode: "Green screen slides",
    body: "Your camera turns on and the chapter's slide or diagram appears behind you. Point at it as you walk through the idea.",
    details: [
      "Background removal runs in the browser",
      "Pick any slide from the chapter",
      "45 seconds is usually enough",
    ],
    preview: (
      <div className="flex flex-1 flex-col justify-between bg-background p-3 pt-12">
        <div className="flex flex-col gap-1.5 rounded-lg border p-2">
          <PresentationIcon
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="h-1.5 w-3/4 rounded-full bg-muted" />
          <span className="h-1.5 w-1/2 rounded-full bg-muted" />
        </div>
        <UserIcon
          className="mx-auto mb-16 size-20 text-muted-foreground/50"
          strokeWidth={1}
          aria-hidden="true"
        />
      </div>
    ),
  },
  {
    id: "auditory",
    label: "Auditory",
    icon: MicIcon,
    mode: "Voice note with an avatar",
    body: "Prefer not to be on camera? Record your voice only. Atlas turns it into a vertical video with an avatar that speaks your words.",
    details: [
      "Lip-synced avatar, your own voice",
      "No camera needed",
      "Captions are added for you",
    ],
    preview: (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 pb-16">
        <span className="flex size-20 items-center justify-center rounded-full bg-background">
          <UserIcon
            className="size-10 text-muted-foreground"
            strokeWidth={1.25}
            aria-hidden="true"
          />
        </span>
        <div className="flex h-6 items-center gap-1" aria-hidden="true">
          {[3, 5, 2, 6, 4, 5, 2, 4, 3].map((h, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-foreground/60"
              style={{ height: `${h * 4}px` }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "read-write",
    label: "Read/write",
    icon: NotebookPenIcon,
    mode: "Structured micro-post",
    body: "Write your question, your answer and a three-point summary in Markdown. Short, searchable and easy to revise from.",
    details: [
      "Question, answer, three key points",
      "Markdown with code blocks",
      "Checked against the notes like any clip",
    ],
    preview: (
      <div className="flex flex-1 flex-col gap-3 bg-background p-3 pt-12 text-[0.65rem] leading-snug">
        <p className="font-semibold">Q: Why does chaining keep lookups fast?</p>
        <p className="text-muted-foreground">
          A: Each bucket holds a short list, so we only scan a few keys.
        </p>
        <ul className="flex list-disc flex-col gap-1 pl-3 text-muted-foreground">
          <li>Hash picks the bucket</li>
          <li>Collisions share a list</li>
          <li>Resize when lists get long</li>
        </ul>
      </div>
    ),
  },
  {
    id: "kinesthetic",
    label: "Kinesthetic",
    icon: CodeIcon,
    mode: "Split-screen demo",
    body: "The screen splits in two: your code or simulation on top, your camera below. Show it working while you explain why.",
    details: [
      "Screen and camera recorded together",
      "Works with any browser tab",
      "Good for labs and exercises",
    ],
    preview: (
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-1 bg-foreground p-3 pt-12 font-mono text-[0.6rem] text-background/80">
          <span>table.put("ada", 1)</span>
          <span>table.put("bob", 2)</span>
          <span className="text-background">{"// bucket 3: ada -> bob"}</span>
        </div>
        <div className="flex flex-1 items-start justify-center pt-4">
          <VideoIcon
            className="size-8 text-muted-foreground/50"
            aria-hidden="true"
          />
        </div>
      </div>
    ),
  },
];

export function LearningStylesSection() {
  return (
    <section aria-labelledby="styles-title" className="border-y bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          id="styles-title"
          title="Explain it the way you think"
          description="Every checkpoint offers four studio modes, one for each learning style. All of them produce a 9:16 clip or post."
        />

        <Tabs defaultValue="visual" className="mt-12 gap-10">
          <TabsList className="h-auto! flex-wrap">
            {STYLES.map((s) => (
              <TabsTrigger key={s.id} value={s.id} className="px-3 py-1.5">
                <s.icon aria-hidden="true" />
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {STYLES.map((s) => (
            <TabsContent
              key={s.id}
              value={s.id}
              className="grid items-center gap-12 md:grid-cols-[1fr_auto]"
            >
              <div className="flex max-w-lg flex-col gap-4">
                <h3 className="font-heading text-2xl font-semibold tracking-tight">
                  {s.mode}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
                <ul className="flex flex-col gap-2 border-l pl-4 text-sm">
                  {s.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <VerticalClip
                caption={
                  s.id === "read-write" ? undefined : "Hash, bucket, list."
                }
                className="mx-auto w-48"
              >
                {s.preview}
              </VerticalClip>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
