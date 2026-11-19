import { AccessibilitySection } from "@features/home/components/accessibility-section";
import { CtaSection } from "@features/home/components/cta-section";
import { FeedbackSection } from "@features/home/components/feedback-section";
import { HeroSection } from "@features/home/components/hero-section";
import { LearningLoopSection } from "@features/home/components/learning-loop-section";
import { LearningStylesSection } from "@features/home/components/learning-styles-section";
import { ProblemSection } from "@features/home/components/problem-section";

export default function Page() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <LearningLoopSection />
      <LearningStylesSection />
      <FeedbackSection />
      <AccessibilitySection />
      <CtaSection />
    </>
  );
}
