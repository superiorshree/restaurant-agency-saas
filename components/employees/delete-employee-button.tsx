"use client";

export function DeleteEmployeeButton({
  id,
}: {
  id: string;
}) {
  async function remove() {
    if (!confirm("Delete employee?")) return;

    await fetch(`/api/employees/${id}`, {
      method: "DELETE",
    });

    location.reload();
  }

  return (
    <button
      onClick={remove}
      className="text-red-600 hover:underline"
    >
      Delete
    </button>
  );
}