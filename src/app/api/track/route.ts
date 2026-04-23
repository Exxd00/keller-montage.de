import { NextRequest, NextResponse } from "next/server";

// =====================================================
// TRACK API - For Phone/WhatsApp Click Tracking
// Sends data to Google Sheets
// =====================================================

const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

interface TrackingData {
  event_type: "phone" | "whatsapp";
  contact_type: string;
  source: string;
  gclid: string;
  page_url: string;
  click_source: string;
}

export async function POST(request: NextRequest) {
  console.log("📊 Track API: Received tracking request");

  try {
    const data: TrackingData = await request.json();

    console.log("📊 Track data:", data);

    // Validate required fields
    if (!data.event_type || !data.contact_type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send to Google Sheets if configured
    if (GOOGLE_SHEETS_URL) {
      try {
        const sheetsData = {
          name: "Direktkontakt",
          phone: data.event_type === "phone" ? "Anruf getätigt" : "-",
          email: "-",
          city: "-",
          service: "-",
          message: `${data.contact_type} von ${data.click_source} (${data.page_url})`,
          contact_type: data.contact_type,
          source: data.source || "Direct",
          gclid: data.gclid || "-",
          page_url: data.page_url || "-",
        };

        console.log("📊 Sending to Google Sheets:", sheetsData);

        const response = await fetch(GOOGLE_SHEETS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sheetsData),
        });

        const result = await response.json();
        console.log("📊 Google Sheets response:", result);

        if (result.success) {
          console.log("✅ Track: Successfully saved to Google Sheets");
        } else {
          console.error("❌ Track: Google Sheets returned error:", result);
        }
      } catch (sheetsError) {
        console.error("❌ Track: Google Sheets error:", sheetsError);
        // Don't fail the request if Sheets fails
      }
    } else {
      console.log("⚠️ Track: GOOGLE_SHEETS_URL not configured");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Event tracked successfully",
        event_type: data.event_type,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Track API error:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Track API is running",
    sheets_configured: !!GOOGLE_SHEETS_URL,
  });
}
