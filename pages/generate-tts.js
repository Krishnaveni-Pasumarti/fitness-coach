import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { text } = req.body;
  const key = process.env.ELEVENLABS_API_KEY;

  if (!key) return res.status(500).json({ error: "No TTS API key configured" });

  try {
    // Example using ElevenLabs
    const voiceId = "21m00Tcm4TlvDq8ikWAM"; // replace if needed
    const r = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      { text, model: "eleven_multilingual_v1" },
      { responseType: "arraybuffer", headers: { "xi-api-key": key, "Content-Type": "application/json" } }
    );
    res.setHeader("Content-Type", "audio/mpeg");
    res.send(r.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "TTS generation failed" });
  }
}
