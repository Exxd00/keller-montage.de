import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "info@keller-montage.de";
const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

// Supabase configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "form-uploads";

// Create Supabase client with service role for server-side uploads
function getSupabaseAdmin() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("❌ Supabase credentials not configured");
    return null;
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Send data to Google Sheets (text only, no images)
async function sendToGoogleSheets(data: ContactFormData): Promise<boolean> {
  if (!GOOGLE_SHEETS_URL) {
    console.log("GOOGLE_SHEETS_URL not set, skipping Google Sheets");
    return false;
  }
  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Google Sheets response:", result);
    return result.success === true;
  } catch (error) {
    console.error("Error sending to Google Sheets:", error);
    return false;
  }
}

interface ContactFormData {
  service: string;
  urgency: string;
  timeframe: string;
  timeOfDay: string;
  brand: string;
  kitchenShape: string;
  cabinetCount: string;
  appliances: string;
  hasOldKitchen: string;
  oldKitchenAction: string;
  hasWaterSystem: string;
  hasMuldenluefter: string;
  kitchenAtCustomer: string;
  needsPickup: string;
  pickupLocationName: string;
  countertopType: string;
  kitchenCondition: string;
  needsWater: string;
  needsElectric: string;
  needsCountertop: string;
  furnitureType: string;
  furnitureBrand: string;
  itemCount: string;
  pickupLocation: string;
  floor: string;
  hasElevator: string;
  itemSize: string;
  parking: string;
  accessDifficulty: string;
  message: string;
  anrede: string;
  name: string;
  phone: string;
  email: string;
  city: string;
}

interface UploadedFile {
  url: string;
  thumb: string;
  fileName: string;
  fileType: "image" | "document";
}

// Upload timeout in milliseconds (15 seconds per file)
const UPLOAD_TIMEOUT = 15000;

// Helper function to create a timeout promise
function createTimeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Upload timeout after ${ms}ms`)), ms);
  });
}

// Check if file is an image
function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

// Upload image to ImgBB
async function uploadToImgBB(file: File): Promise<UploadedFile | null> {
  if (!IMGBB_API_KEY) {
    console.error("❌ IMGBB_API_KEY is not set in environment variables!");
    return null;
  }

  try {
    console.log(`🔄 Starting ImgBB upload for: ${file.name} (${file.size} bytes)`);

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    // Use URLSearchParams for reliable encoding with ImgBB API
    const params = new URLSearchParams();
    params.append("key", IMGBB_API_KEY);
    params.append("image", base64);
    params.append("name", file.name.replace(/\.[^/.]+$/, "")); // Remove extension

    const uploadPromise = fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const response = await Promise.race([
      uploadPromise,
      createTimeout(UPLOAD_TIMEOUT),
    ]);

    const result = await response.json();

    if (result.success) {
      console.log(`✅ ImgBB upload success: ${result.data.url}`);
      return {
        url: result.data.url,
        thumb: result.data.thumb?.url || result.data.url,
        fileName: file.name,
        fileType: "image",
      };
    } else {
      console.error("❌ ImgBB upload failed:", JSON.stringify(result, null, 2));
      return null;
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("timeout")) {
      console.error(`⏱️ ImgBB upload timeout for ${file.name}`);
    } else {
      console.error("❌ Error uploading to ImgBB:", error);
    }
    return null;
  }
}

// Upload document (PDF, etc.) to Supabase Storage
async function uploadToSupabase(file: File): Promise<UploadedFile | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error("❌ Supabase client not available");
    return null;
  }

  try {
    console.log(`🔄 Starting Supabase upload for: ${file.name} (${file.size} bytes)`);

    // Generate unique filename with timestamp and random string
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split(".").pop() || "pdf";
    const sanitizedName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "_")
      .substring(0, 50);
    const uniqueFileName = `${timestamp}_${randomStr}_${sanitizedName}.${extension}`;
    const filePath = `documents/${uniqueFileName}`;

    // Convert File to ArrayBuffer for upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload with timeout
    const uploadPromise = supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    const { data, error } = await Promise.race([
      uploadPromise,
      createTimeout(UPLOAD_TIMEOUT),
    ]) as Awaited<typeof uploadPromise>;

    if (error) {
      console.error(`❌ Supabase upload error for ${file.name}:`, error.message);
      return null;
    }

    if (!data?.path) {
      console.error(`❌ No path returned for ${file.name}`);
      return null;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(data.path);

    const publicUrl = publicUrlData.publicUrl;
    console.log(`✅ Supabase upload success: ${publicUrl}`);

    return {
      url: publicUrl,
      thumb: publicUrl,
      fileName: file.name,
      fileType: "document",
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes("timeout")) {
      console.error(`⏱️ Upload timeout for ${file.name}`);
    } else {
      console.error(`❌ Error uploading ${file.name} to Supabase:`, error);
    }
    return null;
  }
}

// Map service values to readable names
const serviceNames: Record<string, string> = {
  kuechenmontage: "Küchenmontage",
  moebelmontage: "Möbelmontage",
  lieferung: "Lieferung / Transport",
  "lieferung-montage": "Lieferung + Montage",
  sonstiges: "Sonstiges",
};

const urgencyNames: Record<string, string> = {
  express: "Dringend (Express)",
  normal: "Normal",
  flexibel: "Flexibel",
};

const timeframeNames: Record<string, string> = {
  "diese-woche": "Diese Woche",
  "naechste-woche": "Nächste Woche",
  "2-wochen": "In 2 Wochen",
  monat: "Innerhalb eines Monats",
  spaeter: "Später / Flexibel",
};

const anredeNames: Record<string, string> = {
  herr: "Herr",
  frau: "Frau",
  divers: "Divers",
  keine: "",
};

function formatFormData(data: ContactFormData, uploadedFiles: UploadedFile[]): string {
  const sections: string[] = [];
  const images = uploadedFiles.filter(f => f.fileType === "image");
  const documents = uploadedFiles.filter(f => f.fileType === "document");

  // Header
  sections.push(`
