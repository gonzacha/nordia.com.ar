"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Testimonial = {
  name: string;
  business: string;
  city: string;
  text: string;
};

type TestimonialsSectionProps = {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

const defaultTestimonials: Testimonial[] = [
  {
    name: "Marcela R.",
    business: "Peluquería Estilos",
    city: "Corrientes",
    text: "Al principio pensé 'otra cosa más que no voy a saber usar', pero el setup fue re simple. Ahora la IA me agenda turnos sola y yo me enfoco en cortar. El mes pasado conté: 47 turnos que antes hubiera perdido por no contestar a tiempo.",
  },
  {
    name: "Luciana M.",
    business: "Estética Glow",
    city: "Resistencia",
    text: "Tenía una piba que me ayudaba a responder WhatsApp y me salía $280.000 por mes. Ahora con Nordia gasto una fracción y la atención es mejor porque responde al instante, incluso los domingos.",
  },
  {
    name: "Tomás F.",
    business: "Barbería Don Corte",
    city: "CABA",
    text: "Mis clientes son jóvenes y escriben a cualquier hora. Antes me levantaba con 20 mensajes sin leer y ya habían ido a otro lado. Ahora la IA les responde, les pasa los precios y les agenda. Mis reservas subieron un 30% el primer mes.",
  },
  {
    name: "Carolina S.",
    business: "Nutrición Consciente",
    city: "Rosario",
    text: "Dudaba porque mi laburo es muy personalizado, pero la IA solo responde consultas generales y agenda. Lo complejo me lo pasa a mí. Recuperé como 2 horas por día que gastaba en explicar lo mismo.",
  },
  {
    name: "Yamila P.",
    business: "Nails by Yami",
    city: "Mendoza",
    text: "Laburo sola desde casa y me era imposible contestar mientras hacía uñas. Perdía clientas todos los días. Desde que tengo Nordia, la IA contesta, muestra mi trabajo y agenda. Este mes tuve lista de espera por primera vez.",
  },
  {
    name: "Roberto D.",
    business: "Veterinaria San Bernardo",
    city: "Tandil",
    text: "En el interior pensás que estas cosas son para Capital, pero no. El soporte es argentino posta, me respondieron un sábado cuando tuve una duda. La IA ahora responde urgencias y filtra lo que realmente necesita atención inmediata.",
  },
];

// Slide animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

export default function TestimonialsSection({
  title = "Lo que dicen nuestros clientes",
  subtitle = "Negocios reales con resultados reales",
  testimonials = defaultTestimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
}: TestimonialsSectionProps) {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const totalSlides = testimonials.length;

  const paginate = useCallback((newDirection: number) => {
    setCurrentIndex(([prevIndex]) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex >= totalSlides) nextIndex = 0;
      if (nextIndex < 0) nextIndex = totalSlides - 1;
      return [nextIndex, newDirection];
    });
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setCurrentIndex([index, newDirection]);
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const interval = setInterval(() => paginate(1), autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, isPaused, autoPlayInterval, paginate]);

  // Get visible testimonials for desktop (3)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % totalSlides;
      visible.push({ ...testimonials[index], originalIndex: index });
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-neutral-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-neutral-400">
            {subtitle}
          </p>
        </motion.div>

        {/* Carousel container */}
        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white hover:bg-neutral-700 hover:border-neutral-600 transition-colors"
            aria-label="Anterior testimonio"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white hover:bg-neutral-700 hover:border-neutral-600 transition-colors"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Cards - Desktop 3 visible */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout" custom={direction}>
              {visibleTestimonials.map((testimonial, idx) => (
                <motion.div
                  key={`${currentIndex}-${idx}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                  }}
                  className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-neutral-700 transition-colors"
                >
                  {/* Quote icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="mb-6"
                  >
                    <Quote className="w-10 h-10 text-[#00ff88]/30" />
                  </motion.div>

                  {/* Text */}
                  <p className="text-neutral-300 leading-relaxed mb-8 min-h-[150px]">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-neutral-800">
                    {/* Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00ff88]/50 flex items-center justify-center"
                    >
                      <span className="text-neutral-900 font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </motion.div>

                    {/* Info */}
                    <div>
                      <p className="text-white font-medium">{testimonial.name}</p>
                      <p className="text-neutral-500 text-sm">
                        {testimonial.business} · {testimonial.city}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Cards - Mobile 1 visible */}
          <div className="lg:hidden relative h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="absolute inset-0 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8"
              >
                {/* Quote icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-[#00ff88]/30" />
                </div>

                {/* Text */}
                <p className="text-neutral-300 leading-relaxed mb-6">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-neutral-800">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00ff88]/50 flex items-center justify-center">
                    <span className="text-neutral-900 font-bold text-lg">
                      {testimonials[currentIndex].name.charAt(0)}
                    </span>
                  </div>

                  {/* Info */}
                  <div>
                    <p className="text-white font-medium">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-neutral-500 text-sm">
                      {testimonials[currentIndex].business} ·{" "}
                      {testimonials[currentIndex].city}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                animate={{
                  scale: index === currentIndex ? 1.2 : 1,
                  backgroundColor: index === currentIndex ? "#00ff88" : "#404040",
                }}
                whileHover={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "w-6" : ""
                }`}
                style={{
                  width: index === currentIndex ? 24 : 8,
                }}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
