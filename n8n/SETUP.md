# Conectar el formulario con n8n + Google Sheets + Email

## 1. Importar el workflow en n8n

1. Abre tu instancia de n8n (n8n.cloud o self-hosted).
2. Menú **Workflows → Import from File** y selecciona `solicitud-prestamo-workflow.json`.
3. Abre el nodo **Registrar en Google Sheets**:
   - Crea/asigna la credencial de Google Sheets OAuth2.
   - Reemplaza `PON_AQUI_EL_ID_DE_TU_GOOGLE_SHEET` con el ID de tu hoja (está en la URL de Google Sheets).
   - Crea una hoja llamada `Solicitudes` con estas columnas en la fila 1:
     `ID Solicitud | Fecha | Nombre | Identidad | Teléfono | Email | Tipo de Crédito | Monto Solicitado | Plazo (meses) | Ingreso Mensual | Propósito | Estado`
4. Abre los nodos **Enviar Comprobante al Cliente** y **Notificar al Personal**:
   - Crea/asigna la credencial de Gmail OAuth2 (o cambia el nodo a SMTP/Outlook si prefieres otro proveedor).
   - Cambia `solicitudes@mfin504.com` por el correo real del personal.
5. Activa el workflow (toggle **Active**).
6. Copia la URL del nodo **Webhook - Nueva Solicitud** (botón "Test URL" para pruebas, y la URL de producción una vez actives el workflow).

## 2. Conectar el sitio web al webhook

En el proyecto del sitio, define la variable de entorno:

```
VITE_N8N_WEBHOOK_URL=https://tu-instancia-n8n.com/webhook/solicitud-prestamo
```

- En desarrollo local: crea un archivo `.env.local` en la raíz del proyecto con esa línea.
- En GitHub Actions: agrégala como **Secret** del repositorio
  (`Settings → Secrets and variables → Actions → New repository secret`,
  nombre `VITE_N8N_WEBHOOK_URL`). El workflow `.github/workflows/deploy-pages.yml`
  ya está configurado para inyectarla en el build.

## 3. CORS

Como el sitio en GitHub Pages llamará al webhook desde el navegador (origen distinto),
asegúrate que el nodo Webhook tenga `Allowed Origins` en `*` (ya viene así en el JSON) o,
para mayor seguridad, cámbialo por el dominio exacto de tu sitio en GitHub Pages, por ejemplo:
`https://tu-usuario.github.io`.

## 4. Publicar el sitio en GitHub Pages

1. Sube este proyecto a un repositorio de GitHub.
2. En **Settings → Pages**, selecciona como fuente **GitHub Actions**.
3. Con cada `push` a `main`, el workflow `deploy-pages.yml` compila el sitio y lo publica.
4. Si el repositorio no es `usuario.github.io` (sitio raíz), sino un repo normal,
   revisa que la app funcione bajo una subruta (`/nombre-repo/`); si ves rutas rotas,
   puede ser necesario configurar el `base` en `vite.config.ts`.
