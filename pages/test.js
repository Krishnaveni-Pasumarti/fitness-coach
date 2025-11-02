import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.models.list();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
