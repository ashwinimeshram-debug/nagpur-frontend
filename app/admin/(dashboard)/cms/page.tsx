"use client";

import Link from "next/link";

export default function CMSDashboard() {
  const items = [
    { name: "Hero Section", path: "/admin/cms/hero" },
    { name: "Services", path: "/admin/cms/services" },
    { name: "Advantages", path: "/admin/cms/advantages" },
    // { name: "Footer", path: "/admin/cms/footer" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">CMS Management</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <Link key={item.path} href={item.path}>
            <div className="p-6 bg-white shadow rounded cursor-pointer hover:shadow-lg">
              <h2 className="text-lg font-semibold">{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}