// "use client";

// import { useState, useEffect } from "react";
// import API from "@/lib/api";

// export default function ServicesCMS() {
//   const [services, setServices] = useState<any[]>([]);
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     image: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // 🔥 FETCH
//   const fetchData = () => {
//     API.get("/services")
//       .then((res) => setServices(res.data))
//       .catch(() => {});
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // 🔥 IMAGE UPLOAD
//   const uploadImage = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await API.post("/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//       withCredentials: true,
//     });

//     return res.data.url;
//   };

//   // 🔥 ADD / UPDATE
//   const handleSubmit = async () => {
//     setLoading(true);

//     try {
//       if (editingId) {
//         await API.put(`/admin/services/${editingId}`, form);
//       } else {
//         await API.post("/admin/services", form);
//       }

//       setForm({ title: "", description: "", image: "" });
//       setEditingId(null);
//       fetchData();
//     } catch {
//       alert("Error saving service");
//     }

//     setLoading(false);
//   };

//   // 🔥 EDIT
//   const handleEdit = (s: any) => {
//     setForm({
//       title: s.title || "",
//       description: s.description || "",
//       image: s.image || "",
//     });
//     setEditingId(s.id);
//   };

//   // 🔥 DELETE
//   const handleDelete = async (id: number) => {
//     if (!confirm("Delete this service?")) return;

//     await API.delete(`/admin/services/${id}`);
//     fetchData();
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Services</h1>
      
//       {/* 🔥 FORM */}
//       <div className="grid gap-3 mb-6 bg-white p-4 rounded shadow">

//         {/* FILE UPLOAD */}
//         <input
//           type="file"
//           onChange={async (e) => {
//             const file = e.target.files?.[0];
//             if (!file) return;

//             const url = await uploadImage(file);
//             setForm({ ...form, image: url });
//           }}
//         />

//         {/* IMAGE PREVIEW */}
//         {form.image && (
//           <img
//             src={form.image}
//             className="h-32 w-full object-cover rounded"
//           />
//         )}

//         <input
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) =>
//             setForm({ ...form, title: e.target.value })
//           }
//           className="border p-2 rounded"
//         />

//         <textarea
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) =>
//             setForm({ ...form, description: e.target.value })
//           }
//           className="border p-2 rounded"
//         />

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-blue-600 text-white py-2 rounded"
//         >
//           {loading
//             ? "Saving..."
//             : editingId
//             ? "Update Service"
//             : "Add Service"}
//         </button>

//         {/* CANCEL EDIT */}
//         {editingId && (
//           <button
//             onClick={() => {
//               setEditingId(null);
//               setForm({ title: "", description: "", image: "" });
//             }}
//             className="bg-gray-400 text-white py-2 rounded"
//           >
//             Cancel Edit
//           </button>
//         )}
//       </div>

//       {/* 🔥 LIST */}
//       <div className="grid md:grid-cols-3 gap-4">
//         {services.length > 0 ? (
//           services.map((s) => (
//             <div
//               key={s.id}
//               className="bg-white p-3 shadow rounded flex flex-col"
//             >
//               {/* IMAGE SAFE */}
//               {s.image ? (
//                 <img
//                   src={s.image}
//                   className="h-32 w-full object-cover rounded"
//                 />
//               ) : (
//                 <div className="h-32 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
//                   No Image
//                 </div>
//               )}

//               <p className="font-bold mt-2">
//                 {s.title || "No Title"}
//               </p>

//               <p className="text-sm text-gray-600 mt-1">
//                 {s.description || ""}
//               </p>

//               {/* ACTIONS */}
//               <div className="flex gap-2 mt-3">
//                 <button
//                   onClick={() => handleEdit(s)}
//                   className="flex-1 bg-yellow-500 text-white py-1 rounded text-sm"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => handleDelete(s.id)}
//                   className="flex-1 bg-red-500 text-white py-1 rounded text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No services added</p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

export default function ServicesCMS() {
  const router = useRouter();

  const [services, setServices] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 FETCH
  const fetchData = () => {
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 IMAGE UPLOAD
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await API.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    return res.data.url;
  };

  // 🔥 ADD / UPDATE
  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (editingId) {
        await API.put(`/admin/services/${editingId}`, form);
      } else {
        await API.post("/admin/services", form);
      }

      setForm({ title: "", description: "", image: "" });
      setEditingId(null);
      fetchData();
    } catch {
      alert("Error saving service");
    }

    setLoading(false);
  };

  // 🔥 EDIT
  const handleEdit = (s: any) => {
    setForm({
      title: s.title || "",
      description: s.description || "",
      image: s.image || "",
    });
    setEditingId(s.id);
  };

  // 🔥 DELETE
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this service?")) return;

    await API.delete(`/admin/services/${id}`);
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
          Services
        </h1>

        {/* RIGHT: Spacer */}
        <div className="w-[90px]" />
      </div>

      {/* 🔥 FORM */}
      <div className="grid gap-3 mb-6 bg-white p-4 rounded shadow">

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
          <img
            src={form.image}
            className="h-32 w-full object-cover rounded"
          />
        )}

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
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded"
        >
          {loading
            ? "Saving..."
            : editingId
            ? "Update Service"
            : "Add Service"}
        </button>

        {/* CANCEL EDIT */}
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setForm({ title: "", description: "", image: "" });
            }}
            className="bg-gray-400 text-white py-2 rounded"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* 🔥 LIST */}
      <div className="grid md:grid-cols-3 gap-4">
        {services.length > 0 ? (
          services.map((s) => (
            <div
              key={s.id}
              className="bg-white p-3 shadow rounded flex flex-col"
            >
              {/* IMAGE SAFE */}
              {s.image ? (
                <img
                  src={s.image}
                  className="h-32 w-full object-cover rounded"
                />
              ) : (
                <div className="h-32 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                  No Image
                </div>
              )}

              <p className="font-bold mt-2">
                {s.title || "No Title"}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {s.description || ""}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(s)}
                  className="flex-1 bg-yellow-500 text-white py-1 rounded text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(s.id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No services added</p>
        )}
      </div>
    </div>
  );
}