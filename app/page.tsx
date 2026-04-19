"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import ImageSlider from "@/components/ImageSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Home() {
  const [featured, setFeatured] = useState<any[]>([]);
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [advantages, setAdvantages] = useState<any[]>([]);

  useEffect(() => {
    API.get("/properties?featured=true")
      .then((res) => setFeatured(res.data))
      .catch(() => {});

    API.get("/hero").then((res) => setHeroSlides(res.data));
    API.get("/services").then((res) => setServices(res.data));
    API.get("/advantages").then((res) => setAdvantages(res.data));
  }, []);

  return (
    <div>
      {/* SEARCH BAR */}
      <div className="mt-6">
        <SearchBar />
      </div>

      {/* 🔥 HERO FIXED */}
      <section className="px-10 py-10">
        {heroSlides.length > 0 ? (
          <Swiper
            modules={[Autoplay]}
            loop
            autoplay={{ delay: 3000 }}
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div
                  className="h-[420px] rounded-xl bg-cover bg-center flex items-center justify-center"
                  style={{
                    backgroundImage: slide.image
                      ? `url(${slide.image})`
                      : "none",
                  }}
                >
                  <div className="bg-black/40 p-6 rounded text-center text-white">
                    <h1 className="text-4xl font-bold">
                      {slide.title || "Welcome"}
                    </h1>
                    <p className="mt-2">
                      {slide.subtitle || ""}
                    </p>

                    {slide.button_text && (
                      <a href={slide.button_link || "#"}>
                        <button className="mt-4 bg-blue-600 px-4 py-2 rounded">
                          {slide.button_text}
                        </button>
                      </a>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-[420px] bg-gray-200 flex items-center justify-center rounded-xl">
            No Hero Content
          </div>
        )}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.length > 0 ? (
            featured.map((p: any) => (
              <div
                key={p.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
              >
                <div className="relative">
                  {p.images && p.images.length > 0 ? (
                    <ImageSlider images={p.images} small />
                  ) : (
                    <div className="h-40 bg-gray-200 flex items-center justify-center">
                      No Image
                    </div>
                  )}

                  {p.is_featured && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-1 rounded">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg">
                    {p.title || "No Title"}
                  </h3>

                  <p className="text-blue-600 font-bold mt-1">
                    ₹ {p.price || 0}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {p.location || ""}
                  </p>

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

      {/* 🔥 SERVICES FIXED */}
      <section className="bg-blue-50 py-16 px-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-10">
          Our Comprehensive Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.length > 0 ? (
            services.map((s) => (
              <div
                key={s.id}
                className="bg-white p-4 rounded shadow flex flex-col"
              >
                {s.image ? (
                  <img
                    src={s.image}
                    className="h-40 w-full object-cover rounded"
                  />
                ) : (
                  <div className="h-40 w-full bg-gray-200 flex items-center justify-center rounded">
                    No Image
                  </div>
                )}

                <div className="mt-3">
                  <h3 className="font-bold text-lg text-blue-700">
                    {s.title || "No Title"}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {s.description || ""}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No services added</p>
          )}
        </div>
      </section>

      {/* 🔥 ADVANTAGES FIXED */}
      <section className="bg-white py-16 px-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-10">
          Key Advantages
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {advantages.length > 0 ? (
            advantages.map((a, i) => (
              <div key={i}>
                <h3 className="font-bold text-blue-700">
                  {a.title || "Title"}
                </h3>
                <p className="text-gray-600 mt-1">
                  {a.description || ""}
                </p>
              </div>
            ))
          ) : (
            <p>No advantages added</p>
          )}
        </div>
      </section>

      {/* FOOTER */}
      {/* <footer className="bg-blue-700 text-white py-10 px-10">
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
      </footer> */}
    </div>
  );
}