import { AuthLayout } from "@/features/auth/components/auth-layout";
import { useNavigate } from "react-router";
import { SignInForm } from "@/features/auth/signin/components/signin-form";

export default function Page() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Sign in to Atlas"
      description="Use the email and password you signed up with."
      footer={
        <>
          New to Atlas?{" "}
          <button
            type="button"
            onClick={() => navigate("/auth/signup")}
            className="cursor-pointer font-medium text-foreground underline underline-offset-4"
          >
            Create an account
          </button>
        </>
      }
    >
      <SignInForm />
    </AuthLayout>
  );
}
