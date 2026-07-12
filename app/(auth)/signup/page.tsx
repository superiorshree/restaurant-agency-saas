import { AuthCard } from "@/features/auth/components/auth-card";
import { SignupForm } from "@/features/auth/components/signup-form";

export default function SignupPage() {
  return (
    <AuthCard>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="mt-2 text-muted-foreground">
            Start using SPNIX today.
          </p>
        </div>

        <SignupForm />
      </div>
    </AuthCard>
  );
}