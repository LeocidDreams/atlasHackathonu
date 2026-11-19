import { Link } from "react-router";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { SignInForm } from "@/features/auth/signin/components/signin-form";

export default function Page() {
  return (
    <AuthLayout
      title="Sign in to Atlas"
      description="Use the email and password you signed up with."
      footer={
        <>
          New to Atlas?{" "}
          <Link
            to="/auth/signup"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Create an account
          </Link>
        </>
      }
    >
      <SignInForm />
    </AuthLayout>
  );
}
