// export default function Home() {
//   return (
//     <div>

//       {/* HERO SECTION */}
//       <section className="grid md:grid-cols-2 items-center px-10 py-16 bg-white">
//         <img
//           src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
//           className="rounded-xl"
//         />

//         <div className="text-center md:text-left mt-10 md:mt-0 md:ml-10">
//           <p className="text-blue-500 text-sm mb-2">
//             Your Trusted Partner in Real Estate
//           </p>

//           <h1 className="text-4xl font-bold text-blue-700">
//             Nagpur Realty Hub
//           </h1>

//           <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
//             Explore Our Listings
//           </button>
//         </div>
//       </section>

//       {/* SERVICES */}
//       <section className="bg-blue-50 py-16 px-10">
//         <h2 className="text-3xl font-bold text-blue-700 mb-10">
//           Our Comprehensive Services
//         </h2>

//         <div className="grid md:grid-cols-3 gap-8">
//           {[
//             {
//               title: "Buyers",
//               desc: "Find your ideal property in Nagpur.",
//               img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
//             },
//             {
//               title: "Sellers",
//               desc: "Get maximum value for your property.",
//               img: "https://images.unsplash.com/photo-1581090700227-4c4c0fbb9b0f"
//             },
//             {
//               title: "Investors",
//               desc: "Smart investment opportunities.",
//               img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
//             }
//           ].map((item, i) => (
//             <div key={i} className="bg-white p-4 rounded shadow">
//               <img src={item.img} className="rounded mb-3" />
//               <h3 className="font-bold text-lg text-blue-700">{item.title}</h3>
//               <p className="text-gray-600">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FEATURED */}
//       <section className="py-16 px-10 bg-white">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-blue-700">
//             Featured Properties
//           </h2>

//           <a href="/properties" className="bg-blue-500 text-white px-4 py-2 rounded">
//             View All Listings
//           </a>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="bg-gray-100 h-60 rounded-xl flex items-center justify-center">
//               Property Image
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ADVANTAGES */}
//       <section className="bg-blue-50 py-16 px-10">
//         <h2 className="text-3xl font-bold text-blue-700 mb-10">
//           Key Advantages
//         </h2>

//         <div className="grid md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="font-bold text-blue-700">Tailored Services</h3>
//             <p className="text-gray-600">
//               Personalized services for your property needs.
//             </p>
//           </div>

//           <div>
//             <h3 className="font-bold text-blue-700">Local Expertise</h3>
//             <p className="text-gray-600">
//               Deep understanding of Nagpur market.
//             </p>
//           </div>

//           <div>
//             <h3 className="font-bold text-blue-700">Client Focus</h3>
//             <p className="text-gray-600">
//               Your satisfaction is our priority.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* TESTIMONIALS */}
//       <section className="py-16 px-10 bg-white">
//         <h2 className="text-3xl font-bold text-blue-700 mb-10">
//           Client Testimonials
//         </h2>

//         <div className="grid md:grid-cols-3 gap-6">
//           {["Amazing service!", "Very smooth process", "Highly recommended"].map((t, i) => (
//             <div key={i} className="bg-gray-100 p-4 rounded">
//               <p className="text-gray-700">"{t}"</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-blue-700 text-white py-10 px-10">
//         <div className="grid md:grid-cols-2 gap-8">
//           <div>
//             <h3 className="text-xl font-bold">Nagpur Realty Hub</h3>
//             <p className="mt-2 text-sm">
//               Your trusted real estate partner.
//             </p>
//           </div>

//           <div>
//             <h3 className="font-bold">Stay Updated</h3>
//             <input
//               placeholder="Enter Email"
//               className="mt-3 p-2 rounded w-full text-black"
//             />
//             <button className="mt-3 bg-white text-blue-700 px-4 py-2 rounded">
//               Submit
//             </button>
//           </div>
//         </div>
//       </footer>

//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import ImageSlider from "@/components/ImageSlider";

export default function Home() {
  const [featured, setFeatured] = useState<any[]>([]);

  useEffect(() => {
    API.get("/properties?featured=true")
      .then((res) => setFeatured(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {/* SEARCH BAR */}
      <div className="mt-6">
        <SearchBar />
      </div>

      {/* HERO SECTION */}
      <section className="grid md:grid-cols-2 items-center px-10 py-16 bg-white">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          className="rounded-xl w-full h-[400px] object-cover"
        />

        {/* <div className="text-center md:text-left mt-10 md:mt-0 md:ml-10">
          <p className="text-blue-500 text-sm mb-2">
            Your Trusted Partner in Real Estate
          </p>

          <h1 className="text-4xl font-bold text-blue-700">
            Nagpur Realty Hub
          </h1>

          <a href="/properties">
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
              Explore Our Listings
            </button>
          </a>
        </div> */}

        <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">

          <p className="text-blue-500 mb-2">
            Your Trusted Partner in Real Estate, Home Page
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
            Nagpur Realty Hub
          </h1>

          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Explore Our Listings
          </button>

        </div>

      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-16 px-10 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-700">
            Featured Properties
          </h2>

          <a
            href="/properties"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            View All Listings
          </a>
        </div>

        {/* <div className="grid md:grid-cols-3 gap-6"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.length > 0 ? (
            featured.map((p: any) => (
              <div
                key={p.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
              >
                {/* IMAGE */}
                <div className="relative">
                  {/* <img
                    src={
                      p.images && p.images.length > 0
                        ? `http://127.0.0.1:5000/${p.images[0]}`
                        : "https://via.placeholder.com/400"
                    }
                    className="h-48 w-full object-cover"
                  /> */}
                  {/* <ImageSlider images={p.images} /> */}
                  <ImageSlider images={p.images} small />

                  {/* FEATURED BADGE */}
                  {p.is_featured && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-1 rounded">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{p.title}</h3>

                  <p className="text-blue-600 font-bold mt-1">
                    ₹ {p.price}
                  </p>

                  <p className="text-gray-500 text-sm">{p.location}</p>

                  <a
                    href={`/property/${p.id}`}
                    className="text-blue-500 mt-2 inline-block"
                  >
                    View Details →
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No featured properties yet</p>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-blue-50 py-16 px-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-10">
          Our Comprehensive Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Buyers",
              desc: "Find your ideal property in Nagpur.",
            },
            {
              title: "Sellers",
              desc: "Get maximum value for your property.",
            },
            {
              title: "Investors",
              desc: "Smart investment opportunities.",
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded shadow">
              <h3 className="font-bold text-lg text-blue-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="bg-white py-16 px-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-10">
          Key Advantages
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-blue-700">Tailored Services</h3>
            <p className="text-gray-600">
              Personalized services for your property needs.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-blue-700">Local Expertise</h3>
            <p className="text-gray-600">
              Deep understanding of Nagpur market.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-blue-700">Client Focus</h3>
            <p className="text-gray-600">
              Your satisfaction is our priority.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-700 text-white py-10 px-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold">Nagpur Realty Hub</h3>
            <p className="mt-2 text-sm">
              Your trusted real estate partner.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Stay Updated</h3>
            <input
              placeholder="Enter Email"
              className="mt-3 p-2 rounded w-full text-black"
            />
            <button className="mt-3 bg-white text-blue-700 px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}