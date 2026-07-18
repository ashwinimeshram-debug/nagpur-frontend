"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";

function PropertiesContent() {
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
      {/* SEARCH BAR */}
      <div>
        <SearchBar />
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {properties.map((p: any) => (
          <PropertyCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}

export default function Properties() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
