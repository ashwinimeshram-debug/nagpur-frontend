// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import API from "@/lib/api";

// export default function AdminTopbar() {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const handleClickOutside = (event: any) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     if (!confirm("Are you sure you want to logout?")) return;

//     try {
//       await API.post("/admin/logout");
//     } catch {}

//     router.replace("/admin");
//   };

//   return (
//     <div className="flex justify-between items-center px-6 py-3 bg-white shadow-sm border-b">

//       {/* 🔥 LEFT: LOGO + NAME */}
//       <div
//         onClick={() => router.push("/admin/dashboard")}
//         className="flex items-center gap-2 cursor-pointer"
//       >
//         {/* LOGO (optional image) */}
//         <div className="w-9 h-9 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold">
//           NR
//         </div>

//         {/* WEBSITE NAME */}
//         <h1 className="text-lg font-semibold text-gray-800">
//           Nagpur Realty Hub
//         </h1>
//       </div>

//       {/* 🔥 RIGHT: PROFILE */}
//       <div className="relative" ref={dropdownRef}>
//         <button
//           onClick={() => setOpen(!open)}
//           className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
//         >
//           <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
//             A
//           </div>
//           <span className="text-sm font-medium">Admin</span>
//         </button>

//         {open && (
//           <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg z-50">

//             <button
//               onClick={() => router.push("/admin/profile")}
//               className="w-full text-left px-4 py-2 hover:bg-gray-100"
//             >
//               👤 Profile
//             </button>

//             <button
//               onClick={() => router.push("/admin/dashboard")}
//               className="w-full text-left px-4 py-2 hover:bg-gray-100"
//             >
//               📊 Dashboard
//             </button>

//             <button
//               onClick={() => router.push("/admin/add-property")}
//               className="w-full text-left px-4 py-2 hover:bg-gray-100"
//             >
//               ➕ Add Property
//             </button>

//             {/* <button
//               onClick={() => router.push("/admin/users")}
//               className="w-full text-left px-4 py-2 hover:bg-gray-100"
//             >
//               👥 Users
//             </button> */}

//             <button
//               onClick={() => router.push("/admin/cms")}
//               className="w-full text-left px-4 py-2 hover:bg-gray-100"
//             >
//               🏠 Home Page
//             </button>

//             <hr className="my-1" />

//             <button
//               onClick={handleLogout}
//               className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
//             >
//               🚪 Logout
//             </button>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

export default function AdminTopbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setOpen(false); // ✅ CLOSE DROPDOWN FIRST

    if (!confirm("Are you sure you want to logout?")) return;

    try {
      await API.post("/admin/logout");
    } catch {}

    router.replace("/admin");
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white shadow-sm border-b">

      {/* 🔥 LEFT: LOGO + NAME */}
      <div
        onClick={() => {
          setOpen(false); // ✅ CLOSE DROPDOWN
          router.push("/admin/dashboard");
        }}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="w-9 h-9 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold">
          NR
        </div>

        <h1 className="text-lg font-semibold text-gray-800">
          Nagpur Realty Hub
        </h1>
      </div>

      {/* 🔥 RIGHT: PROFILE */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            A
          </div>
          <span className="text-sm font-medium">Admin</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg z-50">

            <button
              onClick={() => {
                setOpen(false); // ✅ CLOSE DROPDOWN
                router.push("/admin/profile");
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              👤 Profile
            </button>

            <button
              onClick={() => {
                setOpen(false); // ✅ CLOSE DROPDOWN
                router.push("/admin/dashboard");
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              📊 Dashboard
            </button>

            <button
              onClick={() => {
                setOpen(false); // ✅ CLOSE DROPDOWN
                router.push("/admin/add-property");
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              ➕ Add Property
            </button>

            <button
              onClick={() => {
                setOpen(false); // ✅ CLOSE DROPDOWN
                router.push("/admin/cms");
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              🏠 Home Page
            </button>

            <hr className="my-1" />

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
            >
              🚪 Logout
            </button>

          </div>
        )}
      </div>
    </div>
  );
}