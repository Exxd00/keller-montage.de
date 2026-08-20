import { NextRequest, NextResponse } from "next/server";

interface FileAttachment {
  filename: string;
  content: string; // base64
}

interface ContactFormData {
  submissionId: string;
  service: string;
  name: string;
  email: string;
  phone: string;
  plz: string;
  message: string;
  fileUrls: string[]; // Image URLs (from imgbb)
  fileAttachments?: FileAttachment[]; // PDF/DOC files as base64
  serviceDetails?: Record<string, string>;
  gclid?: string | null;
  quelle?: string;
  seite?: string;
}

const SERVICE_NAMES: Record<string, string> = {
  lieferungen: "Lieferungen",
  moebelmontage: "Möbelmontage",
  kuechenmontage: "Küchenmontage",
  umzuege: "Umzüge",
  entruempelung: "Entrümpelung",
};

// Get priority from service details
function getPriority(data: ContactFormData): string {
  const urgency = data.serviceDetails?.urgency || data.serviceDetails?.Dringlichkeit || "";
  if (urgency.toLowerCase().includes("dringend") || urgency.toLowerCase().includes("express")) {
    return "DRINGEND";
  }
  if (urgency.toLowerCase().includes("normal")) {
    return "Normal";
  }
  return "Flexibel";
}

// Send to Google Sheets - Only essential columns (no phone).
// Returns true only when a request was actually accepted by the webhook.
async function sendToGoogleSheets(data: ContactFormData): Promise<boolean> {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return false;

  try {
    const priority = getPriority(data);

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submissionId: data.submissionId,
        eventType: "form",
        name: data.name,
        email: data.email || "-",
        plz: data.plz || "-",
        service: SERVICE_NAMES[data.service] || data.service,
        priority: priority,
        quelle: data.quelle || "Direct",
        gclid: data.gclid || "-",
      }),
    });
    return res.ok;
  } catch (e) {
    console.error("Sheets error:", e);
    return false;
  }
}