╔══════════════════════════════════════════════════════════════╗
║           NEUE ANFRAGE VON KELLER-MONTAGE.DE                  ║
╚══════════════════════════════════════════════════════════════╝
`);

  // Personal Info
  const anredeText = anredeNames[data.anrede] || "";
  sections.push(`
┌─────────────────────────────────────────────────────────────┐
│ KONTAKTDATEN                                                  │
└─────────────────────────────────────────────────────────────┘
  Name:      ${anredeText} ${data.name}
  Telefon:   ${data.phone}
  E-Mail:    ${data.email || "Nicht angegeben"}
  Stadt:     ${data.city}
`);

  // Service Info
  sections.push(`
┌─────────────────────────────────────────────────────────────┐
│ DIENSTLEISTUNG                                               │
└─────────────────────────────────────────────────────────────┘
  Art:        ${serviceNames[data.service] || data.service}
  Dringend:   ${urgencyNames[data.urgency] || data.urgency || "Nicht angegeben"}
  Zeitraum:   ${timeframeNames[data.timeframe] || data.timeframe || "Nicht angegeben"}
  Tageszeit:  ${data.timeOfDay || "Nicht angegeben"}
`);

  // Kitchen specific details
  if (data.service === "kuechenmontage") {
    sections.push(`
┌─────────────────────────────────────────────────────────────┐
│ KÜCHEN-DETAILS                                                │
└─────────────────────────────────────────────────────────────┘
  Marke:           ${data.brand || "Nicht angegeben"}
  Küchenform:      ${data.kitchenShape || "Nicht angegeben"}
  Anzahl Schränke: ${data.cabinetCount || "Nicht angegeben"}
  Geräte:          ${data.appliances || "Keine angegeben"}

  Alte Küche:      ${data.hasOldKitchen === "ja" ? "Ja" : data.hasOldKitchen === "nein" ? "Nein" : "Nicht angegeben"}
  ${data.hasOldKitchen === "ja" ? `  → Aktion:        ${data.oldKitchenAction || "Nicht angegeben"}` : ""}

  Wassersystem:    ${data.hasWaterSystem || "Nicht angegeben"}
  Muldenlüfter:    ${data.hasMuldenluefter || "Nicht angegeben"}

  Küche vor Ort:   ${data.kitchenAtCustomer === "ja" ? "Ja" : data.kitchenAtCustomer === "nein" ? "Nein" : "Nicht angegeben"}
  ${data.needsPickup ? `  Abholung nötig: ${data.needsPickup === "ja" ? "Ja" : "Nein"}` : ""}
  ${data.pickupLocationName ? `  Abholort:       ${data.pickupLocationName}` : ""}

  Arbeitsplatte:   ${data.countertopType || "Nicht angegeben"}
  Küchenzustand:   ${data.kitchenCondition || "Nicht angegeben"}

  Wasseranschluss: ${data.needsWater === "ja" ? "Ja" : data.needsWater === "nein" ? "Nein" : "Nicht angegeben"}
  Elektroanschluss: ${data.needsElectric === "ja" ? "Ja" : data.needsElectric === "nein" ? "Nein" : "Nicht angegeben"}
  Platte zuschneiden: ${data.needsCountertop === "ja" ? "Ja" : data.needsCountertop === "nein" ? "Nein" : "Nicht angegeben"}
