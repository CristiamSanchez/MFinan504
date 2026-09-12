import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MFin504 — Finanzas claras para tu negocio" },
      {
        name: "description",
        content:
          "MFin504 ofrece microcréditos, leasing PyME y ahorro programado para emprendedores en Honduras.",
      },
      { property: "og:title", content: "MFin504 — Finanzas claras para tu negocio" },
      {
        property: "og:description",
        content:
          "Microcréditos, leasing PyME y ahorro programado para emprendedores en Honduras.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden px-6 pb-24 pt-12 md:pb-32 md:pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
          <div className="animate-fade-up">
            <span className="mb-6 block font-mono text-[10px] uppercase tracking-widest text-primary">
              Microfinanzas Modernas
            </span>
            <h1 className="mb-8 font-display text-5xl font-extrabold leading-[0.9] tracking-tighter text-balance md:text-7xl">
              Finanzas con rostro humano.
            </h1>
            <p className="mb-10 max-w-[42ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
              Apoyamos el crecimiento de tu negocio con soluciones financieras transparentes y
              personalizadas en Honduras.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/solicitud-prestamo"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Solicitar Crédito
              </Link>
              <Link
                to="/servicios"
                className="inline-flex items-center justify-center rounded-full border border-border px-8 py-4 text-sm font-medium transition-colors hover:bg-foreground/5"
              >
                Ver Planes
              </Link>
            </div>

          </div>

          <div className="relative animate-fade-up-delayed">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-200 outline outline-1 -outline-offset-1 outline-black/5">
              <img
                src={`${import.meta.env.BASE_URL}hero-financial-advisor.webp`}
                alt="Emprendedora hondureña recibiendo asesoría financiera"
                width={1200}
                height={1400}
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-white p-6 shadow-2xl lg:block">
              <div className="flex items-center gap-4">
                <div className="grid size-10 place-items-center rounded-full bg-primary/10">
                  <div className="size-4 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-tighter text-muted-foreground">
                    Interés Anual
                  </p>
                  <p className="font-display text-xl font-bold">Desde 12%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
