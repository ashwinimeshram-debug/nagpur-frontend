"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useParams } from "next/navigation";
import ImageSlider from "@/components/ImageSlider";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    if (id) {
      API.get(`/property/${id}`)
        .then((res) => setProperty(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!property) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">

      {/* TOP SECTION: IMAGE + DETAILS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* IMAGE */}
        <div className="bg-white p-4 rounded-xl shadow">
          <ImageSlider images={property.images} />
        </div>

        {/* PROPERTY DETAILS */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold">{property.title}</h1>

            <p className="text-blue-600 text-xl font-semibold mt-2">
              ₹ {property.price}
            </p>

            <p className="text-gray-500 mt-2">
              📍 {property.location}
            </p>

            <hr className="my-4" />

            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-700">
              {property.description || "No description available"}
            </p>
          </div>
        </div>

      </div>

      {/* OWNER DETAILS BELOW */}
      {/* <div className="bg-white p-6 mt-6 rounded-xl shadow max-w-xl">
        <h3 className="text-lg font-bold mb-4">Contact Owner</h3>

        <p className="text-gray-700 mb-2">
          👤 {property.contact?.name || "Owner"}
        </p>

        <p className="text-gray-700 mb-4">
          📞 {property.contact?.mobile || "Not Available"}
        </p>

        OPTIONAL BUTTONS (UNCOMMENT IF NEEDED)

        <a
          href={`https://wa.me/${property.contact?.mobile}?text=${encodeURIComponent(
            `🏡 Hi, I'm interested in your property: ${property.title} in ${property.location} for ₹${property.price}`
          )}`}
          target="_blank"
          className="block w-full bg-green-500 text-white text-center py-3 rounded-lg mb-3"
        >
          WhatsApp Owner
        </a>

        <a
          href={`tel:${property.contact?.mobile}`}
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg"
        >
          Call Now
        </a>
      </div> */}

    </div>
  );
}