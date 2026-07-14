import { AppShell } from "@/components/layout/app-shell";
import { requireBusiness } from "@/lib/services/auth.service";
import { getEmployees } from "@/lib/services/employee.service";
import { AddEmployeeForm } from "@/components/employees/add-employee-form";
import { DeleteEmployeeButton } from "@/components/employees/delete-employee-button";
export default async function EmployeesPage() {
  const { business } = await requireBusiness();

  const employees = await getEmployees(business.id);

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Employees
        </h1>
<AddEmployeeForm />
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Invite</th>
                <th className="p-4 text-left">Invited</th>
                <th className="p-4 text-left">Invite Link</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b">
                  <td className="p-4">{employee.full_name}</td>
                  <td className="p-4">{employee.email}</td>
                  <td className="p-4">{employee.phone}</td>
                  <td className="p-4">{employee.role}</td>
                  <td className="p-4">{employee.status}</td>
                  <td className="p-4">{employee.invite_status}</td>
                  <td className="p-4">  {employee.invited_at ? new Date(employee.invited_at).toLocaleDateString()    : "-"}</td>
                  <td className="p-4">
  <code className="text-xs">
    /employee/accept?token={employee.invite_token}
  </code>
</td>
                  <td className="p-4"><DeleteEmployeeButton id={employee.id} />
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}