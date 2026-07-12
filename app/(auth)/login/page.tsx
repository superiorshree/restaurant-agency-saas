import { AuthCard } from "@/features/auth/components/auth-card";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <AuthCard>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-2 text-muted-foreground">
            Sign in to continue to SPNIX
          </p>
        </div>

        <LoginForm />
      </div>
    </AuthCard>
  );
}