"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const [filters, setFilters] = useState({
    location: "",
    type: "",
    category: "",
    min_price: "",
    max_price: ""
  });

  const handleSearch = () => {
    const query = new URLSearchParams(filters as any).toString();
    router.push(`/properties?${query}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex flex-wrap gap-3 items-center justify-between">

      <input
        placeholder="Search location (Nagpur...)"
        className="border p-2 rounded w-full md:w-1/5"
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
      />

      <select
        className="border p-2 rounded"
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
      >
        <option value="">Buy/Rent</option>
        <option value="buy">Buy</option>
        <option value="rent">Rent</option>
      </select>

      <select
        className="border p-2 rounded"
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">Property Type</option>
        <option value="flat">Flat</option>
        <option value="plot">Plot</option>
        <option value="house">House</option>
      </select>

      <input
        placeholder="Min Price"
        className="border p-2 rounded w-28"
        onChange={(e) => setFilters({ ...filters, min_price: e.target.value })}
      />

      <input
        placeholder="Max Price"
        className="border p-2 rounded w-28"
        onChange={(e) => setFilters({ ...filters, max_price: e.target.value })}
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}