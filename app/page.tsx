"use client";

import { useEffect, useState } from "react";
import API, { backendAssetUrl } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import ImageSlider from "@/components/ImageSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className || ""}`}
    />
  );
}

export default function Home() {
  const [featured, setFeatured] = useState<any[]>([]);
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [advantages, setAdvantages] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get("/properties?featured=true").then((res) => setFeatured(res.data)).catch(() => {}),
      API.get("/hero").then((res) => setHeroSlides(res.data)).catch(() => {}),
      API.get("/services").then((res) => setServices(res.data)).catch(() => {}),
      API.get("/advantages").then((res) => setAdvantages(res.data)).catch(() => {}),
      API.get("/testimonials").then((res) => setTestimonials(res.data)).catch(() => {}),
      API.get("/settings").then((res) => setSettings(res.data)).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  const isVisible = (key: string) => settings[key] !== "false";

  return (
    <div>
      {/* SEARCH BAR */}
      <div className="mt-4 px-4 md:px-10">
        <SearchBar />
      </div>

      {/* HERO */}
      {isVisible("section_hero_visible") && (
      <section className="px-4 md:px-10 pb-6 pt-4">
        {loading ? (
          <Skeleton className="h-[250px] md:h-[520px] w-full rounded-xl" />
        ) : heroSlides.length > 0 ? (
          <Swiper
            modules={[Autoplay]}
            loop
            autoplay={{ delay: 3000 }}
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                  <div
                    className="h-[250px] md:h-[520px] rounded-xl bg-cover bg-center flex items-center justify-center"
                    style={{
                      backgroundImage: slide.image
                        ? `url(${backendAssetUrl(slide.image)})`
                        : "none",
                    }}
                  >
                    {(slide.title || slide.subtitle || slide.button_text) && (
                      <div
                        className="p-4 md:p-6 rounded text-center text-white max-w-[90%] md:max-w-none"
                        style={{ backgroundColor: `rgba(0,0,0,${(slide.overlay_opacity ?? 40) / 100})` }}
                      >
                        {slide.title && (
                          <h1 className="text-2xl md:text-4xl font-bold">{slide.title}</h1>
                        )}
                        {slide.subtitle && (
                          <p className="mt-1 md:mt-2 text-sm md:text-base">{slide.subtitle}</p>
                        )}
                        {slide.button_text && (
                          <a href={slide.button_link || "/"}>
                            <button className="mt-3 md:mt-4 bg-blue-600 px-4 py-2 rounded text-sm md:text-base">
                              {slide.button_text}
                            </button>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-[250px] md:h-[420px] bg-gray-200 flex items-center justify-center rounded-xl">
            No Hero Content
          </div>
        )}
      </section>
      )}

      {/* FEATURED PROPERTIES */}
      <section className="py-8 md:py-10 px-4 md:px-10 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
            Featured Properties
          </h2>

          <a
            href="/properties"
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm md:text-base shrink-0"
          >
            View All Listings
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white shadow-lg rounded-xl overflow-hidden">
                <Skeleton className="h-40 w-full rounded-none" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))
          ) : featured.length > 0 ? (
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

      {/* SERVICES */}
      {isVisible("section_services_visible") && (
      <section className="bg-blue-50 py-8 md:py-10 px-4 md:px-10">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">
          Our Comprehensive Services
        </h2>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-4 rounded shadow">
                <Skeleton className="h-40 w-full rounded" />
                <div className="mt-3 space-y-2">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))
          ) : services.length > 0 ? (
            services.map((s) => (
              <div
                key={s.id}
                className="bg-white p-4 rounded shadow flex flex-col"
              >
                {s.image ? (
                  <img
                    src={backendAssetUrl(s.image)}
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
      )}

      {/* ADVANTAGES */}
      {isVisible("section_advantages_visible") && (
      <section className="bg-white py-8 md:py-10 px-4 md:px-10">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">
          Key Advantages
        </h2>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))
          ) : advantages.length > 0 ? (
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
      )}

      {/* TESTIMONIALS */}
      {isVisible("section_testimonials_visible") && (
      <section className="bg-gray-50 py-8 md:py-10 px-4 md:px-10">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 text-center">
          What Our Customers Say
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-28 bg-gray-200 rounded" />
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-3 w-full bg-gray-200 rounded" />
                  <div className="h-3 w-3/4 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                {/* Quote icon */}
                <svg className="w-8 h-8 text-blue-200 mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {t.description}
                </p>

                <div className="flex items-center gap-3 border-t pt-4">
                  {/* Avatar or initials */}
                  {t.image ? (
                    <img
                      src={backendAssetUrl(t.image)}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-blue-100"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                      {t.name
                        .split(" ")
                        .map((w: string) => w[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    {t.location && (
                      <p className="text-xs text-gray-400">{t.location}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No testimonials yet</p>
        )}
      </section>
      )}
    </div>
  );
}
