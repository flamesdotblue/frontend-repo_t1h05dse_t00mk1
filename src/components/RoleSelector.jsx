import { User } from 'lucide-react';

const ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'staff', label: 'Staff' },
  { value: 'guest', label: 'Guest' },
];

export default function RoleSelector({ role, onChange }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <User className="w-5 h-5 text-blue-600" />
        <h2 className="font-medium text-gray-800">Select Role</h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {ROLES.map((r) => (
          <button
            key={r.value}
            onClick={() => onChange(r.value)}
            className={`rounded-lg px-3 py-2 text-sm border transition ${
              role === r.value
                ? 'bg-blue-600 text-white border-blue-600 shadow'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}
