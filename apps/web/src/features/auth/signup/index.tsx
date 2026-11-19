import { Link } from "react-router";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { SignUpForm } from "@/features/auth/signup/components/signup-form";

export default function Page() {
  return (
    <AuthLayout
      title="Create your Atlas account"
      description="It takes an email and a password. You can add the rest later."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthLayout>
  );
}
