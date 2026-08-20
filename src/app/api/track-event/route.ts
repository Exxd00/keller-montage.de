import { NextRequest, NextResponse } from "next/server";

interface EventData {
  eventType: "phone_call" | "whatsapp" | "form";
  source: string;
  phoneNumber?: string;
  gclid?: string | null;
  trafficSource?: string;
  page?: string;
}

// Send event to Google Sheets - matching the same structure as contact form
async function sendEventToGoogleSheets(eventData: EventData): Promise<boolean> {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log("Google Sheets webhook URL not configured");
    return false;
  }

  try {
    const sourceLabels: Record<string, string> = {
      "floating_button": "Floating Button",
      "hero_section": "Hero Section",
      "header": "Header",
      "footer": "Footer",
      "cta_section": "CTA Section",
      "contact_form": "Kontaktformular",
    };

    // Send same structure as contact form
    const payload = {
      eventType: eventData.eventType,
      name: sourceLabels[eventData.source] || eventData.source,
      email: "-",
      plz: "-",
      service: "-",
      priority: "Normal",
      quelle: eventData.trafficSource || "Direct",
      gclid: eventData.gclid || "-",
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch (error) {
    console.error("Google Sheets error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: EventData = await request.json();

    const validEventTypes = ["phone_call", "whatsapp", "form"];

    if (!body.eventType || !validEventTypes.includes(body.eventType)) {
      return NextResponse.json(
        { error: "Invalid event type" },
        { status: 400 }
      );
    }

    if (!body.source) {
      return NextResponse.json(
        { error: "Source is required" },
        { status: 400 }
      );
    }

    await sendEventToGoogleSheets(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track event error:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}
