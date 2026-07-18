"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import { backendAssetUrl } from "@/lib/api";

export default function HeroCMS() {
  const router = useRouter();

  const [slides, setSlides] = useState<any[]>([]);
  const [form, setForm] = useState({
    image: "",
    title: "",
    subtitle: "",
    button_text: "",
    button_link: "",
    overlay_opacity: 40,
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchData = () => {
    API.get("/hero").then((res) => setSlides(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await API.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    return res.data.url;
  };

  const resetForm = () => {
    setForm({ image: "", title: "", subtitle: "", button_text: "", button_link: "", overlay_opacity: 40 });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (editingId) {
        await API.put(`/hero/${editingId}`, form);
      } else {
        await API.post("/admin/hero", form);
      }
      resetForm();
      fetchData();
    } catch {
      alert(editingId ? "Error updating hero" : "Error adding hero");
    }

    setLoading(false);
  };

  const handleEdit = (slide: any) => {
    setEditingId(slide.id);
    setForm({
      image: slide.image || "",
      title: slide.title || "",
      subtitle: slide.subtitle || "",
      button_text: slide.button_text || "",
      button_link: slide.button_link || "",
      overlay_opacity: slide.overlay_opacity ?? 40,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this slide?")) return;

    await API.delete(`/hero/${id}`);
    if (editingId === id) resetForm();
    fetchData();
  };

  const handleToggle = async (id: number) => {
    await API.patch(`/hero/toggle/${id}`);
    fetchData();
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push("/admin/cms")}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-lg shadow-sm transition"
        >
          ← Back
        </button>

        <h1 className="text-xl font-bold text-center flex-1">
          Hero Section
        </h1>

        <div className="w-[90px]" />
      </div>

      {/* FORM */}
      <div className="grid gap-3 mb-6 bg-white p-4 rounded shadow">
        
        {editingId && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm px-3 py-2 rounded flex items-center justify-between">
            <span>Editing slide #{editingId}</span>
            <button onClick={resetForm} className="text-blue-500 underline text-xs">Cancel</button>
          </div>
        )}

        {/* FILE UPLOAD */}
        <input
          type="file"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const url = await uploadImage(file);
            setForm({ ...form, image: url });
          }}
        />

        {/* IMAGE PREVIEW */}
        {form.image && (
          <div className="relative">
            <img
              src={backendAssetUrl(form.image)}
              className="h-32 w-full rounded object-cover"
            />
            <div
              className="absolute inset-0 rounded"
              style={{ backgroundColor: `rgba(0,0,0,${form.overlay_opacity / 100})` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">
              Preview: {form.overlay_opacity}% overlay
            </div>
          </div>
        )}

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
        />

        <input
          placeholder="Button Text"
          value={form.button_text}
          onChange={(e) => setForm({ ...form, button_text: e.target.value })}
        />

        <input
          placeholder="Button Link (leave empty to stay on home page)"
          value={form.button_link}
          onChange={(e) => setForm({ ...form, button_link: e.target.value })}
        />

        {/* OVERLAY OPACITY SLIDER */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Background Overlay Opacity: <span className="text-blue-600 font-bold">{form.overlay_opacity}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={form.overlay_opacity}
            onChange={(e) => setForm({ ...form, overlay_opacity: Number(e.target.value) })}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Transparent (0%)</span>
            <span>Opaque (100%)</span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`py-2 rounded text-white ${editingId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading
            ? editingId ? "Updating..." : "Saving..."
            : editingId ? "Update Slide" : "Add Slide"}
        </button>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-4">
        {slides.map((s) => (
          <div key={s.id} className="bg-white p-3 shadow rounded">
            
            {s.image ? (
              <div className="relative">
                <img
                  src={backendAssetUrl(s.image)}
                  className="h-32 w-full object-cover rounded"
                />
                <div
                  className="absolute inset-0 rounded"
                  style={{ backgroundColor: `rgba(0,0,0,${(s.overlay_opacity ?? 40) / 100})` }}
                />
              </div>
            ) : (
              <div className="h-32 bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}

            <p className="font-bold mt-2">{s.title}</p>
            {s.subtitle && <p className="text-sm text-gray-500">{s.subtitle}</p>}
            {s.button_text && <p className="text-xs text-gray-400 mt-1">Button: {s.button_text} → {s.button_link || "/"}</p>}

            {/* ACTIONS */}
            <div className="flex gap-2 mt-2 flex-wrap">
              
              <button
                onClick={() => handleToggle(s.id)}
                className={`px-2 py-1 text-xs rounded ${
                  s.is_active
                    ? "bg-green-500 text-white"
                    : "bg-gray-400 text-white"
                }`}
              >
                {s.is_active ? "Active" : "Inactive"}
              </button>

              <button
                onClick={() => handleEdit(s)}
                className={`px-2 py-1 text-xs rounded ${
                  editingId === s.id
                    ? "bg-yellow-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {editingId === s.id ? "Editing" : "Edit"}
              </button>

              <button
                onClick={() => handleDelete(s.id)}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
