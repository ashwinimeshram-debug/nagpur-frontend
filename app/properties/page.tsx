"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();

    API.get(`/properties?${query}`)
      .then((res) => setProperties(res.data))
      .catch((err) => console.error(err));
  }, [searchParams]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Properties</h2>
      {/* SEARCH BAR */}
      <div className="mt-6">
        <SearchBar />
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.map((p: any) => (
          <PropertyCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}