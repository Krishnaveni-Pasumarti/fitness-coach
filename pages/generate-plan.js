import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { user } = req.body;

  // Build prompt to ask for structured JSON
  const prompt = `
You are a friendly fitness coach. Create a personalized 7-day workout (array of 7 objects {day, exercises:[{name, sets, reps, rest}]}) and a diet plan (object with Breakfast, Lunch, Dinner, Snacks arrays) for the following user:
${JSON.stringify(user)}.
Respond ONLY with valid JSON.
`;

  try {
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      // Fallback simple generation (demo) if no key
      const mock = {
        name: user.name || "User",
        summary: "Beginner-friendly 7-day plan",
        workout: [
          { day: "Day 1", exercises: [{ name: "Bodyweight Squat", sets: 3, reps: 12, rest: "60s" }] },
          { day: "Day 2", exercises: [{ name: "Push-ups", sets: 3, reps: 10, rest: "60s" }] }
        ],
        diet: {
          Breakfast: ["Oats with fruit"],
          Lunch: ["Grilled vegetables with rice"],
          Dinner: ["Soup and salad"],
          Snacks: ["Banana", "Nuts"]
        }
      };
      return res.status(200).json(mock);
    }

    const openaiRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You output strict JSON only." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800
      },
      { headers: { Authorization: `Bearer ${openaiKey}` } }
    );

    const text = openaiRes.data.choices?.[0]?.message?.content || "";
    let plan;
    try {
      plan = JSON.parse(text);
    } catch (err) {
      // If model output is not strict JSON, return text as summary
      plan = { name: user.name || "User", summary: text, workout: text, diet: text };
    }

    // Ensure name exists
    plan.name = plan.name || user.name || "User";
    res.status(200).json(plan);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "LLM request failed" });
  }
}
