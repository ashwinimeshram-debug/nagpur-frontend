"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API, { backendAssetUrl } from "@/lib/api";

function compressImage(file: File, maxWidth = 600, quality = 0.7): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let w = img.width;
        let h = img.height;

        if (w > maxWidth) {
          h = Math.round((h * maxWidth) / w);
          w = maxWidth;
        }

        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);

        canvas.toBlob(
          (blob) => {
            const compressed = new File([blob!], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressed);
          },
          "image/jpeg",
          quality
        );
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function TestimonialsCMS() {
  const router = useRouter();

  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchData = () => {
    API.get("/admin/testimonials")
      .then((res) => setTestimonials(res.data))
      .catch(() => {});
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const compressed = await compressImage(file);
      const url = await uploadImage(compressed);
      setForm((prev) => ({ ...prev, image: url }));
    } catch {
      alert("Failed to upload image");
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("Customer name is required");
      return;
    }
    if (!form.description.trim()) {
      alert("Description is required");
      return;
    }

    setLoading(true);

    try {
      if (editingId) {
        await API.put(`/admin/testimonials/${editingId}`, form);
      } else {
        await API.post("/admin/testimonials", form);
      }

      setForm({ name: "", location: "", description: "", image: "" });
      setEditingId(null);
      fetchData();
    } catch {
      alert("Error saving testimonial");
    }

    setLoading(false);
  };

  const handleEdit = (t: any) => {
    setForm({
      name: t.name || "",
      location: t.location || "",
      description: t.description || "",
      image: t.image || "",
    });
    setEditingId(t.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return;

    await API.delete(`/admin/testimonials/${id}`);
    fetchData();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const imageSrc = (path: string) => backendAssetUrl(path);

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
          Testimonials
        </h1>

        <div className="w-[90px]" />
      </div>

      {/* FORM */}
      <div className="grid gap-3 mb-6 bg-white p-4 rounded shadow">

        {/* FILE UPLOAD + IMAGE PREVIEW */}
        <div className="flex items-center gap-4">
          {form.image ? (
            <img
              src={imageSrc(form.image)}
              className="w-20 h-20 rounded-full object-cover border"
            />
          ) : form.name ? (
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold border">
              {getInitials(form.name)}
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-400">
              Photo
            </div>
          )}

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">Customer Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm"
              disabled={uploading}
            />
            {uploading && (
              <p className="text-xs text-blue-500 mt-1">Compressing & uploading...</p>
            )}
            {form.image && (
              <button
                onClick={() => setForm({ ...form, image: "" })}
                className="text-xs text-red-500 hover:underline mt-1"
              >
                Remove photo
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <input
            placeholder="Customer Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            placeholder="Location (e.g. Nagpur)"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        <textarea
          placeholder="Testimonial / Description *"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
          rows={3}
        />

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading || uploading}
            className={`flex-1 py-2 rounded text-white ${
              editingId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
            } disabled:bg-gray-400 transition`}
          >
            {loading
              ? "Saving..."
              : uploading
              ? "Uploading..."
              : editingId
              ? "Update Testimonial"
              : "Add Testimonial"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm({ name: "", location: "", description: "", image: "" });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {testimonials.length > 0 ? (
          testimonials.map((t) => (
            <div
              key={t.id}
              className={`bg-white p-4 shadow rounded flex gap-4 transition ${
                t.is_active ? "" : "opacity-50"
              }`}
            >
              {/* Avatar */}
              {t.image ? (
                <img
                  src={imageSrc(t.image)}
                  className="w-14 h-14 rounded-full object-cover shrink-0 border"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shrink-0">
                  {getInitials(t.name)}
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-bold">{t.name}</p>
                {t.location && (
                  <p className="text-sm text-gray-400">{t.location}</p>
                )}
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{t.description}</p>

                <span
                  className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${
                    t.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {t.is_active ? "Visible" : "Hidden"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  onClick={() => handleEdit(t)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No testimonials added yet.</p>
        )}
      </div>
    </div>
  );
}
