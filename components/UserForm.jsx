'use client'
import { useState } from "react";
import axios from "axios";

export default function UserForm({ setPlan, setLoading }) {
  const [form, setForm] = useState({
    name: "",
    age: 25,
    gender: "Male",
    height: 170,
    weight: 70,
    goal: "Weight Loss",
    level: "Beginner",
    location: "Home",
    dietPref: "Veg",
    medical: ""
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading?.(true);
      const res = await axios.post("/api/generate-plan", { user: form });
      setPlan(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate plan");
    } finally {
      setLoading?.(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div>
        <label className="block mb-1">Name</label>
        <input name="name" value={form.name} onChange={handle} className="input" />
      </div>

      <div>
        <label className="block mb-1">Age</label>
        <input name="age" type="number" value={form.age} onChange={handle} className="input" />
      </div>

      <div>
        <label className="block mb-1">Gender</label>
        <select name="gender" value={form.gender} onChange={handle} className="input">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Height (cm)</label>
        <input name="height" type="number" value={form.height} onChange={handle} className="input" />
      </div>

      <div>
        <label className="block mb-1">Weight (kg)</label>
        <input name="weight" type="number" value={form.weight} onChange={handle} className="input" />
      </div>

      <div>
        <label className="block mb-1">Goal</label>
        <select name="goal" value={form.goal} onChange={handle} className="input">
          <option>Weight Loss</option>
          <option>Muscle Gain</option>
          <option>Maintain</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Fitness Level</label>
        <select name="level" value={form.level} onChange={handle} className="input">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Workout Location</label>
        <select name="location" value={form.location} onChange={handle} className="input">
          <option>Home</option>
          <option>Gym</option>
          <option>Outdoor</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Dietary Preference</label>
        <select name="dietPref" value={form.dietPref} onChange={handle} className="input">
          <option>Veg</option>
          <option>Non-Veg</option>
          <option>Vegan</option>
          <option>Keto</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="block mb-1">Medical History / Notes (optional)</label>
        <textarea name="medical" value={form.medical} onChange={handle} className="input" />
      </div>

      <div className="md:col-span-2 flex gap-2">
        <button type="submit" className="btn">Generate Plan</button>
        <button type="button" className="btn" onClick={() => { setForm({
          name: "", age:25, gender:"Male", height:170, weight:70,
          goal:"Weight Loss", level:"Beginner", location:"Home", dietPref:"Veg", medical:""
        })}}>Reset</button>
      </div>
    </form>
  );
}
