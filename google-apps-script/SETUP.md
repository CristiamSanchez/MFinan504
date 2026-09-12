# Configuración de Google Apps Script

## 1. Google Sheets

Crea una hoja llamada `Solicitudes` y agrega en la primera fila:

`ID Solicitud | Fecha | Nombre | Identidad | Teléfono | Email | Tipo de Crédito | Monto Solicitado | Plazo (meses) | Ingreso Mensual | Propósito | Estado`

Copia el ID de la hoja desde su URL.

## 2. Apps Script

1. En la hoja abre **Extensiones → Apps Script**.
2. Reemplaza el contenido de `Code.gs` por el archivo de esta carpeta.
3. En **Configuración del proyecto → Propiedades del script**, agrega:
   - `SPREADSHEET_ID`: ID de Google Sheets.
   - `STAFF_EMAIL`: correo que recibirá las nuevas solicitudes.
4. Selecciona **Implementar → Nueva implementación → Aplicación web**.
5. Ejecutar como: **Yo**.
6. Quién tiene acceso: **Cualquier usuario**.
7. Autoriza los permisos y copia la URL terminada en `/exec`.

Después de modificar `Code.gs`, crea una nueva versión de la implementación.

## 3. GitHub

En **Settings → Secrets and variables → Actions**, crea:

`VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_IMPLEMENTACION/exec`

Ejecuta nuevamente el workflow de GitHub Pages y envía una solicitud de prueba.
