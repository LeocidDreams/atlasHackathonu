import { UserIcon } from "lucide-react";
import { Button } from "@components/ui/button";

export function ProfileButton() {
  return (
    <Button type="button" variant="ghost" size="icon" aria-label="Profile">
      <UserIcon aria-hidden="true" />
    </Button>
  );
}
