import { useEffect, useRef, useState } from 'react';
import { Camera, RefreshCw } from 'lucide-react';

export default function WebcamCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let stream;

    const start = async () => {
      try {
        setError('');
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setStreaming(true);
        }
      } catch (e) {
        setError('Unable to access camera. Please allow camera permissions.');
        setStreaming(false);
      }
    };

    start();

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    onCapture(dataUrl);
  };

  const retry = () => {
    setStreaming(false);
    setError('');
    (async () => {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
          await videoRef.current.play();
          setStreaming(true);
        }
      } catch (e) {
        setError('Unable to access camera. Please allow camera permissions.');
      }
    })();
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-blue-600" />
          <h2 className="font-medium text-gray-800">Live Camera</h2>
        </div>
        <button
          onClick={retry}
          className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-black">
        <video ref={videoRef} className="w-full aspect-video object-cover" playsInline muted />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}

      <div className="mt-3 flex justify-end">
        <button
          onClick={capture}
          disabled={!streaming}
          className={`px-4 py-2 rounded-md text-white text-sm font-medium shadow ${
            streaming ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Capture Face
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
