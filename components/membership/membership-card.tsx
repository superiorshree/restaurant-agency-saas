interface Props {
  plan: string;
  status: string;
  renewal: string;
  payment: string;
  price: number;
}

export function MembershipCard({
  plan,
  status,
  renewal,
  payment,
  price,
}: Props) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{plan}</h2>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
          {status}
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-sm text-muted-foreground">Price</p>
          <p className="text-xl font-semibold">₹{price}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Renewal</p>
          <p className="text-xl font-semibold">{renewal}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Payment</p>
          <p className="text-xl font-semibold">{payment}</p>
        </div>
      </div>
    </div>
  );
}