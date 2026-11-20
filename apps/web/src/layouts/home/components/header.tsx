import { GlobeIcon } from "lucide-react";
import { Link } from "react-router";
import { AuthButtons } from "@layouts/home/components/auth-buttons";
import { ProfileButton } from "@layouts/home/components/profile-button";
import { SignOutButton } from "@layouts/home/components/sign-out-button";
import { ThemeToggle } from "@layouts/home/components/theme-toggle";
import { useAuth } from "@provider/auth-provider";

export function Header() {
  const { isLoggedIn } = useAuth();

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
          <ThemeToggle />
          {isLoggedIn ? (
            <>
              <ProfileButton />
              <SignOutButton />
            </>
          ) : (
            <AuthButtons />
          )}
        </div>
      </div>
    </header>
  );
}
