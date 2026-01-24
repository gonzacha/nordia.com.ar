"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ChatSlide from "./ChatSlide";
import type { ChatSlide as ChatSlideType } from "@/app/data/chatSlides";

interface ChatCarouselProps {
  slides: ChatSlideType[];
}

const AUTOPLAY_INTERVAL = 6000;
const SWIPE_THRESHOLD = 50;

export default function ChatCarousel({ slides }: ChatCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate visible slides count
  const visibleCount = isMobile ? 1 : 2;
  const maxIndex = Math.ceil(slides.length / visibleCount) - 1;

  // Navigate to next/prev
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay (desktop only)
  useEffect(() => {
    if (isMobile || isPaused) return;

    const interval = setInterval(goToNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isMobile, isPaused, goToNext]);

  // Handle drag end
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const { offset, velocity } = info;
    const swipe = offset.x + velocity.x * 50;

    if (swipe < -SWIPE_THRESHOLD) {
      goToNext();
    } else if (swipe > SWIPE_THRESHOLD) {
      goToPrev();
    }
  };

  // Get visible slides for current index
  const getVisibleSlides = () => {
    const startIndex = currentIndex * visibleCount;
    const visibleSlides: ChatSlideType[] = [];

    for (let i = 0; i < visibleCount; i++) {
      const slideIndex = (startIndex + i) % slides.length;
      visibleSlides.push(slides[slideIndex]);
    }

    return visibleSlides;
  };

  const visibleSlides = getVisibleSlides();
  const totalDots = maxIndex + 1;

  return (
    <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Mirá cómo responde Nordia
          </h2>
          <p className="text-gray-400 text-lg">
            Conversaciones reales automatizadas 24/7
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing"
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {visibleSlides.map((slide) => (
                <ChatSlide
                  key={`${currentIndex}-${slide.id}`}
                  id={slide.id}
                  rubro={slide.rubro}
                  titulo={slide.titulo}
                  icono={slide.icono}
                  color={slide.color}
                  mensajes={slide.mensajes}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a slide ${index + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#00ff88] w-6"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Swipe hint (mobile only) */}
        {isMobile && (
          <p className="text-center text-gray-500 text-sm mt-4">
            Deslizá para ver más →
          </p>
        )}
      </div>
    </section>
  );
}
