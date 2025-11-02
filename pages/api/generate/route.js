// app/api/generate/route.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const body = await req.json();

    const prompt = `
Generate a personalized fitness plan in pure JSON.
Fields to include:
{
  "workout": ["Exercise name - sets/reps/details", ...],
  "diet": ["Breakfast: ...", "Lunch: ...", "Dinner: ..."]
}

User info:
${JSON.stringify(body, null, 2)}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    // --- try to extract valid JSON even if extra text is around it ---
    const text = completion.choices[0].message.content.trim();
    const match = text.match(/\{[\s\S]*\}/);
    const cleaned = match ? match[0] : "{}";
    const plan = JSON.parse(cleaned);

    return new Response(JSON.stringify(plan), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error generating plan:", err);
    return new Response(
      JSON.stringify({ error: "Failed to generate plan" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
