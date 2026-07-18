"use client";

import { useRouter } from "next/navigation";

export default function AdminTopbar() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white shadow-sm border-b">

      {/* LEFT: LOGO + NAME */}
      <div
        onClick={() => router.push("/admin/dashboard")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="w-9 h-9 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold">
          NR
        </div>

        <h1 className="text-lg font-semibold text-gray-800">
          Nagpur Realty Hub
        </h1>
      </div>
    </div>
  );
}
