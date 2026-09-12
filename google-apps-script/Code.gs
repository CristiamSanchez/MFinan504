const SHEET_NAME = "Solicitudes";
const TIME_ZONE = "America/Tegucigalpa";

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    // Honeypot: los usuarios reales nunca completan este campo.
    if (String(data.empresaWeb || "").trim()) {
      return jsonResponse({ ok: true });
    }

    validate(data);

    const properties = PropertiesService.getScriptProperties();
    const spreadsheetId = properties.getProperty("SPREADSHEET_ID");
    const staffEmail = properties.getProperty("STAFF_EMAIL");

    if (!spreadsheetId || !staffEmail) {
      throw new Error("Faltan SPREADSHEET_ID o STAFF_EMAIL en las propiedades del script");
    }

    const requestId = Utilities.getUuid();
    const now = new Date();
    const formattedDate = Utilities.formatDate(now, TIME_ZONE, "dd/MM/yyyy HH:mm:ss");
    const status = "Pendiente de revisión";

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(SHEET_NAME);
      if (!sheet) throw new Error(`No existe la hoja ${SHEET_NAME}`);

      sheet.appendRow([
        requestId,
        formattedDate,
        clean(data.nombreCompleto, 120),
        clean(data.identidad, 30),
        clean(data.telefono, 30),
        clean(data.email, 160),
        clean(data.tipoCredito, 80),
        Number(data.montoSolicitado),
        Number(data.plazoMeses),
        Number(data.ingresoMensual),
        clean(data.proposito, 1000),
        status,
      ]);
    } finally {
      lock.releaseLock();
    }

    sendEmails(data, requestId, formattedDate, staffEmail);
    return jsonResponse({ ok: true, solicitudId: requestId });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: String(error.message || error) });
  }
}

function validate(data) {
  const required = [
    "nombreCompleto", "identidad", "telefono", "email", "tipoCredito",
    "montoSolicitado", "plazoMeses", "ingresoMensual",
  ];
  required.forEach((field) => {
    if (data[field] === undefined || String(data[field]).trim() === "") {
      throw new Error(`El campo ${field} es obligatorio`);
    }
  });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
    throw new Error("El correo electrónico no es válido");
  }
  if (Number(data.montoSolicitado) <= 0) throw new Error("El monto debe ser mayor que cero");
  if (!Number.isInteger(Number(data.plazoMeses)) || Number(data.plazoMeses) <= 0) {
    throw new Error("El plazo no es válido");
  }
  if (Number(data.ingresoMensual) < 0) throw new Error("El ingreso no es válido");
}

function sendEmails(data, requestId, formattedDate, staffEmail) {
  const name = clean(data.nombreCompleto, 120);
  const creditType = clean(data.tipoCredito, 80);
  const amount = Number(data.montoSolicitado).toLocaleString("es-HN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  MailApp.sendEmail({
    to: clean(data.email, 160),
    subject: "Hemos recibido tu solicitud de préstamo — MFin504",
    htmlBody: `<h2>Gracias por tu solicitud, ${escapeHtml(name)}</h2>
      <p>Recibimos tu solicitud de <strong>${escapeHtml(creditType)}</strong>
      por <strong>L. ${amount}</strong>.</p>
      <p><strong>N.º de solicitud:</strong> ${requestId}<br>
      <strong>Fecha:</strong> ${formattedDate}</p>
      <p>Un asesor se pondrá en contacto contigo pronto.</p>`,
  });

  MailApp.sendEmail({
    to: staffEmail,
    subject: `Nueva solicitud de préstamo — ${name}`,
    htmlBody: `<h2>Nueva solicitud recibida</h2>
      <p><strong>ID:</strong> ${requestId}</p>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}<br>
      <strong>Identidad:</strong> ${escapeHtml(clean(data.identidad, 30))}<br>
      <strong>Teléfono:</strong> ${escapeHtml(clean(data.telefono, 30))}<br>
      <strong>Email:</strong> ${escapeHtml(clean(data.email, 160))}<br>
      <strong>Tipo:</strong> ${escapeHtml(creditType)}<br>
      <strong>Monto:</strong> L. ${amount}<br>
      <strong>Plazo:</strong> ${Number(data.plazoMeses)} meses<br>
      <strong>Ingreso:</strong> L. ${Number(data.ingresoMensual).toLocaleString("es-HN")}<br>
      <strong>Propósito:</strong> ${escapeHtml(clean(data.proposito || "", 1000))}</p>`,
  });
}

function clean(value, maxLength) {
  return String(value == null ? "" : value).trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
