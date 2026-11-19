import { CheckIcon, MinusIcon } from "lucide-react";
import { cn } from "cn";
import { PASSWORD_RULES } from "@/features/auth/lib/password-rules";

type PasswordRequirementsProps = {
  id?: string;
  value: string;
};

export function PasswordRequirements({ id, value }: PasswordRequirementsProps) {
  return (
    <ul id={id} className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
      {PASSWORD_RULES.map((rule) => {
        const met = rule.test(value);
        return (
          <li
            key={rule.label}
            className={cn(
              "flex items-center gap-1.5 transition-colors",
              met ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {met ? (
              <CheckIcon className="size-3.5 shrink-0" aria-hidden="true" />
            ) : (
              <MinusIcon className="size-3.5 shrink-0" aria-hidden="true" />
            )}
            {rule.label}
            <span className="sr-only">{met ? "(done)" : "(missing)"}</span>
          </li>
        );
      })}
    </ul>
  );
}
