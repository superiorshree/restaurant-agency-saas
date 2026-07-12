import { Card, CardContent } from "@/components/ui/card";

export function AuthCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="w-full max-w-md rounded-2xl shadow-sm">
      <CardContent className="p-8">
        {children}
      </CardContent>
    </Card>
  );
}