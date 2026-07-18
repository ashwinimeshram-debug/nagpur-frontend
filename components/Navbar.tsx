"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API from "@/lib/api";
import { backendAssetUrl } from "@/lib/api";

export default function Navbar() {
  const [siteName, setSiteName] = useState("Nagpur Realty Hub");
  const [siteLogo, setSiteLogo] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    API.get("/settings")
      .then((res) => {
        if (res.data.site_name) setSiteName(res.data.site_name);
        if (res.data.site_logo) setSiteLogo(res.data.site_logo);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-white shadow-md px-4 md:px-6 py-3 flex justify-between items-center relative">
      <Link href="/" className="flex items-center gap-2 text-lg md:text-xl font-bold text-blue-600 hover:text-blue-800 transition">
        {siteLogo && (
          <img
            src={backendAssetUrl(siteLogo)}
            alt="Logo"
            className="h-8 w-8 md:h-9 md:w-9 object-contain rounded"
          />
        )}
        <span className="truncate max-w-[180px] md:max-w-none">{siteName}</span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6">
        <a href="/" className="hover:text-blue-500">Home</a>
        <a href="/properties" className="hover:text-blue-500">Properties</a>
        <a href="/admin" className="bg-blue-500 text-white px-4 py-2 rounded">
          Admin
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 rounded hover:bg-gray-100 transition"
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50 md:hidden">
          <a href="/" onClick={() => setMenuOpen(false)} className="block px-6 py-3 hover:bg-gray-50 transition">Home</a>
          <a href="/properties" onClick={() => setMenuOpen(false)} className="block px-6 py-3 hover:bg-gray-50 transition">Properties</a>
          <a href="/admin" onClick={() => setMenuOpen(false)} className="block px-6 py-3 hover:bg-gray-50 transition">Admin</a>
        </div>
      )}
    </div>
  );
}
