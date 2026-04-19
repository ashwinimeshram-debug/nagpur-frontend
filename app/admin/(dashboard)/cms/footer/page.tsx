"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function FooterCMS() {
  const [form, setForm] = useState({
    company_name: "",
    description: "",
    email: "",
  });

  const handleSubmit = async () => {
    await API.post("/admin/footer", form);
    alert("Saved!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Footer Settings</h1>

      <div className="grid gap-3">
        <input placeholder="Company Name" onChange={(e) => setForm({ ...form, company_name: e.target.value })} />
        <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <button onClick={handleSubmit} className="bg-blue-600 text-white py-2 rounded">
          Save Footer
        </button>
      </div>
    </div>
  );
}