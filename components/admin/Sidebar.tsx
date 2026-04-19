// components/admin/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    // { name: "Properties", path: "/admin/properties" },
    { name: "Add Property", path: "/admin/add-property" },
    { name: "Users", path: "/admin/users" },
    { name: "Profile", path: "/admin/profile" },
  ];

  // 🔥 Logout with confirmation
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      await axios.post(
        "http://localhost:5000/api/admin/logout",
        {},
        { withCredentials: true }
      );

      // ✅ Redirect safely
      router.replace("/admin");

    } catch (error) {
      console.error("Logout failed", error);
      alert("Something went wrong while logging out.");
    }
  };

  return (
    <div className="w-64 bg-white shadow-md p-5 flex flex-col justify-between">
      
      {/* Top Section */}
      <div>
        <h2 className="text-xl font-bold mb-6 text-blue-600">
          Admin Panel
        </h2>

        <ul className="space-y-2">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block px-3 py-2 rounded-lg transition ${
                  pathname === item.path
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section - Logout */}
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}