import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import Gallery from "@/components/sections/Gallery";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Unsere Arbeiten - Galerie",
  description:
    "Sehen Sie Beispiele unserer professionellen Möbelmontage, Küchenmontage und mehr. Qualität die überzeugt!",
  alternates: {
    canonical: "https://keller-montage.de/arbeiten",
  },
};

export default function ArbeitenPage() {
  return (
    <>
      <Header />
      <main className="pb-16" style={{ paddingTop: 'calc(6rem + env(safe-area-inset-top, 0px))' }}>
        <div className="container-max">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Unsere Arbeiten
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Einblicke in unsere Projekte - von der IKEA Küche bis zum
              kompletten Schlafzimmer
            </p>
          </div>

          {/* Gallery */}
          <Gallery showAll />

          {/* CTA */}
          <div className="mt-16 text-center bg-muted/50 rounded-2xl p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Überzeugt von unserer Arbeit?
            </h2>
            <p className="text-muted-foreground mb-6">
              Lassen Sie auch Ihr Projekt professionell umsetzen
            </p>
            <Link
              href="/#kontakt-form"
              className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-xl font-medium"
            >
              Jetzt anfragen
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
