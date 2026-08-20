import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt - Kostenlose Anfrage",
  description:
    "Kontaktieren Sie Möbelmontage Nürnberg für ein kostenloses Angebot. Telefon, WhatsApp oder Kontaktformular - wir sind für Sie da!",
  alternates: {
    canonical: "https://keller-montage.de/kontakt",
  },
};

export default function KontaktPage() {
  redirect("/#kontakt-form");
}
