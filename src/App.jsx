import { useState } from 'react';
import Header from './components/Header';
import RoleSelector from './components/RoleSelector';
import WebcamCapture from './components/WebcamCapture';
import AuthPanel from './components/AuthPanel';

function App() {
  const [role, setRole] = useState('');
  const [faceImage, setFaceImage] = useState('');
  const [events, setEvents] = useState([]);

  const handleAuthEvent = (evt) => {
    setEvents((prev) => [{ id: crypto.randomUUID(), ...evt }, ...prev].slice(0, 6));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Header />

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WebcamCapture onCapture={setFaceImage} />
            <AuthPanel role={role} faceImage={faceImage} onAuth={handleAuthEvent} />
          </div>

          <div className="space-y-6">
            <RoleSelector role={role} onChange={setRole} />

            <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-4">
              <h2 className="font-medium text-gray-800 mb-3">Recent Activity</h2>
              <ul className="space-y-2">
                {events.length === 0 && (
                  <li className="text-sm text-gray-500">No authentication attempts yet.</li>
                )}
                {events.map((e) => (
                  <li key={e.id} className={`text-sm flex items-center justify-between rounded-md border px-3 py-2 ${
                    e.ok ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-800'
                  }`}>
                    <span className="capitalize">{e.role}</span>
                    <span>{new Date(e.at).toLocaleTimeString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-gray-500">
          Face data never leaves your browser in this demo. For production, connect a backend with secure storage and recognition service.
        </footer>
      </div>
    </div>
  );
}

export default App;
