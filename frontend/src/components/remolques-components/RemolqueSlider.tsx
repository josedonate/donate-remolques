"use client";

import { useRemolques } from "@/hooks/useRemolques";
import RemolqueCard from "./RemolqueCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 4,
    partialVisibilityGutter: 0,
  },
  desktop: {
    breakpoint: { max: 1536, min: 1280 },
    items: 3,
    partialVisibilityGutter: 0,
  },
  tablet: {
    breakpoint: { max: 1280, min: 1024 },
    items: 3,
    partialVisibilityGutter: 0,
  },
  smallTablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    partialVisibilityGutter: 0,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    partialVisibilityGutter: 0,
  },
};

function CustomButtonGroup({ next, previous }: { next?: () => void; previous?: () => void }) {
  return (
    <>
      <button
        onClick={previous}
        className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:scale-110 transition hidden sm:flex"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:scale-110 transition hidden sm:flex"
        aria-label="Siguiente"
      >
        <ChevronRight size={24} />
      </button>
    </>
  );
}

export default function RemolquesSlider() {
  const { remolques, loading } = useRemolques();

  if (loading) return <p className="text-center mt-8">Cargando remolques...</p>;

  return (
    <section className="mt-10 w-full max-w-screen-xl mx-auto px-4 relative">
      <h2 className="text-3xl font-semibold mb-6 text-center">Remolques destacados:</h2>

      <div className="relative">
        <Carousel
          responsive={responsive}
          infinite
          arrows={false}
          renderButtonGroupOutside
          customButtonGroup={<CustomButtonGroup />}
          itemClass="px-4" // margen entre tarjetas
          containerClass="pb-4"
          centerMode
          partialVisible={false}
        >
          {remolques.map((remolque) => (
            <RemolqueCard key={remolque.id} {...remolque} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
