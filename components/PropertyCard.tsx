// import ImageSlider from "./ImageSlider";

// export default function PropertyCard({ p }: any) {
//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">

//       {/* IMAGE SLIDER */}
//       <ImageSlider images={p.images} />

//       <div className="p-4">
//         <h3 className="font-semibold text-lg">{p.title}</h3>

//         <p className="text-blue-600 font-bold mt-1">
//           ₹ {p.price}
//         </p>

//         {/* LOCATION */}
//         <p className="text-gray-500 text-sm">
//           📍 {p.location || "Location not available"}
//         </p>

//         {/* VIEW DETAILS */}
//         <a
//           href={`/property/${p.id}`}
//           className="text-blue-500 mt-2 inline-block"
//         >
//           View Details →
//         </a>

//         {/* WHATSAPP BUTTON */}
//         <a
//           href={`https://wa.me/${p.contact?.mobile || "919999999999"}?text=${encodeURIComponent(
//             `🏡 Hi, I'm interested in your property: ${p.title} in ${p.location} for ₹${p.price}`
//           )}`}
//           target="_blank"
//           className="block mt-3 bg-green-500 text-white text-center py-2 rounded"
//         >
//           WhatsApp Owner
//         </a>
//       </div>
//     </div>
//   );
// }

import ImageSlider from "./ImageSlider";

export default function PropertyCard({ p }: any) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col">

      {/* IMAGE */}
      <div className="h-[180px]">
        <ImageSlider images={p.images} small />
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-grow">

        {/* TITLE */}
        <h3 className="font-semibold text-md line-clamp-1 min-h-[24px]">
          {p.title}
        </h3>

        {/* PRICE */}
        <p className="text-blue-600 font-bold mt-1 min-h-[24px]">
          ₹ {p.price}
        </p>

        {/* LOCATION */}
        <p className="text-gray-500 text-sm min-h-[20px]">
          📍 {p.location}
        </p>

        {/* VIEW DETAILS */}
        <a
          href={`/property/${p.id}`}
          className="text-blue-500 mt-2 inline-block text-sm"
        >
          View Details →
        </a>

        {/* PUSH BUTTON TO BOTTOM */}
        {/* <div className="mt-auto">
          <a
            href={`https://wa.me/${p.contact?.mobile || "919999999999"}`}
            target="_blank"
            className="block mt-3 bg-green-500 text-white text-center py-2 rounded text-sm"
          >
            WhatsApp Owner
          </a>
        </div> */}

      </div>
    </div>
  );
}