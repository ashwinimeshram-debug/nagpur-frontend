// "use client";

// import { useState, useEffect } from "react";
// import API from "@/lib/api";

// export default function AdvantagesCMS() {
//   const [items, setItems] = useState<any[]>([]);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//   });

//   const fetchData = () => {
//     API.get("/advantages").then((res) => setItems(res.data));
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSubmit = async () => {
//     await API.post("/admin/advantages", form);
//     setForm({ title: "", description: "" });
//     fetchData();
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Advantages</h1>

//       <div className="grid gap-3 mb-6">
//         <input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
//         <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />

//         <button onClick={handleSubmit} className="bg-blue-600 text-white py-2 rounded">
//           Add Advantage
//         </button>
//       </div>

//       <div className="grid md:grid-cols-3 gap-4">
//         {items.map((a, i) => (
//           <div key={i} className="bg-white p-3 shadow rounded">
//             <p className="font-bold">{a.title}</p>
//             <p className="text-sm">{a.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

export default function AdvantagesCMS() {
  const router = useRouter();

  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const fetchData = () => {
    API.get("/advantages").then((res) => setItems(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 ADD / UPDATE
  const handleSubmit = async () => {
    try {
      if (editingId) {
        await API.put(`/admin/advantages/${editingId}`, form);
      } else {
        await API.post("/admin/advantages", form);
      }

      setForm({ title: "", description: "" });
      setEditingId(null);
      fetchData();
    } catch {
      alert("Error saving advantage");
    }
  };

  // 🔥 EDIT
  const handleEdit = (item: any) => {
    setForm({
      title: item.title,
      description: item.description,
    });
    setEditingId(item.id);
  };

  // 🔥 DELETE
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this item?")) return;

    await API.delete(`/admin/advantages/${id}`);
    fetchData();
  };

  return (
    <div className="p-6">

      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between mb-6">

        {/* LEFT: Back Button */}
        <button
          onClick={() => router.push("/admin/cms")}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-lg shadow-sm transition"
        >
          ← Back
        </button>

        {/* CENTER: Title */}
        <h1 className="text-xl font-bold text-center flex-1">
          Advantages
        </h1>

        {/* RIGHT: Spacer */}
        <div className="w-[90px]" />
      </div>

      {/* 🔥 FORM */}
      <div className="grid gap-3 mb-6 bg-white p-4 rounded shadow">

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="border p-2 rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white py-2 rounded"
        >
          {editingId ? "Update Advantage" : "Add Advantage"}
        </button>

        {/* CANCEL EDIT */}
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setForm({ title: "", description: "" });
            }}
            className="bg-gray-400 text-white py-2 rounded"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* 🔥 LIST */}
      <div className="grid md:grid-cols-3 gap-4">
        {items.length > 0 ? (
          items.map((a) => (
            <div
              key={a.id}
              className="bg-white p-3 shadow rounded flex flex-col"
            >
              <p className="font-bold">{a.title}</p>
              <p className="text-sm text-gray-600 mt-1">
                {a.description}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(a)}
                  className="flex-1 bg-yellow-500 text-white py-1 rounded text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(a.id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No advantages added</p>
        )}
      </div>
    </div>
  );
}