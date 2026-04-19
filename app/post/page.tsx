"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function PostProperty() {
  const [form, setForm] = useState<any>({});
  const [files, setFiles] = useState<File[]>([]);
  const [index, setIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false); // code for disble submit button
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // ✅ Validation
    if (!form.mobile && !form.email) {
      alert("Please provide Mobile or Email");
      return;
    }

    if (!form.title || !form.price || !form.location) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const res = await API.post("/submit-property", formData);
      alert(res.data.message);
      // 👉 code for disable submit button
    setSubmitted(true);
    } catch (err: any) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? files.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === files.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* ================= LEFT SIDE ================= */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-4">Post Property</h2>

          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className="w-full border p-2 mb-3 rounded"
            placeholder="Description"
            rows={4}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Price"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Location"
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <select
            className="w-full border p-2 mb-3 rounded"
            onChange={(e) =>
              setForm({ ...form, transaction_type: e.target.value })
            }
          >
            <option value="">Select Sell / Rent</option>
            <option value="buy">Sell</option>
            <option value="rent">Rent</option>
          </select>

          <select
            className="w-full border p-2 mb-3 rounded"
            onChange={(e) =>
              setForm({ ...form, property_type: e.target.value })
            }
          >
            <option value="">Property Type</option>
            <option value="flat">Flat</option>
            <option value="house">Row House</option>
            <option value="plot">Plot</option>
          </select>

          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Your Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* ✅ EMAIL FIELD */}
          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Email (optional)"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Mobile Number"
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />

          {/* <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-3 rounded w-full mt-3"
          >
            Submit Property
          </button> */}
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="text-xl font-semibold mb-4">Property Images</h3>

          {/* MAIN IMAGE SLIDER */}
          <div className="relative h-[300px] md:h-[400px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">

            {files.length > 0 ? (
              <img
                src={URL.createObjectURL(files[index])}
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-400">No Image Selected</p>
            )}

            {files.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded shadow"
                >
                  ◀
                </button>

                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded shadow"
                >
                  ▶
                </button>
              </>
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {files.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                onClick={() => setIndex(i)}
                className={`h-20 w-28 object-cover rounded cursor-pointer border ${
                  index === i ? "border-blue-500" : "border-gray-200"
                }`}
              />
            ))}
          </div>

          {/* FILE INPUT */}
          <input
            type="file"
            multiple
            className="mt-4"
            onChange={(e) => {
              if (e.target.files) {
                setFiles((prev) => [
                  ...prev,
                  ...Array.from(e.target.files)
                ]);
              }
            }}
          />

          {/* REMOVE BUTTON */}
          {files.length > 0 && (
            <button
              onClick={() => {
                const updated = files.filter((_, i) => i !== index);
                setFiles(updated);
                setIndex(0);
              }}
              className="mt-3 text-red-500 text-sm"
            >
              Remove Selected Image
            </button>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || submitted} // 👉 code for disable submit button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded w-full mt-3 disabled:bg-gray-400"
            // className="bg-green-500 text-white px-4 py-3 rounded w-full mt-3"
          >
            Submit Property
          </button>

        </div>

      </div>
    </div>
  );
}