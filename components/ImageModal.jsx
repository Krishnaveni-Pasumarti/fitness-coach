'use client'
import { useEffect, useState } from "react";
import axios from "axios";

export default function ImageModal({ item, onClose }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!item) return;
    const generate = async () => {
      try {
        setLoading(true);
        setError(null);
        setUrl(null);
        const prompt = typeof item === "string" ? item : (item.name || JSON.stringify(item));
        const res = await axios.post("/api/generate-image", { prompt });
        setUrl(res.data?.url || null);
      } catch (err) {
        console.error(err);
        setError("Image generation failed");
      } finally {
        setLoading(false);
      }
    };
    generate();
  }, [item]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg max-w-lg w-full relative">
        <button onClick={onClose} className="absolute right-3 top-3">✖</button>
        <h3 className="text-lg font-semibold mb-3">{typeof item === "string" ? item : item.name}</h3>
        <div className="h-72 flex items-center justify-center">
          {loading && <p>Generating image…</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && url && <img src={url} alt="AI generated" className="max-h-64 object-contain rounded" />}
        </div>
      </div>
    </div>
  );
}