// Build email HTML - Compact dark theme like keller-montage.de
function buildEmailHtml(data: ContactFormData): string {
  const serviceName = SERVICE_NAMES[data.service] || data.service;
  const priority = getPriority(data);
  const isDringend = priority === "DRINGEND";
  const details = data.serviceDetails || {};

  // Helper for table row - compact style
  const row = (label: string, value: string) =>
    value && value !== "-" && value !== ""
      ? `<tr>
          <td style="padding:3px 0;color:#9ca3af;font-size:13px;width:42%;">${label}:</td>
          <td style="padding:3px 0;color:#fff;font-size:13px;font-weight:500;">${value}</td>
        </tr>`
      : "";

  // Section with colored left border
  const section = (icon: string, title: string, borderColor: string, rows: string) =>
    rows.trim()
      ? `<div style="background:#1a1a2e;border-radius:8px;padding:10px 12px;margin-bottom:8px;border-left:3px solid ${borderColor};">
          <div style="font-weight:600;color:${borderColor};margin-bottom:6px;font-size:12px;">${icon} ${title}</div>
          <table style="width:100%;">${rows}</table>
        </div>`
      : "";

  // Build service-specific details
  let detailsRows = "";
  let detailsTitle = "Details";
  let detailsIcon = "📋";

  if (data.service === "kuechenmontage") {
    detailsTitle = "Küchen-Details";
    detailsIcon = "🍳";
    detailsRows = [
      row("Möbelart", details.furnitureType),
      row("Marke", details.brand),
      row("Form", details.form),
      row("Schränke", details.cabinetCount),
      row("Zustand", details.kitchenCondition),
      row("Arbeitsplatte", details.countertopType),
      row("Alte Küche", details.hasOldKitchen === "Ja" ? `Ja - ${details.oldKitchenAction || ""}` : details.hasOldKitchen),
      row("Wassersystem", details.hasWaterSystem),
      row("Wasseranschluss", details.waterConnection),
      row("Elektroanschluss", details.electricConnection),
      row("Platte zuschneiden", details.cutCountertop),
    ].join("");
  } else if (data.service === "moebelmontage") {
    detailsTitle = "Möbel-Details";
    detailsIcon = "🪑";
    detailsRows = [
      row("Möbelart", details.furnitureType),
      row("Marke", details.brand),
      row("Anzahl", details.itemCount),
      row("Zustand", details.furnitureCondition),
      row("Vor Ort", details.furnitureOnSite),
    ].join("");
  } else if (data.service === "lieferungen") {
    detailsTitle = "Lieferung-Details";
    detailsIcon = "🚚";
    detailsRows = [
      row("Abholadresse", details.pickupAddress),
      row("Abholung Etage", details.pickupFloor),
      row("Lieferadresse", details.deliveryAddress),
      row("Lieferung Etage", details.deliveryFloor),
      row("Beschreibung", details.itemDescription),
      row("Anzahl", details.itemCount),
      row("Größe/Gewicht", details.itemSize),
      row("Helfer", details.needHelpers),
    ].join("");
  } else if (data.service === "umzuege") {
    detailsTitle = "Umzug-Details";
    detailsIcon = "🏠";
    detailsRows = [
      row("Aktuelle Adresse", details.currentAddress),
      row("Aktuelle Etage", details.currentFloor),
      row("Wohnfläche", details.currentSize),
      row("Zimmer", details.currentRooms),
      row("Aufzug (aktuell)", details.hasElevator),
      row("Neue Adresse", details.newAddress),
      row("Neue Etage", details.newFloor),
      row("Aufzug (neu)", details.newHasElevator),
      row("Schwere Gegenstände", details.hasHeavyItems === "Ja" ? `Ja - ${details.heavyItemsDescription || ""}` : details.hasHeavyItems),
      row("Verpackung", details.needPacking),
      row("Zwischenlagerung", details.needStorage),
    ].join("");
  } else if (data.service === "entruempelung") {
    detailsTitle = "Entrümpelung-Details";
    detailsIcon = "🧹";
    detailsRows = [
      row("Adresse", details.address),
      row("Etage", details.floor),
      row("Aufzug", details.hasElevator),
      row("Bereichsart", details.areaType),
      row("Fläche", details.areaSize),
      row("Räume", details.roomCount),
      row("Gegenstandsart", details.itemTypes),
      row("Schwere Gegenstände", details.hasHeavyItems),
      row("Entsorgung", details.needsDisposal),
      row("Sondergegenstände", details.specialItems),
    ].join("");
  }

  // Terminwunsch rows
  const terminRows = [
    row("Dringlichkeit", details.urgency),
    row("Zeitraum", details.timeframe || details.moveDate),
    row("Tageszeit", details.dayTime),
  ].join("");

  // Zugang & Parken rows
  const zugangRows = [
    row("Parkmöglichkeit", details.parking || details.currentParking || details.pickupParking),
    row("Zugang", details.access),
    row("Abholung nötig", details.needPickup === "Ja" ? `Ja - ${details.pickupAddress || ""}` : details.needPickup),
  ].join("");

  // Files/Attachments section - with debug logging
  console.log("Email builder - fileUrls received:", JSON.stringify(data.fileUrls));
  let filesHtml = "";
  const validUrls = (data.fileUrls || []).filter(url => url && url.trim() !== "");
  console.log("Email builder - valid URLs count:", validUrls.length);

  if (validUrls.length > 0) {
    const fileItems = validUrls.map((url, i) => {
      const isImage = /\.(jpg|jpeg|png|webp|gif)/i.test(url);
      console.log(`File ${i+1}: ${url} - isImage: ${isImage}`);
      if (isImage) {
        return `<div style="margin:6px 0;">
          <a href="${url}" target="_blank" style="display:block;">
            <img src="${url}" alt="Bild ${i+1}" style="max-width:100%;max-height:150px;border-radius:6px;border:1px solid #333;"/>
          </a>
        </div>`;
      }
      return `<div style="margin:4px 0;">
        <a href="${url}" target="_blank" style="color:#60a5fa;font-size:12px;text-decoration:none;">📎 Datei ${i+1} herunterladen</a>
      </div>`;
    }).join("");

    filesHtml = `<div style="background:#1a1a2e;border-radius:8px;padding:10px 12px;margin-bottom:8px;border-left:3px solid #3b82f6;">
      <div style="font-weight:600;color:#60a5fa;margin-bottom:6px;font-size:12px;">📎 Anhänge (${validUrls.length})</div>
      ${fileItems}
    </div>`;
  }

  // Message section
  const messageHtml = data.message
    ? `<div style="background:#1a1a2e;border-radius:8px;padding:10px 12px;margin-bottom:8px;border-left:3px solid #6b7280;">
        <div style="font-weight:600;color:#9ca3af;margin-bottom:6px;font-size:12px;">💬 Nachricht</div>
        <div style="color:#d1d5db;font-size:12px;white-space:pre-wrap;line-height:1.4;">${data.message}</div>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<div style="max-width:380px;margin:0 auto;background:#0f0f1a;">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#ef4444,#dc2626);padding:14px;text-align:center;">
    <div style="font-size:16px;font-weight:700;color:#fff;">📬 Neue Anfrage</div>
    <div style="color:rgba(255,255,255,0.8);font-size:10px;margin-top:2px;">keller-montage.de</div>
  </div>

  <!-- Content -->
  <div style="padding:10px;">

    <!-- Service Badges -->
    <div style="text-align:center;margin-bottom:10px;">
      <span style="display:inline-block;background:#166534;color:#4ade80;padding:5px 12px;border-radius:12px;font-weight:600;font-size:12px;margin:2px;">${serviceName}</span>
      ${isDringend ? `<span style="display:inline-block;background:#854d0e;color:#fbbf24;padding:5px 12px;border-radius:12px;font-weight:600;font-size:12px;margin:2px;">⚡ DRINGEND</span>` : ""}
    </div>

    <!-- Kontaktdaten -->
    <div style="background:#1a1a2e;border-radius:8px;padding:10px 12px;margin-bottom:8px;border-left:3px solid #f472b6;">
      <div style="font-weight:600;color:#f472b6;margin-bottom:6px;font-size:12px;">👤 Kontaktdaten</div>
      <table style="width:100%;">
        ${row("Name", data.name)}
        <tr>
          <td style="padding:3px 0;color:#9ca3af;font-size:13px;width:42%;">Telefon:</td>
          <td style="padding:3px 0;font-size:13px;">
            <a href="tel:${data.phone}" style="color:#f472b6;text-decoration:none;font-weight:600;">📱 ${data.phone}</a>
          </td>
        </tr>
        ${data.email ? `<tr>
          <td style="padding:3px 0;color:#9ca3af;font-size:13px;">E-Mail:</td>
          <td style="padding:3px 0;font-size:13px;">
            <a href="mailto:${data.email}" style="color:#f472b6;text-decoration:none;">${data.email}</a>
          </td>
        </tr>` : ""}
        ${data.plz ? row("Stadt", "📍 " + data.plz) : ""}
      </table>
    </div>

    <!-- Quick Buttons -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
      <tr>
        <td width="48%" style="padding-right:4px;">
          <a href="tel:${data.phone}" style="display:block;background:transparent;border:2px solid #f472b6;color:#f472b6;padding:8px;border-radius:6px;text-align:center;text-decoration:none;font-weight:600;font-size:12px;">
            📞 Jetzt anrufen
          </a>
        </td>
        <td width="48%" style="padding-left:4px;">
          <a href="https://wa.me/${data.phone.replace(/\D/g, "")}" style="display:block;background:#22c55e;color:#fff;padding:8px;border-radius:6px;text-align:center;text-decoration:none;font-weight:600;font-size:12px;">
            💬 WhatsApp
          </a>
        </td>
      </tr>
    </table>

    <!-- Terminwunsch -->
    ${section("📅", "Terminwunsch", "#22c55e", terminRows)}

    <!-- Service Details -->
    ${section(detailsIcon, detailsTitle, "#22c55e", detailsRows)}

    <!-- Zugang & Parken -->
    ${section("🅿️", "Zugang & Parken", "#a855f7", zugangRows)}

    <!-- Files -->
    ${filesHtml}

    <!-- Message -->
    ${messageHtml}

  </div>

  <!-- Footer -->
  <div style="padding:8px;text-align:center;color:#6b7280;font-size:10px;border-top:1px solid #1a1a2e;">
    ${new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}
  </div>

</div>
</body>
</html>`;
}

