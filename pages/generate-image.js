import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { prompt } = req.body;

  // Fallback to Unsplash keyword image (demo). Replace with Replicate/OpenAI Images for production.
  try {
    const url = `https://source.unsplash.com/featured/?${encodeURIComponent(prompt)}`;
    // returning the url so client can load it
    res.status(200).json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image generation failed" });
  }
}

