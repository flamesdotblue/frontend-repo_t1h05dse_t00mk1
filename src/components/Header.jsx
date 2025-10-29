import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-blue-600 text-white shadow">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Role‑Based Face Authentication</h1>
          <p className="text-sm text-gray-500">Sign in securely using your face and assigned role</p>
        </div>
      </div>
    </header>
  );
}
