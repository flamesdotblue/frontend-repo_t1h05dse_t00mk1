import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function AuthPanel({ role, faceImage, onAuth }) {
  const [status, setStatus] = useState('idle'); // idle | success | error
  const [message, setMessage] = useState('');

  const authenticate = async () => {
    setStatus('idle');
    setMessage('');

    if (!role) {
      setStatus('error');
      setMessage('Please select a role.');
      return;
    }
    if (!faceImage) {
      setStatus('error');
      setMessage('Please capture your face.');
      return;
    }

    // Local demo flow: simulate verification delay
    setMessage('Verifying face pattern...');
    await new Promise((r) => setTimeout(r, 1200));

    // Simple deterministic pseudo-check based on image length and role name
    const score = ((faceImage?.length || 0) + role.length) % 7;
    const ok = score % 2 === 0; // pseudo acceptance

    if (ok) {
      setStatus('success');
      setMessage(`Authenticated as ${role.charAt(0).toUpperCase() + role.slice(1)}.`);
      onAuth?.({ role, ok: true, at: new Date().toISOString() });
    } else {
      setStatus('error');
      setMessage('Face did not match any enrolled profile for this role.');
      onAuth?.({ role, ok: false, at: new Date().toISOString() });
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-medium text-gray-800">Authentication</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-lg border border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
          {faceImage ? (
            <img src={faceImage} alt="face preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-gray-400">No face captured</span>
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600">Role: <span className="font-medium text-gray-900">{role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Not selected'}</span></p>
          <p className="text-xs text-gray-500 mt-1">This demo runs locally. Connect a backend later to perform real face recognition and enforce role-based access.</p>
        </div>
        <button
          onClick={authenticate}
          className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium shadow"
        >
          Authenticate
        </button>
      </div>

      {message && (
        <div className={`mt-3 flex items-start gap-2 text-sm ${
          status === 'success' ? 'text-emerald-700' : status === 'error' ? 'text-red-700' : 'text-gray-600'
        }`}>
          {status === 'success' ? (
            <CheckCircle2 className="w-4 h-4 mt-0.5" />
          ) : status === 'error' ? (
            <AlertCircle className="w-4 h-4 mt-0.5" />
          ) : null}
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
