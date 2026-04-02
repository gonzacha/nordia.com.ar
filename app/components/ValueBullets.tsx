import { CheckCircle2, Users, GitBranch } from "lucide-react";
import FadeIn from "./ui/FadeIn";
import Card from "./ui/Card";

export default function ValueBullets() {
  const bullets = [
    {
      icon: CheckCircle2,
      title: "Operaciones ejecutadas",
      description: "No solo mensajes respondidos"
    },
    {
      icon: Users,
      title: "Planos separados",
      description: "Admin y cliente diferenciados"
    },
    {
      icon: GitBranch,
      title: "Determinístico",
      description: "Cada acción es predecible y trazable"
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {bullets.map((bullet, index) => {
            const Icon = bullet.icon;
            return (
              <FadeIn key={index} delay={index * 100} direction="up">
                <Card variant="hover" className="p-6 h-full">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-nordia/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-nordia" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {bullet.title}
                    </h3>
                    <p className="text-neutral-600">
                      {bullet.description}
                    </p>
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
