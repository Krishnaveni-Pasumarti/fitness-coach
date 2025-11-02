'use client'
import { useState } from "react";
import ImageModal from "./ImageModal";
import VoicePlayer from "./VoicePlayer";

export default function PlanCard({ plan }) {
  const [modalItem, setModalItem] = useState(null);

  // Safe renderer for arrays or strings
  const renderList = (data) => {
    if (!data) return <li>No data</li>;
    if (Array.isArray(data)) {
      return data.map((it, i) => (
        <li key={i} onClick={() => setModalItem(it)} className="cursor-pointer hover:underline">{typeof it === "string" ? it : JSON.stringify(it)}</li>
      ));
    }
    if (typeof data === "object") {
      // If object with days, map values
      const arr = Object.values(data).flat();
      return arr.map((it, i) => <li key={i} onClick={() => setModalItem(it)} className="cursor-pointer hover:underline">{typeof it === "string" ? it : JSON.stringify(it)}</li>);
    }
    // string
    const items = String(data).split(/\n|,|-|\u2022/).map(s => s.trim()).filter(Boolean);
    return items.map((it, i) => <li key={i} onClick={() => setModalItem(it)} className="cursor-pointer hover:underline">{it}</li>);
  };

  const exportPdf = async () => {
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("plan-content");
      const opt = { margin: 0.5, filename: "fitness-plan.pdf", image: { type: "jpeg", quality: 0.98 }, html2canvas: { scale: 2 } };
      html2pdf().from(element).set(opt).save();
    } catch (e) {
      console.error(e);
      alert("Export failed");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-3">Plan for {plan.name || "You"}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{plan.summary || "Personalized workout and diet plan"}</p>

      <div id="plan-content">
        <div>
          <h3 className="font-semibold">🏋️ Workout</h3>
          <ul className="list-disc pl-6 mt-2">{renderList(plan.workout)}</ul>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">🥗 Diet</h3>
          <ul className="list-disc pl-6 mt-2">{renderList(plan.diet)}</ul>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="btn" onClick={exportPdf}>Export PDF</button>
        <VoicePlayer text={`Here is your plan summary: ${plan.summary || ""}`} />
      </div>

      {modalItem && <ImageModal item={modalItem} onClose={() => setModalItem(null)} />}
    </div>
  );
}
