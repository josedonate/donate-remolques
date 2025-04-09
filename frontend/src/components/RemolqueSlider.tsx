"use client";

import { useEffect, useRef, useState } from "react";
import axios from "@/lib/axios";
import RemolqueCard from "./RemolqueCard";
import { RemolqueTarjetaDTO } from "@/types/remolque";

export default function RemolquesSlider() {
  const [remolques, setRemolques] = useState<RemolqueTarjetaDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchRemolques = async () => {
      try {
        const response = await axios.get<RemolqueTarjetaDTO[]>("/remolques/tarjetas");
        setRemolques(response.data);
      } catch (error) {
        console.error("Error cargando remolques:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRemolques();
  }, []);

  // Calcular cuántas tarjetas caben por vista
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

  const handleSlide = (direction: "prev" | "next") => {
    const totalSlides = Math.ceil(remolques.length / cardsPerView);
    const newSlide =
      direction === "next"
        ? Math.min(currentSlide + 1, totalSlides - 1)
        : Math.max(currentSlide - 1, 0);

    setCurrentSlide(newSlide);

    const container = containerRef.current;
    if (container) {
      const cardWidth = container.scrollWidth / remolques.length;
      container.scrollTo({
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
        {/* Slider container */}
        <div
          ref={containerRef}
          className="overflow-hidden"
        >
          <div className="flex transition-all duration-500 gap-6">
            {remolques.map((remolque) => (
              <div
                key={remolque.id}
                className="flex-shrink-0 w-[90vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] xl:w-[19vw] max-w-[300px]"
              >
                <RemolqueCard {...remolque} />
              </div>
            ))}
          </div>
        </div>

        {/* Flechas */}
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
