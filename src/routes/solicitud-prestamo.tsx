import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/solicitud-prestamo")({
  head: () => ({
    meta: [
      { title: "Solicitud de Préstamo — MFin504" },
      {
        name: "description",
        content:
          "Solicita el desembolso de tu préstamo con MFin504. Completa el formulario y recibe un comprobante por correo.",
      },
      { property: "og:title", content: "Solicitud de Préstamo — MFin504" },
      {
        property: "og:description",
        content: "Solicita el desembolso de tu préstamo con MFin504 en minutos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoanRequestPage,
});

// URL pública de la aplicación web de Google Apps Script.
const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined;

type LoanFormState = {
  nombreCompleto: string;
  identidad: string;
  telefono: string;
  email: string;
  tipoCredito: string;
  montoSolicitado: string;
  plazoMeses: string;
  ingresoMensual: string;
  proposito: string;
  // Honeypot anti-spam: campo invisible para humanos, si llega lleno lo descartamos.
  empresaWeb: string;
};

const initialState: LoanFormState = {
  nombreCompleto: "",
  identidad: "",
  telefono: "",
  email: "",
  tipoCredito: "Microcrédito Personal",
  montoSolicitado: "",
  plazoMeses: "",
  ingresoMensual: "",
  proposito: "",
  empresaWeb: "",
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

function LoanRequestPage() {
  const [form, setForm] = useState<LoanFormState>(initialState);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  function updateField<K extends keyof LoanFormState>(field: K, value: LoanFormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    // Anti-spam: si el honeypot viene lleno, fingimos éxito y no enviamos nada.
    if (form.empresaWeb.trim() !== "") {
      setStatus("success");
      return;
    }

    if (!APPS_SCRIPT_URL) {
      setStatus("error");
      setErrorMessage(
        "El formulario no está conectado todavía. Define VITE_APPS_SCRIPT_URL antes de publicar el sitio.",
      );
      return;
    }

    setStatus("loading");

    const payload = {
      nombreCompleto: form.nombreCompleto,
      identidad: form.identidad,
      telefono: form.telefono,
      email: form.email,
      tipoCredito: form.tipoCredito,
      montoSolicitado: Number(form.montoSolicitado) || form.montoSolicitado,
      plazoMeses: Number(form.plazoMeses) || form.plazoMeses,
      ingresoMensual: Number(form.ingresoMensual) || form.ingresoMensual,
      proposito: form.proposito,
      fechaSolicitud: new Date().toISOString(),
      origen: "sitio-web-mfin504",
    };

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        // text/plain evita una solicitud CORS preflight que Apps Script no puede responder.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error(`El servidor respondió con estado ${response.status}`);
      }

      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!result.ok) {
        throw new Error(result.error || "La solicitud no pudo registrarse");
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        "No pudimos enviar tu solicitud. Verifica tu conexión e intenta de nuevo en unos minutos.",
      );
    }
  }

  if (status === "success") {
    return (
      <main>
        <section className="px-6 py-24">
          <div className="mx-auto max-w-xl rounded-3xl border border-border bg-white p-12 text-center">
            <h1 className="mb-4 font-display text-3xl font-extrabold tracking-tighter">
              ¡Solicitud recibida!
            </h1>
            <p className="text-muted-foreground">
              Hemos registrado tu solicitud de préstamo. En breve recibirás un comprobante por
              correo electrónico y nuestro equipo se pondrá en contacto contigo.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 rounded-xl bg-foreground px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary"
            >
              Enviar otra solicitud
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 font-display text-4xl font-extrabold tracking-tighter">
            Solicitud de Préstamo
          </h1>
          <p className="mb-12 text-muted-foreground">
            Completa tus datos para solicitar el desembolso de tu préstamo. Un asesor revisará tu
            solicitud y te contactará pronto.
          </p>

          <div className="rounded-3xl border border-border bg-white p-8 md:p-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Honeypot: oculto para personas, visible para bots */}
              <input
                type="text"
                name="empresaWeb"
                value={form.empresaWeb}
                onChange={(e) => updateField("empresaWeb", e.target.value)}
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="nombreCompleto"
                    className="text-xs font-bold uppercase tracking-wider"
                  >
                    Nombre completo
                  </label>
                  <input
                    id="nombreCompleto"
                    type="text"
                    required
                    placeholder="Tu nombre completo"
                    value={form.nombreCompleto}
                    onChange={(e) => updateField("nombreCompleto", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-4 text-sm transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="identidad" className="text-xs font-bold uppercase tracking-wider">
                    N.º de identidad
                  </label>
                  <input
                    id="identidad"
                    type="text"
                    required
                    placeholder="0801-1990-01234"
                    value={form.identidad}
                    onChange={(e) => updateField("identidad", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-4 text-sm transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="telefono" className="text-xs font-bold uppercase tracking-wider">
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    required
                    placeholder="+504 9999-9999"
                    value={form.telefono}
                    onChange={(e) => updateField("telefono", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-4 text-sm transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="ejemplo@mail.com"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-4 text-sm transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="tipoCredito" className="text-xs font-bold uppercase tracking-wider">
                  Tipo de crédito
                </label>
                <select
                  id="tipoCredito"
                  value={form.tipoCredito}
                  onChange={(e) => updateField("tipoCredito", e.target.value)}
                  className="w-full appearance-none rounded-xl border border-border bg-background p-4 text-sm transition-colors focus:border-primary focus:outline-none"
                >
                  <option>Microcrédito Personal</option>
                  <option>Crédito PyME</option>
                  <option>Leasing PyME</option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label
                    htmlFor="montoSolicitado"
                    className="text-xs font-bold uppercase tracking-wider"
                  >
                    Monto solicitado (L.)
                  </label>
                  <input
                    id="montoSolicitado"
                    type="number"
                    min={0}
                    required
                    placeholder="15000"
                    value={form.montoSolicitado}
                    onChange={(e) => updateField("montoSolicitado", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-4 text-sm transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="plazoMeses" className="text-xs font-bold uppercase tracking-wider">
                    Plazo (meses)
                  </label>
                  <input
                    id="plazoMeses"
                    type="number"
                    min={1}
                    required
                    placeholder="12"
                    value={form.plazoMeses}
                    onChange={(e) => updateField("plazoMeses", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-4 text-sm transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="ingresoMensual"
                    className="text-xs font-bold uppercase tracking-wider"
                  >
                    Ingreso mensual (L.)
                  </label>
                  <input
                    id="ingresoMensual"
                    type="number"
                    min={0}
                    required
                    placeholder="12000"
                    value={form.ingresoMensual}
                    onChange={(e) => updateField("ingresoMensual", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-4 text-sm transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="proposito" className="text-xs font-bold uppercase tracking-wider">
                  Propósito del préstamo
                </label>
                <textarea
                  id="proposito"
                  rows={4}
                  placeholder="Cuéntanos para qué usarás el préstamo"
                  value={form.proposito}
                  onChange={(e) => updateField("proposito", e.target.value)}
                  className="w-full resize-none rounded-xl border border-border bg-background p-4 text-sm transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                />
              </div>

              {status === "error" && (
                <p className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-foreground py-5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Enviando..." : "Enviar Solicitud"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
