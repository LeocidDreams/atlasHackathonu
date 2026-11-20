import { BotIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AssistantPanel } from "@layouts/campus-ops/assistant-panel";

interface CampusOpsLayoutProps {
  children: React.ReactNode;
}

export function CampusOpsLayout({ children }: CampusOpsLayoutProps) {
  const [showPanel, setShowPanel] = useState<boolean>(false);

  return (
    <div className="w-full h-full">
      {children}
      <Button
        type="button"
        size="icon"
        aria-label="Open campus assistant"
        className="fixed right-6 bottom-6 z-50 size-14 rounded-full shadow-lg [&_svg:not([class*='size-'])]:size-6"
        onMouseUp={() => setShowPanel(true)}
      >
        <BotIcon />
      </Button>
      <AssistantPanel open={showPanel} onOpenChange={setShowPanel} />
    </div>
  );
}
