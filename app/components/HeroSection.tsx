import FadeIn from "./ui/FadeIn";

export default function HeroSection() {
  return (
    <section className="py-12 lg:py-16 bg-white min-h-[60vh] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" duration={800}>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Un sistema para operar tu negocio desde WhatsApp.
            </h1>

            <p className="text-xl text-neutral-600 mb-8">
              Tu equipo da instrucciones. El sistema ejecuta. El cliente recibe
              atención. Todo queda registrado.
            </p>

            {/* CTA temporarily removed */}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
