"use client";

import { useRef, useState, useEffect } from "react";
import RemolqueCard from "./RemolqueCard";
import { useRemolques } from "@/hooks/useRemolques";

export default function RemolquesSlider() {
  const { remolques, loading } = useRemolques();
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const updateCards = () => {
      const width = window.innerWidth;
      if (width >= 1536) setCardsPerView(5);
      else if (width >= 1280) setCardsPerView(4);
      else if (width >= 1024) setCardsPerView(3);
      else if (width >= 640) setCardsPerView(2);
      else setCardsPerView(1);
    };

    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const handleSlide = (dir: "next" | "prev") => {
    const totalSlides = Math.ceil(remolques.length / cardsPerView);
    const newSlide =
      dir === "next"
        ? Math.min(currentSlide + 1, totalSlides - 1)
        : Math.max(currentSlide - 1, 0);

    setCurrentSlide(newSlide);

    if (containerRef.current) {
      const cardWidth = containerRef.current.scrollWidth / remolques.length;
      containerRef.current.scrollTo({
        left: newSlide * cardsPerView * cardWidth,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <p className="text-center mt-8">Cargando remolques...</p>;

  return (
    <section className="mt-10 w-full max-w-screen-xl mx-auto px-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">Remolques destacados:</h2>

      <div className="relative">
        <div ref={containerRef} className="overflow-hidden">
          <div className="flex transition-all duration-500 gap-6">
            {remolques.map((r) => (
              <div
                key={r.id}
                className="flex-shrink-0 w-[90vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] xl:w-[19vw] max-w-[300px]"
              >
                <RemolqueCard {...r} />
              </div>
            ))}
          </div>
        </div>

        {remolques.length > cardsPerView && (
          <>
            <button
              onClick={() => handleSlide("prev")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:scale-110 transition hidden sm:flex"
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              onClick={() => handleSlide("next")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:scale-110 transition hidden sm:flex"
              aria-label="Siguiente"
            >
              ›
            </button>
          </>
        )}
      </div>
    </section>
  );
}
