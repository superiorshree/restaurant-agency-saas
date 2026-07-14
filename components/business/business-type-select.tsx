"use client";

interface BusinessType {
  id: string;
  name: string;
}

interface Props {
  types: BusinessType[];
  value: string;
  onChange: (value: string) => void;
}

export function BusinessTypeSelect({
  types,
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border p-2"
    >
      <option value="">Select Business Type</option>

      {types.map((type) => (
        <option key={type.id} value={type.id}>
          {type.name}
        </option>
      ))}
    </select>
  );
}