export default function HeroSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
            Tu WhatsApp responde solo.
          </h1>

          <p className="text-xl text-neutral-600 mb-8">
            Nordia atiende clientes, muestra servicios y agenda turnos automáticamente.
          </p>

          <a
            href="#live-demo"
            className="inline-block px-8 py-4 bg-[#00ff88] text-neutral-900 font-semibold rounded-xl hover:bg-[#00ff88]/90 transition-colors"
          >
            Ver demo
          </a>
        </div>
      </div>
    </section>
  );
}
