import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock3, Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — MFin504" },
      { name: "description", content: "Contacta a MFin504 para recibir orientación financiera." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 max-w-2xl">
            <span className="mb-4 block font-mono text-[10px] uppercase tracking-widest text-primary">
              Estamos para ayudarte
            </span>
            <h1 className="mb-6 font-display text-4xl font-extrabold tracking-tighter">Hablemos</h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Recibe orientación clara para elegir una solución financiera adecuada para ti o tu negocio.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <ContactCard icon={MapPin} label="Oficina principal">
              Edificio CrediCentral, Nivel 4<br />Tegucigalpa, Honduras
            </ContactCard>
            <ContactCard icon={Phone} label="Teléfono">
              <a href="tel:+50422359000" className="hover:text-primary">+504 2235-9000</a>
            </ContactCard>
            <ContactCard icon={Mail} label="Correo">
              <a href="mailto:hola@mfin504.com" className="hover:text-primary">hola@mfin504.com</a>
            </ContactCard>
            <ContactCard icon={Clock3} label="Horario">
              Lunes a viernes<br />8:00 a. m. – 5:00 p. m.
            </ContactCard>
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-8 rounded-3xl bg-foreground p-8 text-white md:flex-row md:items-center md:p-12">
            <div>
              <p className="mb-2 font-display text-2xl font-bold">¿Listo para solicitar?</p>
              <p className="max-w-xl text-sm leading-relaxed text-white/65">
                Completa la solicitud en línea y recibe tu comprobante por correo electrónico.
              </p>
            </div>
            <Link to="/solicitud-prestamo" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold transition-transform hover:-translate-y-0.5">
              Solicitar préstamo <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactCard({ icon: Icon, label, children }: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-lg">
      <div className="mb-6 grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">{label}</p>
      <div className="text-sm font-medium leading-relaxed">{children}</div>
    </article>
  );
}
