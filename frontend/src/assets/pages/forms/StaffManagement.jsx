import { useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";

const staffData = [
  { id: 1, name: "John Doe", role: "Veterinarian", status: "Active" },
  { id: 2, name: "Jane Smith", role: "Receptionist", status: "Inactive" },
];

export default function StaffManagement() {
  const [staff, setStaff] = useState(staffData);
  const [search, setSearch] = useState("");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Staff Management</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Search staff..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="flex gap-2 bg-blue-500 text-white px-4 py-2 rounded">
          <Plus size={16} /> Add Staff
        </button>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff
              .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
              .map((s) => (
                <tr key={s.id} className="border">
                  <td className="p-2 border text-center">{s.id}</td>
                  <td className="p-2 border">{s.name}</td>
                  <td className="p-2 border">{s.role}</td>
                  <td className="p-2 border">{s.status}</td>
                  <td className="p-2 border flex gap-2 justify-center">
                    <button className="p-1 bg-yellow-500 text-white rounded">
                      <Edit size={14} />
                    </button>
                    <button className="p-1 bg-red-500 text-white rounded">
                      <Trash size={14} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