`);
  }

  // Furniture specific
  if (data.service === "moebelmontage" || data.service === "lieferung-montage") {
    sections.push(`
┌─────────────────────────────────────────────────────────────┐
│ MÖBEL-DETAILS                                                 │
└─────────────────────────────────────────────────────────────┘
  Möbelart:   ${data.furnitureType || "Nicht angegeben"}
  Marke:      ${data.furnitureBrand || "Nicht angegeben"}
  Anzahl:     ${data.itemCount || "Nicht angegeben"}
`);
  }

  // Delivery specific
  if (data.service === "lieferung" || data.service === "lieferung-montage") {
    sections.push(`
┌─────────────────────────────────────────────────────────────┐
│ LIEFER-DETAILS                                                │
└─────────────────────────────────────────────────────────────┘
  Abholort:   ${data.pickupLocation || "Nicht angegeben"}
  Größe:      ${data.itemSize || "Nicht angegeben"}
  Stockwerk:  ${data.floor || "Nicht angegeben"}
  Aufzug:     ${data.hasElevator || "Nicht angegeben"}
`);
  }

  // Access & Logistics
  if (data.parking || data.accessDifficulty) {
    sections.push(`
┌─────────────────────────────────────────────────────────────┐
│ ZUGANG & PARKEN                                               │
└─────────────────────────────────────────────────────────────┘
  Parkmöglichkeit: ${data.parking || "Nicht angegeben"}
  Zugang:          ${data.accessDifficulty || "Nicht angegeben"}
`);
  }

  // Message
  sections.push(`
┌─────────────────────────────────────────────────────────────┐
│ NACHRICHT                                                     │
└─────────────────────────────────────────────────────────────┘

${data.message || "Keine zusätzliche Nachricht"}
`);

  // Images
  if (images.length > 0) {
    sections.push(`
┌─────────────────────────────────────────────────────────────┐
│ BILDER (${images.length})                                              │
└─────────────────────────────────────────────────────────────┘
${images.map((img, i) => `  ${i + 1}. ${img.fileName}: ${img.url}`).join("\n")}
`);
  }

  // Documents
  if (documents.length > 0) {
    sections.push(`
