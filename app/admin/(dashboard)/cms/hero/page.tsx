// "use client";

// import { useState, useEffect } from "react";
// import API from "@/lib/api";

// export default function HeroCMS() {
//   const [slides, setSlides] = useState<any[]>([]);
//   const [form, setForm] = useState({
//     image: "",
//     title: "",
//     subtitle: "",
//     button_text: "",
//     button_link: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // 🔥 FETCH HERO
//   const fetchData = () => {
//     API.get("/hero").then((res) => setSlides(res.data));
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // 🔥 IMAGE UPLOAD
//   const uploadImage = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     // const res = await API.post("/cms/upload", formData, {
//     //   headers: { "Content-Type": "multipart/form-data" },
//     // });

//    const res = await API.post("/upload", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//     withCredentials: true,   // 🔥 REQUIRED
//     });

//     return res.data.url;
//   };

//   // 🔥 ADD HERO
//   const handleSubmit = async () => {
//     setLoading(true);

//     try {
//       await API.post("/admin/hero", form);
//       setForm({
//         image: "",
//         title: "",
//         subtitle: "",
//         button_text: "",
//         button_link: "",
//       });
//       fetchData();
//     } catch {
//       alert("Error adding hero");
//     }

//     setLoading(false);
//   };

//   // 🔥 DELETE
//   const handleDelete = async (id: number) => {
//     if (!confirm("Delete this slide?")) return;

//     await API.delete(`/hero/${id}`);
//     fetchData();
//   };

//   // 🔥 TOGGLE
//   const handleToggle = async (id: number) => {
//     await API.patch(`/hero/toggle/${id}`);
//     fetchData();
//   };

//   return (
//     <div className="p-6">
      
//       <h1 className="text-xl font-bold mb-4">Hero Section</h1>

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
//             className="h-32 rounded object-cover"
//           />
//         )}

//         <input
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) =>
//             setForm({ ...form, title: e.target.value })
//           }
//         />

//         <input
//           placeholder="Subtitle"
//           value={form.subtitle}
//           onChange={(e) =>
//             setForm({ ...form, subtitle: e.target.value })
//           }
//         />

//         <input
//           placeholder="Button Text"
//           value={form.button_text}
//           onChange={(e) =>
//             setForm({ ...form, button_text: e.target.value })
//           }
//         />

//         <input
//           placeholder="Button Link"
//           value={form.button_link}
//           onChange={(e) =>
//             setForm({ ...form, button_link: e.target.value })
//           }
//         />

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-blue-600 text-white py-2 rounded"
//         >
//           {loading ? "Saving..." : "Add Slide"}
//         </button>
//       </div>

//       {/* 🔥 LIST */}
//       <div className="grid md:grid-cols-3 gap-4">
//         {slides.map((s) => (
//           <div key={s.id} className="bg-white p-3 shadow rounded">
            
//             {s.image ? (
//               <img
//                 src={s.image}
//                 className="h-32 w-full object-cover rounded"
//               />
//             ) : (
//               <div className="h-32 bg-gray-200 flex items-center justify-center">
//                 No Image
//               </div>
//             )}

//             <p className="font-bold mt-2">{s.title}</p>

//             {/* ACTIONS */}
//             <div className="flex gap-2 mt-2">
              
//               <button
//                 onClick={() => handleToggle(s.id)}
//                 className={`px-2 py-1 text-xs rounded ${
//                   s.is_active
//                     ? "bg-green-500 text-white"
//                     : "bg-gray-400 text-white"
//                 }`}
//               >
//                 {s.is_active ? "Active" : "Inactive"}
//               </button>

//               <button
//                 onClick={() => handleDelete(s.id)}
//                 className="px-2 py-1 text-xs bg-red-500 text-white rounded"
//               >
//                 Delete
//               </button>

//             </div>
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

export default function HeroCMS() {
  const router = useRouter();

  const [slides, setSlides] = useState<any[]>([]);
  const [form, setForm] = useState({
    image: "",
    title: "",
    subtitle: "",
    button_text: "",
    button_link: "",
  });
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH HERO
  const fetchData = () => {
    API.get("/hero").then((res) => setSlides(res.data));
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

  // 🔥 ADD HERO
  const handleSubmit = async () => {
    setLoading(true);

    try {
      await API.post("/admin/hero", form);
      setForm({
        image: "",
        title: "",
        subtitle: "",
        button_text: "",
        button_link: "",
      });
      fetchData();
    } catch {
      alert("Error adding hero");
    }

    setLoading(false);
  };

  // 🔥 DELETE
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this slide?")) return;

    await API.delete(`/hero/${id}`);
    fetchData();
  };

  // 🔥 TOGGLE
  const handleToggle = async (id: number) => {
    await API.patch(`/hero/toggle/${id}`);
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
          Hero Section
        </h1>

        {/* RIGHT: Empty for balance */}
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
            className="h-32 rounded object-cover"
          />
        )}

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) =>
            setForm({ ...form, subtitle: e.target.value })
          }
        />

        <input
          placeholder="Button Text"
          value={form.button_text}
          onChange={(e) =>
            setForm({ ...form, button_text: e.target.value })
          }
        />

        <input
          placeholder="Button Link"
          value={form.button_link}
          onChange={(e) =>
            setForm({ ...form, button_link: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Saving..." : "Add Slide"}
        </button>
      </div>

      {/* 🔥 LIST */}
      <div className="grid md:grid-cols-3 gap-4">
        {slides.map((s) => (
          <div key={s.id} className="bg-white p-3 shadow rounded">
            
            {s.image ? (
              <img
                src={s.image}
                className="h-32 w-full object-cover rounded"
              />
            ) : (
              <div className="h-32 bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}

            <p className="font-bold mt-2">{s.title}</p>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-2">
              
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