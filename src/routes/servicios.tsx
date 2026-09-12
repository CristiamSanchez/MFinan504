import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — MFin504" },
      {
        name: "description",
        content:
          "Conoce los servicios financieros de MFin504: microcréditos, leasing PyME y ahorro programado.",
      },
      { property: "og:title", content: "Servicios — MFin504" },
      {
        property: "og:description",
        content:
          "Microcréditos, leasing PyME y ahorro programado para emprendedores en Honduras.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    number: "01",
    title: "Microcréditos",
    description:
      "Préstamos rápidos para capital de trabajo con requisitos mínimos y aprobación en 24 horas.",
    bullets: ["Hasta L. 50,000", "Sin avales complejos"],
  },
  {
    number: "02",
    title: "Leasing PyME",
    description:
      "Adquiere maquinaria o equipo para tu empresa sin descapitalizarte con nuestras cuotas flexibles.",
    bullets: ["Plazos de 12 a 36 meses", "Beneficios fiscales"],
  },
  {
    number: "03",
    title: "Ahorro Programado",
    description:
      "Construye tu futuro con una cuenta de ahorro que genera rendimientos competitivos mensualmente.",
    bullets: ["Rendimiento 6% anual", "Disponibilidad inmediata"],
  },
];

function ServicesPage() {
  return (
    <main>
      <section className="border-y border-border bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 items-end justify-between md:flex">
            <div className="max-w-xl">
              <h2 className="mb-4 font-display text-4xl font-extrabold tracking-tighter">
                Nuestros Servicios
              </h2>
              <p className="text-muted-foreground">
                Diseñamos productos financieros para cada etapa de tu emprendimiento o necesidad
                personal.
              </p>
            </div>
            <span className="mt-4 hidden text-sm font-medium underline decoration-primary underline-offset-4 md:block">
              Descargar Catálogo
            </span>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.number}
                className="group rounded-2xl border border-border p-8 transition-colors duration-300 hover:border-primary"
              >
                <div className="mb-6 grid size-12 place-items-center rounded-lg border border-border bg-background transition-colors group-hover:bg-primary/5">
                  <span className="font-mono text-primary">{service.number}</span>
                </div>
                <h3 className="mb-3 font-display text-xl font-bold">{service.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mb-8 space-y-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-xs">
                      <div className="size-1 rounded-full bg-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="border-b border-primary/20 pb-1 text-xs font-bold uppercase tracking-widest transition-colors group-hover:border-primary"
                >
                  Saber Más
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
