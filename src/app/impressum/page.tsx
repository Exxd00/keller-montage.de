import { BUSINESS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum und rechtliche Informationen von ${BUSINESS.fullName}`,
};

export default function ImpressumPage() {
  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="container-max">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Impressum</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
              <p className="text-foreground">
                <strong>{BUSINESS.companyName}</strong>
                <br />
                {BUSINESS.owner}
                <br />
                {BUSINESS.address}
                <br />
                {BUSINESS.postalCode} {BUSINESS.city}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Kontakt</h2>
              <p className="text-foreground">
                Telefon: {BUSINESS.phoneDisplay}
                <br />
                E-Mail: {BUSINESS.email}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Verantwortlich für den Inhalt</h2>
              <p className="text-foreground">
                {BUSINESS.companyName}
                <br />
                {BUSINESS.address}
                <br />
                {BUSINESS.postalCode} {BUSINESS.city}
                <br /><br />
                Geschäftsführer: {BUSINESS.directors}
                <br /><br />
                Eingetragen im {BUSINESS.handelsregister}.
                <br />
                Sitz: {BUSINESS.city}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Umsatzsteuer-Identifikationsnummer</h2>
              <p className="text-foreground">
                Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
                <br />
                {BUSINESS.ustIdNr}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Haftung für Inhalte</h2>
              <p className="text-foreground">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
                rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="text-foreground mt-4">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
                allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
                jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
                Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte
                umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Haftung für Links</h2>
              <p className="text-foreground">
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir
                keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum
                Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
                Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p className="text-foreground mt-4">
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
                Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
                Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Urheberrecht</h2>
              <p className="text-foreground">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                Gebrauch gestattet.
              </p>
              <p className="text-foreground mt-4">
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
                Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
                gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
                werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
                Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
              <p className="text-foreground mt-4">
                Alle verwendeten Grafiken und Bilder sind, wenn nicht anders angegeben, entweder
                Eigentum von {BUSINESS.companyName} oder auf sie lizenziert. Einer Weiterverwendung
                wird ausdrücklich widersprochen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Online-Streitbeilegung</h2>
              <p className="text-foreground">
                Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO und § 36 VSBG:
                <br /><br />
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.ec.europa.eu/consumers/odr/
                </a>
                <br /><br />
                Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                sind wir nicht verpflichtet und nicht bereit.
              </p>
            </section>

            <section className="text-sm text-muted-foreground">
              <p>Quelle: eRecht24</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
