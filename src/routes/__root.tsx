import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const GOOGLE_FONTS_LINK =
  "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&display=swap";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscas no existe o fue movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página no cargó
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo salió mal de nuestro lado. Puedes intentar refrescar o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MFin504 — Finanzas claras para tu negocio" },
      {
        name: "description",
        content:
          "MFin504 ofrece microcréditos, leasing PyME y ahorro programado para emprendedores en Honduras.",
      },
      { name: "author", content: "MFin504" },
      { property: "og:title", content: "MFin504 — Finanzas claras para tu negocio" },
      {
        property: "og:description",
        content:
          "Microcréditos, leasing PyME y ahorro programado para emprendedores en Honduras.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@MFin504" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: GOOGLE_FONTS_LINK },
      { rel: "icon", href: `${import.meta.env.BASE_URL}favicon.svg`, type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <SiteFooter />
    </QueryClientProvider>
  );
}

function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <BrandMark className="size-9" />
          <span className="font-display text-xl font-extrabold tracking-tighter uppercase">
            MFin504
          </span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/servicios">Servicios</NavLink>
          <NavLink to="/solicitud-prestamo">Solicitar Préstamo</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          className="flex size-6 flex-col justify-between py-1.5 md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <div className="h-px w-full bg-foreground" />
          <div className="h-px w-full bg-foreground" />
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <NavLink to="/" onClick={() => setMobileOpen(false)}>
              Inicio
            </NavLink>
            <NavLink to="/servicios" onClick={() => setMobileOpen(false)}>
              Servicios
            </NavLink>
            <NavLink to="/solicitud-prestamo" onClick={() => setMobileOpen(false)}>
              Solicitar Préstamo
            </NavLink>
            <NavLink to="/contacto" onClick={() => setMobileOpen(false)}>
              Contacto
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="14" fill="#D33A2C" />
      <path d="M13 32V23h6v9h-6Zm8 0V17h6v15h-6Zm8 0V11h6v21h-6Z" fill="white" />
      <path d="m12 19 8-6 6 3 10-8" fill="none" stroke="#FFD8D1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NavLink({
  to,
  children,
  onClick,
}: {
  to: "/" | "/servicios" | "/solicitud-prestamo" | "/contacto";
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      activeProps={{ className: "text-primary" }}
      className="text-sm font-medium transition-colors hover:text-primary"
    >
      {children}
    </Link>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-2">
          <BrandMark className="size-7" />
          <span className="font-display text-lg font-extrabold tracking-tighter uppercase">
            MFin504
          </span>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          © 2026 MFIN504 FINANCIERA S.A. HONDURAS. TODOS LOS DERECHOS RESERVADOS.
        </p>
        <div className="flex gap-6">
          <Link
            to="/"
            className="text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-primary"
          >
            Privacidad
          </Link>
          <Link
            to="/"
            className="text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-primary"
          >
            Términos
          </Link>
        </div>

      </div>
    </footer>
  );
}
