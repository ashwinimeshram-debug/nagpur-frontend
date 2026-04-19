"use client";

import { useState } from "react";

export default function ImageSlider({
  images,
  small = false,
}: {
  images: string[];
  small?: boolean;
}) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center rounded-xl ${
          small ? "h-[180px]" : "h-[400px]"
        }`}
      >
        No Image
      </div>
    );
  }

  const prev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">

      {/* MAIN IMAGE */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={`http://127.0.0.1:5000/${images[index]}`}
          className={`w-full object-cover ${
            small ? "h-[180px]" : "h-[400px] md:h-[500px]"
          }`}
        />

        {/* ARROWS */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded shadow"
            >
              ◀
            </button>

            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded shadow"
            >
              ▶
            </button>
          </>
        )}
      </div>

      {/* THUMBNAILS (ONLY FOR LARGE VIEW) */}
      {!small && (
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {images.map((img, i) => (
            <img
              key={i}
              src={`http://127.0.0.1:5000/${img}`}
              onClick={() => setIndex(i)}
              className={`h-20 w-28 object-cover rounded cursor-pointer border ${
                index === i ? "border-blue-500" : "border-gray-200"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}