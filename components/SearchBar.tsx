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

  const handleClear = () => {
    setFilters({ location: "", type: "", category: "", min_price: "", max_price: "" });
    router.push("/properties");
  };

  return (
    <div className="bg-white shadow-lg rounded-xl px-3 py-3 flex flex-col md:flex-row flex-wrap gap-2 items-stretch md:items-center justify-center">

      <input
        placeholder="Search location (Nagpur...)"
        className="border px-2 py-1.5 rounded text-sm w-full md:w-1/5"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
      />

      <div className="flex gap-2 w-full md:w-auto">
        <select
          className="border px-2 py-1.5 rounded text-sm flex-1 md:flex-none"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">Buy/Rent</option>
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>

        <select
          className="border px-2 py-1.5 rounded text-sm flex-1 md:flex-none"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">Property Type</option>
          <option value="flat">Flat</option>
          <option value="plot">Plot</option>
          <option value="house">House</option>
        </select>
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        <input
          placeholder="Min Price"
          className="border px-2 py-1.5 rounded text-sm w-full md:w-24"
          value={filters.min_price}
          onChange={(e) => setFilters({ ...filters, min_price: e.target.value })}
        />

        <input
          placeholder="Max Price"
          className="border px-2 py-1.5 rounded text-sm w-full md:w-24"
          value={filters.max_price}
          onChange={(e) => setFilters({ ...filters, max_price: e.target.value })}
        />
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm flex-1 md:flex-none"
        >
          Search
        </button>

        <button
          onClick={handleClear}
          className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-300 transition flex-1 md:flex-none"
        >
          Clear
        </button>
      </div>
    </div>
  );
}