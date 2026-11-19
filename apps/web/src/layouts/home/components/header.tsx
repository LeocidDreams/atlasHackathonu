import { GlobeIcon } from "lucide-react";
import { Link } from "react-router";
import { ProfileButton } from "@layouts/home/components/profile-button";
import { SignOutButton } from "@layouts/home/components/sign-out-button";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          to="/home"
          className="flex items-center gap-2 rounded-md font-heading text-base font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <GlobeIcon className="size-6" strokeWidth={1.5} aria-hidden="true" />
          Atlas
        </Link>

        <div className="flex items-center gap-2">
          <ProfileButton />
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
