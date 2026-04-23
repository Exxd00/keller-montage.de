import { NextResponse } from "next/server";

// =====================================================
// DEBUG API - Check Environment Configuration
// DELETE THIS FILE IN PRODUCTION!
// =====================================================

export async function GET() {
  const config = {
    timestamp: new Date().toISOString(),
    environment: {
      RESEND_API_KEY: process.env.RESEND_API_KEY ? "✅ Set" : "❌ Not set",
      CONTACT_EMAIL: process.env.CONTACT_EMAIL || "❌ Not set (using default)",
      GOOGLE_SHEETS_URL: process.env.GOOGLE_SHEETS_URL ? "✅ Set" : "❌ Not set",
      NEXT_PUBLIC_GOOGLE_SHEETS_URL: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL ? "✅ Set" : "❌ Not set",
      IMGBB_API_KEY: process.env.IMGBB_API_KEY ? "✅ Set" : "⚠️ Not set (optional)",
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "⚠️ Not set (optional)",
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "✅ Set" : "⚠️ Not set (optional)",
    },
    issues: [] as string[],
  };

  // Check for issues
  if (!process.env.RESEND_API_KEY) {
    config.issues.push("❌ RESEND_API_KEY not set - Emails will not be sent");
  } else if (process.env.RESEND_API_KEY.startsWith("re_YOUR")) {
    config.issues.push("❌ RESEND_API_KEY is still placeholder - Replace with real API key");
  }

  if (!process.env.GOOGLE_SHEETS_URL) {
    config.issues.push("❌ GOOGLE_SHEETS_URL not set - Form data will not be saved to Sheets");
  } else if (process.env.GOOGLE_SHEETS_URL.includes("YOUR_SCRIPT_ID")) {
    config.issues.push("❌ GOOGLE_SHEETS_URL is still placeholder - Deploy Google Sheets script and update URL");
  }

  if (config.issues.length === 0) {
    config.issues.push("✅ All required environment variables are configured!");
  }

  return NextResponse.json(config, { status: 200 });
}
