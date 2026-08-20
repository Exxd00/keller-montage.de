"use client";

// ContactForm is an alias for QuickContactForm
// This ensures all pages use the same form
import QuickContactForm from "./QuickContactForm";

export default function ContactForm({ compact }: { compact?: boolean }) {
  return <QuickContactForm />;
}
