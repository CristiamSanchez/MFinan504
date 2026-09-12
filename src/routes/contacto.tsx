import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — MFin504" },
      {
        name: "description",
        content:
          "Contacta a MFin504. Nuestro equipo está listo para asesorarte en tu próximo paso financiero.",
      },
      { property: "og:title", content: "Contacto — MFin504" },
      {
        property: "og:description",
        content:
          "Contacta a MFin504. Nuestro equipo está listo para asesorarte en tu próximo paso financiero.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main>
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-20 md:grid-cols-2">
          <div>
            <h2 className="mb-6 font-display text-4xl font-extrabold tracking-tighter">
              Hablemos
            </h2>
            <p className="mb-12 text-muted-foreground">
              Nuestro equipo está listo para asesorarte en tu próximo paso financiero. Visítanos o
              escríbenos.
            </p>

            <div className="space-y-8">
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                  Oficina Principal
                </p>
                <p className="font-medium">
                  Edificio CrediCentral, Nivel 4
                  <br />
                  Tegucigalpa, Honduras
                </p>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                  Teléfono
                </p>
                <p className="text-xl font-medium">+504 2235-9000</p>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                  Email
                </p>
                <p className="font-medium">hola@mfin504.com</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-8 md:p-12">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-xs font-bold uppercase tracking-wider"
                  >
                    Nombre
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full rounded-xl border border-border bg-background p-4 text-sm transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider">
                    Apellido
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Tu apellido"
                    className="w-full rounded-xl border border-border bg-background p-4 text-sm transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="ejemplo@mail.com"
                  className="w-full rounded-xl border border-border bg-background p-4 text-sm transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-xs font-bold uppercase tracking-wider">
                  Servicio de Interés
                </label>
                <select
                  id="service"
                  className="w-full appearance-none rounded-xl border border-border bg-background p-4 text-sm transition-colors focus:border-primary focus:outline-none"
                >
                  <option>Microcrédito Personal</option>
                  <option>Crédito PyME</option>
                  <option>Ahorro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Cuéntanos sobre tu proyecto"
                  className="w-full resize-none rounded-xl border border-border bg-background p-4 text-sm transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-foreground py-5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary"
              >
                Enviar Solicitud
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
