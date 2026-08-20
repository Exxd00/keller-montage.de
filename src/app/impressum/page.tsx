import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { businessInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und rechtliche Informationen von Möbelmontage Nürnberg",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="pb-16" style={{ paddingTop: 'calc(6rem + env(safe-area-inset-top, 0px))' }}>
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Impressum</h1>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">
                  Angaben gemäß § 5 DDG
                </h2>
                <p className="text-foreground">
                  {businessInfo.name}
                  <br />
                  Inh. {businessInfo.owner}
                  <br />
                  {businessInfo.address.street}
                  <br />
                  {businessInfo.address.zip} {businessInfo.address.city}
                  <br />
                  {businessInfo.address.country}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Kontakt</h2>
                <p className="text-foreground">
                  Telefon: {businessInfo.phone}
                  <br />
                  E-Mail: {businessInfo.email}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  Steuernummer
                </h2>
                <p className="text-foreground">
                  Steuernummer: {businessInfo.taxNumber}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Berufsbezeichnung</h2>
                <p className="text-foreground">
                  Berufsbezeichnung: Möbelmonteur
                  <br />
                  Zuständige Kammer: Handwerkskammer Mittelfranken
                  <br />
                  Verliehen in: Deutschland
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  Verbraucherstreitbeilegung/
                  Universalschlichtungsstelle
                </h2>
                <p className="text-foreground">
                  Wir sind nicht bereit oder verpflichtet, an
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Haftung für Inhalte</h2>
                <p className="text-foreground">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
                  Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                  verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                  gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                  hinweisen.
                </p>
                <p className="text-foreground mt-4">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                  Informationen nach den allgemeinen Gesetzen bleiben hiervon
                  unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                  Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                  möglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werden wir diese Inhalte umgehend
                  entfernen.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Haftung für Links</h2>
                <p className="text-foreground">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf
                  deren Inhalte wir keinen Einfluss haben. Deshalb können wir
                  für diese fremden Inhalte auch keine Gewähr übernehmen. Für
                  die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Urheberrecht</h2>
                <p className="text-foreground">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                  diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                  der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
