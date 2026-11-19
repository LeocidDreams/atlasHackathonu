import { useState } from "react";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@components/ui/button";
import { Spinner } from "@components/ui/spinner";
import { supabase } from "@lib/supabase";

export function SignOutButton() {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  async function handleSignOut() {
    setPending(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
        return;
      }
      navigate("/auth/signin");
    } finally {
      setPending(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleSignOut}
      disabled={pending}
    >
      {pending ? <Spinner /> : <LogOutIcon aria-hidden="true" />}
      Sign out
    </Button>
  );
}