// Remove non-ASCII characters for email fields
function toAscii(str: string): string {
  return str
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/Ä/g, 'Ae')
    .replace(/Ö/g, 'Oe')
    .replace(/Ü/g, 'Ue')
    .replace(/[^\x00-\x7F]/g, '');
}

// Parse and sanitize the from email field
function getSafeFromEmail(): string {
  const fromEnv = process.env.RESEND_FROM_EMAIL || "";

  // Check if format is "Name <email>"
  const match = fromEnv.match(/<([^>]+)>/);
  if (match) {
    // Extract just the email
    const email = match[1];
    // Convert the name part to ASCII
    const namePart = fromEnv.replace(/<[^>]+>/, '').trim();
    const safeName = toAscii(namePart) || "Moebelmontage Nuernberg";
    return `${safeName} <${email}>`;
  }

  // If it's just an email, use default name
  if (fromEnv.includes('@')) {
    return `Moebelmontage Nuernberg <${fromEnv}>`;
  }

  // Fallback
  return "Moebelmontage Nuernberg <onboarding@resend.dev>";
}

// Try to extract a human-readable message from a Resend error response
function parseResendError(status: number, errorText: string): string {
  let message = errorText;
  try {
    const parsed = JSON.parse(errorText);
    message = parsed.message || parsed.error || errorText;
  } catch {
    // errorText is not JSON, use it as-is
  }

  const lower = message.toLowerCase();

  if (status === 401 || lower.includes("api key") || lower.includes("unauthorized")) {
    return "E-Mail-Versand fehlgeschlagen: Der Resend API-Schlüssel (RESEND_API_KEY) ist ungültig.";
  }
  if (status === 403 || lower.includes("domain is not verified") || lower.includes("not verified")) {
    return "E-Mail-Versand fehlgeschlagen: Die Absender-Domain ist bei Resend nicht verifiziert. Bitte Domain verifizieren oder RESEND_FROM_EMAIL auf onboarding@resend.dev setzen.";
  }
  if (lower.includes("from") && (lower.includes("invalid") || lower.includes("not allowed"))) {
    return `E-Mail-Versand fehlgeschlagen: Die Absender-Adresse (RESEND_FROM_EMAIL) ist ungültig. (${message})`;
  }
  if (status === 422) {
    return `E-Mail-Versand fehlgeschlagen: Ungültige Angaben. (${message})`;
  }
  if (status === 429) {
    return "E-Mail-Versand fehlgeschlagen: Zu viele Anfragen (Rate-Limit von Resend erreicht). Bitte kurz warten.";
  }

  return `E-Mail-Versand fehlgeschlagen (Resend ${status}): ${message}`;
}

