'use client'
import axios from "axios";
import { useState } from "react";

export default function VoicePlayer({ text }) {
  const [playing, setPlaying] = useState(false);

  const play = async () => {
    try {
      setPlaying(true);
      const res = await axios.post("/api/generate-tts", { text }, { responseType: "arraybuffer" });
      const blob = new Blob([res.data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => setPlaying(false);
      audio.play();
    } catch (err) {
      console.error(err);
      alert("TTS failed");
      setPlaying(false);
    }
  };

  return <button className="btn" onClick={play}>{playing ? "Playing..." : "Read My Plan"}</button>;
}
