'use client'
import { useState } from "react";
import UserForm from "../components/UserForm";
import PlanCard from "../components/PlanCard";

export default function HomePage() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">AI Fitness Coach</h1>
      <p className="mb-6">Fill your details and generate a personalized plan.</p>

      <UserForm setPlan={setPlan} setLoading={setLoading} />

      {loading && <p className="mt-4">Generating plan…</p>}

      {plan && (
        <div className="mt-6">
          <PlanCard plan={plan} />
        </div>
      )}
    </main>
  );
}
