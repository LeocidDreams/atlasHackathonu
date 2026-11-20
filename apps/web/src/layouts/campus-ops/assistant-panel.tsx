import { useEffect, useRef } from "react";
import { useCampusOps } from "@provider/campusops-provider";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { BotIcon, SendHorizontalIcon } from "lucide-react";
import type { AskQueryDto } from "@atlas/validators";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import API from "@/lib/axios-wrapper";

const DEFAULT_UNIVERSITY = "dokuz-eylul";
const MAX_QUERY_LENGTH = 2000;

type AskResponse = {
  message: string;
  httpStatusCode: number;
  data: string;
  issues: string[];
};

interface AssistantPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  university?: string;
}

async function askCampusOps(body: AskQueryDto): Promise<string> {
  const res = await API.post<AskResponse>("/api/campusops/ask", body);
  return res.data.data;
}

function errorMessage(err: unknown): string {
  console.log(err);

  if (isAxiosError<AskResponse>(err)) {
    const issues = err.response?.data?.issues;
    if (issues?.length) return issues.join(" ");
    if (err.response?.data?.message) return err.response.data.message;
  }
  return "The assistant couldn't answer. Check your connection and try again.";
}

export function AssistantPanel({
  open,
  onOpenChange,
  university = DEFAULT_UNIVERSITY,
}: AssistantPanelProps) {
  const { chatMessages, setChatMessages, draft, setDraft } = useCampusOps();

  const scrollRef = useRef<HTMLDivElement>(null);

  const ask = useMutation({
    mutationFn: askCampusOps,
    onSuccess: (answer) =>
      setChatMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: answer },
      ]),
    onError: (err) =>
      setChatMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "error", content: errorMessage(err) },
      ]),
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatMessages, ask.isPending]);

  function send() {
    const query = draft.trim();
    if (!query || ask.isPending) return;

    setChatMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: query },
    ]);
    setDraft("");
    ask.mutate({ query, university });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      send();
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2">
            <BotIcon className="size-4" />
            Campus assistant
          </SheetTitle>
          <SheetDescription>
            Ask about deadlines, exams, offices and campus rules.
          </SheetDescription>
        </SheetHeader>

        <div
          ref={scrollRef}
          className="flex flex-1 flex-col gap-3 overflow-y-auto p-4"
          aria-live="polite"
        >
          {chatMessages.length === 0 && (
            <p className="m-auto max-w-64 text-center text-muted-foreground">
              Ask a question to get an answer from your university's documents.
            </p>
          )}

          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[85%] rounded-lg px-3 py-2 whitespace-pre-wrap break-words",
                message.role === "user" &&
                  "self-end bg-primary text-primary-foreground",
                message.role === "assistant" && "self-start bg-muted",
                message.role === "error" &&
                  "self-start bg-destructive/10 text-destructive",
              )}
            >
              {message.content}
            </div>
          ))}

          {ask.isPending && (
            <div className="flex items-center gap-2 self-start rounded-lg bg-muted px-3 py-2 text-muted-foreground">
              <Spinner />
              Looking it up
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-2 border-t p-4"
        >
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="When is the add/drop deadline?"
            aria-label="Your question"
            maxLength={MAX_QUERY_LENGTH}
            rows={1}
            className="max-h-40 min-h-10 resize-none"
            autoFocus
          />
          <Button
            type="submit"
            size="icon"
            aria-label="Send question"
            disabled={!draft.trim() || ask.isPending}
          >
            <SendHorizontalIcon />
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
