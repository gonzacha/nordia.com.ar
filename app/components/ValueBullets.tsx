export default function ValueBullets() {
  const bullets = [
    "Operaciones ejecutadas, no solo mensajes respondidos",
    "Plano admin y plano cliente separados",
    "Determinístico: cada acción es predecible y trazable"
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {bullets.map((bullet, index) => (
            <div key={index} className="text-center">
              <p className="text-lg text-neutral-700 font-medium">
                {bullet}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
