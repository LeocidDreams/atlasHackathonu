import { LogInIcon, UserPlusIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@components/ui/button";

export function AuthButtons() {
  const navigate = useNavigate();

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        onClick={() => navigate("/auth/signin")}
      >
        <LogInIcon aria-hidden="true" />
        Sign in
      </Button>
      <Button type="button" onClick={() => navigate("/auth/signup")}>
        <UserPlusIcon aria-hidden="true" />
        Sign up
      </Button>
    </>
  );
}
