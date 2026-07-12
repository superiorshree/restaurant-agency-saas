import { AuthCard } from "@/features/auth/components/auth-card";

export default function SignupPage() {
  return (
    <AuthCard>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground">
          Start managing your business with SPNIX.
        </p>
      </div>
    </AuthCard>
  );
}