// Send email - returns whether the email was ACTUALLY sent, plus a detailed reason on failure
async function sendEmail(data: ContactFormData): Promise<{ emailSent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.RECIPIENT_EMAIL;

  // Report exactly which piece of configuration is missing
  if (!apiKey && !recipientEmail) {
    return {
      emailSent: false,
      error: "E-Mail-Versand ist nicht konfiguriert: RESEND_API_KEY und RECIPIENT_EMAIL fehlen.",
    };
  }
  if (!apiKey) {
    return {
      emailSent: false,
      error: "E-Mail-Versand ist nicht konfiguriert: RESEND_API_KEY fehlt.",
    };
  }
  if (!recipientEmail) {
    return {
      emailSent: false,
      error: "E-Mail-Versand ist nicht konfiguriert: RECIPIENT_EMAIL (Empfänger) fehlt.",
    };
  }

  const serviceName = SERVICE_NAMES[data.service] || data.service;
  const priority = getPriority(data);

  // Get sanitized from email
  const safeFrom = getSafeFromEmail();

  // Convert to ASCII for email headers
  const safeServiceName = toAscii(serviceName);
  const safeName = toAscii(data.name);

  try {
    // Prepare email payload
    const emailPayload: Record<string, unknown> = {
      from: safeFrom,
      to: [recipientEmail],
      subject: `${priority === "DRINGEND" ? "[DRINGEND] " : ""}${safeServiceName} - ${safeName}`,
      html: buildEmailHtml(data),
      reply_to: data.email || undefined,
    };

    // Add file attachments if present (PDFs, DOCs, etc.)
    if (data.fileAttachments && data.fileAttachments.length > 0) {
      console.log(`Adding ${data.fileAttachments.length} file attachments to email`);
      emailPayload.attachments = data.fileAttachments.map(att => ({
        filename: att.filename,
        content: att.content, // base64 content
      }));
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Email error:", res.status, errorText);
      return { emailSent: false, error: parseResendError(res.status, errorText) };
    }

    console.log("Email sent successfully");
    return { emailSent: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("Email error:", message);
    return { emailSent: false, error: `Netzwerkfehler beim E-Mail-Versand: ${message}` };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.submissionId || !body.service || !body.name || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Pflichtfelder fehlen (Dienstleistung, Name und Telefon sind erforderlich)." },
        { status: 400 },
      );
    }

    // Log received data for debugging
    console.log("Received contact form:", {
      service: body.service,
      name: body.name,
      fileUrls: body.fileUrls,
      fileUrlsCount: body.fileUrls?.length || 0,
      fileAttachmentsCount: body.fileAttachments?.length || 0,
    });

    const data: ContactFormData = {
      submissionId: body.submissionId,
      service: body.service,
      name: body.name,
      email: body.email || "",
      phone: body.phone,
      plz: body.plz || "",
      message: body.message || "",
      fileUrls: body.fileUrls || [],
      fileAttachments: body.fileAttachments || [],
      serviceDetails: body.serviceDetails || {},
      gclid: body.gclid,
      quelle: body.quelle,
      seite: body.seite,
    };

    // Secondary notification (best effort): Google Sheets. Never blocks the result.
    let sheetsSuccess = false;
    try {
      sheetsSuccess = await sendToGoogleSheets(data);
      if (sheetsSuccess) console.log("Google Sheets notification sent successfully");
    } catch (sheetsError) {
      console.error("Google Sheets error:", sheetsError);
    }

    // Primary notification: the e-mail to the business. This MUST succeed.
    const emailResult = await sendEmail(data);

    // If the e-mail did not actually go out, tell the client exactly why so it
    // can be shown on the site. Do NOT pretend the submission succeeded.
    if (!emailResult.emailSent) {
      console.error("Contact form NOT delivered - email failed:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          error:
            emailResult.error ||
            "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
          notificationsSent: { sheets: sheetsSuccess, email: false },
        },
        { status: 502 },
      );
    }

    console.log("Contact form delivered successfully via email");
    return NextResponse.json({
      success: true,
      submissionId: data.submissionId,
      imagesReceived: data.fileUrls.length,
      attachmentsReceived: data.fileAttachments?.length || 0,
      notificationsSent: {
        sheets: sheetsSuccess,
        email: emailResult.emailSent,
      },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("API error:", message);
    return NextResponse.json(
      { success: false, error: `Serverfehler: ${message}` },
      { status: 500 },
    );
  }
}