┌─────────────────────────────────────────────────────────────┐
│ DOKUMENTE (${documents.length})                                           │
└─────────────────────────────────────────────────────────────┘
${documents.map((doc, i) => `  ${i + 1}. ${doc.fileName}: ${doc.url}`).join("\n")}
`);
  }

  // Footer
  sections.push(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Diese Anfrage wurde über keller-montage.de gesendet.
Bitte antworten Sie zeitnah auf diese Anfrage.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

  return sections.join("\n");
}

function createHtmlEmail(data: ContactFormData, uploadedFiles: UploadedFile[]): string {
  const anredeText = anredeNames[data.anrede] || "";
  const images = uploadedFiles.filter(f => f.fileType === "image");
  const documents = uploadedFiles.filter(f => f.fileType === "document");

  // Create images in grid layout (2-3 per row)
  const createImageGrid = (imgs: UploadedFile[]) => {
    const rows: string[] = [];
    for (let i = 0; i < imgs.length; i += 3) {
      const rowImages = imgs.slice(i, i + 3);
      const cellWidth = Math.floor(100 / rowImages.length);
      rows.push(`
        <tr>
          ${rowImages.map(img => `
            <td width="${cellWidth}%" style="padding: 6px; vertical-align: top;">
              <div style="background: #fff; border-radius: 8px; overflow: hidden; text-align: center;">
                <a href="${img.url}" target="_blank">
                  <img src="${img.url}" alt="${img.fileName}" style="width: 100%; height: 120px; object-fit: cover; display: block;" />
                </a>
                <p style="margin: 6px 0; font-size: 10px; color: #666; padding: 0 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${img.fileName}</p>
              </div>
            </td>
          `).join("")}
          ${rowImages.length < 3 ? `<td colspan="${3 - rowImages.length}"></td>` : ""}
        </tr>
      `);
    }
    return rows.join("");
  };

  const imagesHtml = images.length > 0 ? `
    <!-- Images Section - Grid Layout -->
    <tr>
      <td style="padding: 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #E63946 0%, #c62828 100%); border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="padding: 16px;">
              <h2 style="color: #ffffff; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">
                📷 Bilder (${images.length})
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${createImageGrid(images)}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  ` : "";

  // Create documents HTML - compact inline layout
  const documentsHtml = documents.length > 0 ? `
    <!-- Documents Section - Compact -->
    <tr>
      <td style="padding: 0 16px 16px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #1565C0; border-radius: 10px; overflow: hidden;">
          <tr>
            <td style="padding: 14px;">
              <h3 style="color: #fff; margin: 0 0 10px 0; font-size: 14px;">📄 Dokumente (${documents.length})</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  ${documents.map(doc => `
                    <td style="padding: 4px;">
                      <a href="${doc.url}" target="_blank" style="display: block; background: #fff; border-radius: 6px; padding: 10px; text-decoration: none; text-align: center;">
                        <span style="font-size: 24px; display: block;">📄</span>
                        <span style="font-size: 11px; color: #333; display: block; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${doc.fileName}</span>
                        <span style="font-size: 10px; color: #1565C0; display: block; margin-top: 4px;">⬇ Download</span>
                      </a>
                    </td>
                  `).join("")}
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  ` : "";

  // Kitchen details section
  const kitchenHtml = data.service === "kuechenmontage" ? `
    <tr>
      <td style="padding: 0 16px 16px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FFF8E1; border-radius: 12px; border-left: 4px solid #FF9800;">
          <tr>
            <td style="padding: 20px;">
              <h2 style="color: #E65100; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">🍳 Küchen-Details</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                <tr><td style="padding: 6px 0; color: #666;">Marke:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.brand || "—"}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Küchenform:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.kitchenShape || "—"}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Anzahl Schränke:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.cabinetCount || "—"}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Geräte:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.appliances || "—"}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Alte Küche:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.hasOldKitchen === "ja" ? `✅ Ja (${data.oldKitchenAction || "—"})` : "❌ Nein"}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Arbeitsplatte:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.countertopType || "—"}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Wasseranschluss:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.needsWater === "ja" ? "✅ Ja" : data.needsWater === "nein" ? "❌ Nein" : "—"}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Elektroanschluss:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.needsElectric === "ja" ? "✅ Ja" : data.needsElectric === "nein" ? "❌ Nein" : "—"}</td></tr>
                ${data.needsPickup === "ja" ? `<tr><td style="padding: 6px 0; color: #666;">Abholung von:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.pickupLocationName || "—"}</td></tr>` : ""}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  ` : "";

  // Furniture details section
  const furnitureHtml = (data.service === "moebelmontage" || data.service === "lieferung-montage") ? `
    <tr>
      <td style="padding: 0 16px 16px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #E8F5E9; border-radius: 12px; border-left: 4px solid #4CAF50;">
          <tr>
            <td style="padding: 20px;">
              <h2 style="color: #2E7D32; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">🛋️ Möbel-Details</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                <tr><td style="padding: 6px 0; color: #666;">Möbelart:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.furnitureType || "—"}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Marke:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.furnitureBrand || "—"}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Anzahl:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.itemCount || "—"}</td></tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  ` : "";

  // Delivery details section
  const deliveryHtml = (data.service === "lieferung" || data.service === "lieferung-montage") ? `
    <tr>
      <td style="padding: 0 16px 16px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #E3F2FD; border-radius: 12px; border-left: 4px solid #2196F3;">
          <tr>
            <td style="padding: 20px;">
              <h2 style="color: #1565C0; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">🚚 Liefer-Details</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                <tr><td style="padding: 6px 0; color: #666;">Abholort:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.pickupLocation || "—"}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Größe:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.itemSize || "—"}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Stockwerk:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.floor || "—"}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Aufzug:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.hasElevator || "—"}</td></tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  ` : "";

  // Access details section
  const accessHtml = (data.parking || data.accessDifficulty) ? `
    <tr>
      <td style="padding: 0 16px 16px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F3E5F5; border-radius: 12px; border-left: 4px solid #9C27B0;">
          <tr>
            <td style="padding: 20px;">
              <h2 style="color: #7B1FA2; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">🅿️ Zugang & Parken</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                ${data.parking ? `<tr><td style="padding: 6px 0; color: #666;">Parkmöglichkeit:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.parking}</td></tr>` : ""}
                ${data.accessDifficulty ? `<tr><td style="padding: 6px 0; color: #666;">Zugang:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.accessDifficulty}</td></tr>` : ""}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  ` : "";

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Neue Anfrage - KELLER Montage</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f2f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f0f2f5;">
    <tr>
      <td style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #E63946 0%, #c62828 100%); padding: 32px 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">📬 Neue Anfrage</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">keller-montage.de</p>
            </td>
          </tr>

          <!-- Service Badge -->
          <tr>
            <td style="padding: 24px 16px 16px 16px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                <tr>
                  <td style="background-color: #E63946; color: white; padding: 10px 24px; border-radius: 50px; font-weight: 600; font-size: 14px;">
                    ${serviceNames[data.service] || data.service}
                  </td>
                  ${data.urgency === "express" ? `
                  <td style="padding-left: 8px;">
                    <span style="display: inline-block; background-color: #FF6D00; color: white; padding: 10px 20px; border-radius: 50px; font-weight: 600; font-size: 14px;">
                      ⚡ DRINGEND
                    </span>
                  </td>
                  ` : ""}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Info Card -->
          <tr>
            <td style="padding: 0 16px 16px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 12px; border-left: 4px solid #E63946;">
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="color: #1F2430; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">👤 Kontaktdaten</h2>
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                      <tr>
                        <td style="padding: 8px 0; color: #666; width: 100px;">Name:</td>
                        <td style="padding: 8px 0; color: #1F2430; font-weight: 600; font-size: 16px;">${anredeText} ${data.name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666;">Telefon:</td>
                        <td style="padding: 8px 0;">
                          <a href="tel:${data.phone}" style="color: #E63946; text-decoration: none; font-weight: 600; font-size: 16px;">📱 ${data.phone}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666;">E-Mail:</td>
                        <td style="padding: 8px 0;">
                          ${data.email ? `<a href="mailto:${data.email}" style="color: #E63946; text-decoration: none; font-weight: 500;">${data.email}</a>` : '<span style="color: #999;">—</span>'}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666;">Stadt:</td>
                        <td style="padding: 8px 0; color: #1F2430; font-weight: 500;">📍 ${data.city}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Buttons -->
          <tr>
            <td style="padding: 0 16px 16px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 8px; text-align: center;" width="50%">
                    <a href="tel:${data.phone}" style="display: block; background-color: #E63946; color: white; padding: 14px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">📞 Jetzt anrufen</a>
                  </td>
                  <td style="padding: 8px; text-align: center;" width="50%">
                    <a href="https://wa.me/491602255443?text=Hallo%2C%20ich%20rufe%20wegen%20der%20Anfrage%20von%20${encodeURIComponent(data.name)}%20an." style="display: block; background-color: #25D366; color: white; padding: 14px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">💬 WhatsApp</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Timing Section -->
          <tr>
            <td style="padding: 0 16px 16px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #E8F5E9; border-radius: 12px; border-left: 4px solid #4CAF50;">
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="color: #2E7D32; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">📅 Terminwunsch</h2>
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                      <tr><td style="padding: 6px 0; color: #666;">Dringlichkeit:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${urgencyNames[data.urgency] || data.urgency || "—"}</td></tr>
                      <tr><td style="padding: 6px 0; color: #666;">Zeitraum:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${timeframeNames[data.timeframe] || data.timeframe || "—"}</td></tr>
                      <tr><td style="padding: 6px 0; color: #666;">Tageszeit:</td><td style="padding: 6px 0; color: #333; font-weight: 500;">${data.timeOfDay || "—"}</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${kitchenHtml}
          ${furnitureHtml}
          ${deliveryHtml}
          ${accessHtml}

          <!-- Message Section -->
          <tr>
            <td style="padding: 0 16px 16px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ECEFF1; border-radius: 12px;">
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="color: #37474F; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">💬 Nachricht</h2>
                    <p style="margin: 0; color: #455A64; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message || "Keine zusätzliche Nachricht"}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${imagesHtml}
          ${documentsHtml}

          <!-- Footer -->
          <tr>
            <td style="background-color: #1F2430; padding: 24px; text-align: center;">
              <p style="color: rgba(255,255,255,0.7); margin: 0 0 8px 0; font-size: 12px;">
                Diese Anfrage wurde über keller-montage.de gesendet.
              </p>
              <p style="color: rgba(255,255,255,0.5); margin: 0; font-size: 11px;">
                ${new Date().toLocaleString("de-DE", { dateStyle: "full", timeStyle: "short" })}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

export async function POST(request: NextRequest) {
  console.log("📨 Contact form submission received");

  try {
    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY is not set in environment variables!");
      return NextResponse.json(
        { error: "E-Mail-System nicht konfiguriert. Bitte kontaktieren Sie uns unter +49 160 2255443" },
        { status: 500 }
      );
    }

    const formData = await request.formData();

    // Extract form data
    const data: ContactFormData = {
      service: formData.get("service") as string || "",
      urgency: formData.get("urgency") as string || "",
      timeframe: formData.get("timeframe") as string || "",
      timeOfDay: formData.get("timeOfDay") as string || "",
      brand: formData.get("brand") as string || "",
      kitchenShape: formData.get("kitchenShape") as string || "",
      cabinetCount: formData.get("cabinetCount") as string || "",
      appliances: formData.get("appliances") as string || "",
      hasOldKitchen: formData.get("hasOldKitchen") as string || "",
      oldKitchenAction: formData.get("oldKitchenAction") as string || "",
      hasWaterSystem: formData.get("hasWaterSystem") as string || "",
      hasMuldenluefter: formData.get("hasMuldenluefter") as string || "",
      kitchenAtCustomer: formData.get("kitchenAtCustomer") as string || "",
      needsPickup: formData.get("needsPickup") as string || "",
      pickupLocationName: formData.get("pickupLocationName") as string || "",
      countertopType: formData.get("countertopType") as string || "",
      kitchenCondition: formData.get("kitchenCondition") as string || "",
      needsWater: formData.get("needsWater") as string || "",
      needsElectric: formData.get("needsElectric") as string || "",
      needsCountertop: formData.get("needsCountertop") as string || "",
      furnitureType: formData.get("furnitureType") as string || "",
      furnitureBrand: formData.get("furnitureBrand") as string || "",
      itemCount: formData.get("itemCount") as string || "",
      pickupLocation: formData.get("pickupLocation") as string || "",
      floor: formData.get("floor") as string || "",
      hasElevator: formData.get("hasElevator") as string || "",
      itemSize: formData.get("itemSize") as string || "",
      parking: formData.get("parking") as string || "",
      accessDifficulty: formData.get("accessDifficulty") as string || "",
      message: formData.get("message") as string || "",
      anrede: formData.get("anrede") as string || "",
      name: formData.get("name") as string || "",
      phone: formData.get("phone") as string || "",
      email: formData.get("email") as string || "",
      city: formData.get("city") as string || "",
    };

    // Validate required fields
    if (!data.name || !data.phone || !data.city || !data.service || !data.email) {
      return NextResponse.json(
        { error: "Bitte füllen Sie alle Pflichtfelder aus." },
        { status: 400 }
      );
    }

    // Send to Google Sheets (text data only, no files) - don't wait for it
    sendToGoogleSheets(data).then(success => {
      console.log("Google Sheets saved:", success);
    }).catch(err => {
      console.error("Google Sheets error:", err);
    });

    // Collect all files to upload - separate images from documents
    const imageFiles: File[] = [];
    const documentFiles: File[] = [];

    console.log("=== FORM DATA ENTRIES ===");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.size > 0) {
        console.log(`File found: ${key} = ${value.name} (${value.size} bytes, type: ${value.type})`);

        if (key.startsWith("image_") || key.startsWith("plan_")) {
          if (isImageFile(value)) {
            // Images go to ImgBB
            imageFiles.push(value);
          } else {
            // PDFs and other documents go to Supabase
            documentFiles.push(value);
          }
        }
      }
    }
    console.log(`Total images: ${imageFiles.length}, Total documents: ${documentFiles.length}`);
    console.log("=========================");

    // Upload files in parallel
    const uploadedFiles: UploadedFile[] = [];
    let uploadErrors = 0;

    // Upload images to ImgBB
    if (imageFiles.length > 0) {
      console.log(`📤 Starting parallel ImgBB upload of ${imageFiles.length} images...`);
      const imageResults = await Promise.allSettled(
        imageFiles.map(file => uploadToImgBB(file))
      );

      for (const result of imageResults) {
        if (result.status === "fulfilled" && result.value) {
          uploadedFiles.push(result.value);
        } else {
          uploadErrors++;
          if (result.status === "rejected") {
            console.error("ImgBB upload rejected:", result.reason);
          }
        }
      }
    }

    // Upload documents to Supabase
    if (documentFiles.length > 0) {
      console.log(`📤 Starting parallel Supabase upload of ${documentFiles.length} documents...`);
      const docResults = await Promise.allSettled(
        documentFiles.map(file => uploadToSupabase(file))
      );

      for (const result of docResults) {
        if (result.status === "fulfilled" && result.value) {
          uploadedFiles.push(result.value);
        } else {
          uploadErrors++;
          if (result.status === "rejected") {
            console.error("Supabase upload rejected:", result.reason);
          }
        }
      }
    }

    console.log(`📊 Upload results: ${uploadedFiles.length} successful, ${uploadErrors} failed`);

    // Create email subject
    const serviceName = serviceNames[data.service] || data.service;
    const urgencyPrefix = data.urgency === "express" ? "🔴 DRINGEND: " : "";
    const images = uploadedFiles.filter(f => f.fileType === "image");
    const documents = uploadedFiles.filter(f => f.fileType === "document");
    const fileCount = images.length > 0 || documents.length > 0
      ? ` [${images.length > 0 ? `${images.length} Bilder` : ""}${images.length > 0 && documents.length > 0 ? ", " : ""}${documents.length > 0 ? `${documents.length} Dok.` : ""}]`
      : "";
    const failedNote = uploadErrors > 0 ? ` (${uploadErrors} fehlgeschlagen)` : "";
    const subject = `${urgencyPrefix}Neue Anfrage: ${serviceName} - ${data.name} (${data.city})${fileCount}${failedNote}`;

    // Send email using Resend
    console.log("📧 Sending email via Resend...");
    const { data: emailData, error } = await resend.emails.send({
      from: "KELLER Montage <info@keller-montage.de>",
      to: [CONTACT_EMAIL],
      replyTo: data.email || undefined,
      subject: subject,
      text: formatFormData(data, uploadedFiles),
      html: createHtmlEmail(data, uploadedFiles),
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error, null, 2));

      let errorMessage = "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es erneut.";

      if (error.message?.includes("API key")) {
        errorMessage = "API-Schlüssel ungültig. Bitte kontaktieren Sie uns telefonisch.";
      } else if (error.message?.includes("domain") || error.message?.includes("verified")) {
        errorMessage = "E-Mail-Domain nicht verifiziert. Bitte kontaktieren Sie uns unter +49 160 2255443";
      } else if (error.message?.includes("rate limit")) {
        errorMessage = "Zu viele Anfragen. Bitte warten Sie einen Moment.";
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    console.log("✅ Email sent successfully:", emailData);

    return NextResponse.json(
      {
        success: true,
        message: "Anfrage erfolgreich gesendet!",
        uploadedImages: images.length,
        uploadedDocuments: documents.length,
        uploadErrors: uploadErrors
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." },
      { status: 500 }
    );
  }
}
