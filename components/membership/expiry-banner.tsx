interface Props {
  renewalDate: string;
}

export function ExpiryBanner({ renewalDate }: Props) {
  const renewal = new Date(renewalDate);
  const today = new Date();

  const daysLeft = Math.ceil(
    (renewal.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (daysLeft > 7) return null;

  return (
    <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4">
      <h3 className="font-semibold">
        Membership Expiring Soon
      </h3>

      <p className="mt-1 text-sm">
        {daysLeft} day(s) remaining.
      </p>
    </div>
  );
}