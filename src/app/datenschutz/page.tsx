import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { businessInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Möbelmontage Nürnberg",
  robots: {
    index: true,
    follow: true,
  },
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main className="pb-16" style={{ paddingTop: 'calc(6rem + env(safe-area-inset-top, 0px))' }}>
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              Datenschutzerklärung
            </h1>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">
                  1. Datenschutz auf einen Blick
                </h2>
                <h3 className="text-lg font-semibold mt-4 mb-2">
                  Allgemeine Hinweise
                </h3>
                <p className="text-foreground">
                  Die folgenden Hinweise geben einen einfachen Überblick
                  darüber, was mit Ihren personenbezogenen Daten passiert, wenn
                  Sie diese Website besuchen. Personenbezogene Daten sind alle
                  Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  2. Datenerfassung auf dieser Website
                </h2>
                <h3 className="text-lg font-semibold mt-4 mb-2">
                  Wer ist verantwortlich für die Datenerfassung?
                </h3>
                <p className="text-foreground">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den
                  Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum
                  dieser Website entnehmen.
                </p>

                <h3 className="text-lg font-semibold mt-4 mb-2">
                  Wie erfassen wir Ihre Daten?
                </h3>
                <p className="text-foreground">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns
                  diese mitteilen. Hierbei kann es sich z.B. um Daten handeln,
                  die Sie in ein Kontaktformular eingeben.
                </p>
                <p className="text-foreground mt-2">
                  Andere Daten werden automatisch beim Besuch der Website durch
                  unsere IT-Systeme erfasst. Das sind vor allem technische Daten
                  (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des
                  Seitenaufrufs).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  3. Kontaktformular
                </h2>
                <p className="text-foreground">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen,
                  werden Ihre Angaben aus dem Anfrageformular inklusive der von
                  Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
                  Anfrage und für den Fall von Anschlussfragen bei uns
                  gespeichert. Diese Daten geben wir nicht ohne Ihre
                  Einwilligung weiter.
                </p>
                <p className="text-foreground mt-2">
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
                  Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung
                  eines Vertrags zusammenhängt oder zur Durchführung
                  vorvertraglicher Maßnahmen erforderlich ist.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  4. Cookies
                </h2>
                <p className="text-foreground">
                  Diese Website verwendet Cookies. Bei Cookies handelt es sich
                  um Textdateien, die im Internetbrowser bzw. vom
                  Internetbrowser auf dem Computersystem des Nutzers gespeichert
                  werden.
                </p>
                <p className="text-foreground mt-2">
                  Wir verwenden technisch notwendige Cookies, um unsere Website
                  nutzerfreundlicher zu gestalten. Einige Elemente unserer
                  Internetseite erfordern es, dass der aufrufende Browser auch
                  nach einem Seitenwechsel identifiziert werden kann.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  5. Analyse-Tools und Werbung
                </h2>
                <h3 className="text-lg font-semibold mt-4 mb-2">
                  Google Analytics
                </h3>
                <p className="text-foreground">
                  Diese Website nutzt Funktionen des Webanalysedienstes Google
                  Analytics. Anbieter ist die Google Ireland Limited
                  (&ldquo;Google&rdquo;), Gordon House, Barrow Street, Dublin 4,
                  Irland.
                </p>
                <p className="text-foreground mt-2">
                  Google Analytics verwendet sog. &ldquo;Cookies&rdquo;. Die
                  durch den Cookie erzeugten Informationen über Ihre Benutzung
                  dieser Website werden in der Regel an einen Server von Google
                  in den USA übertragen und dort gespeichert.
                </p>
                <p className="text-foreground mt-2">
                  Die Reichweitenmessung wird erst nach Ihrer ausdrücklichen
                  Einwilligung aktiviert. Sie können die Website und das
                  Anfrageformular auch ohne Analyse-Cookies nutzen.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  6. Ihre Rechte
                </h2>
                <p className="text-foreground">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über
                  Herkunft, Empfänger und Zweck Ihrer gespeicherten
                  personenbezogenen Daten zu erhalten. Sie haben außerdem ein
                  Recht, die Berichtigung oder Löschung dieser Daten zu
                  verlangen.
                </p>
                <p className="text-foreground mt-2">
                  Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt
                  haben, können Sie diese Einwilligung jederzeit für die Zukunft
                  widerrufen. Außerdem haben Sie das Recht, unter bestimmten
                  Umständen die Einschränkung der Verarbeitung Ihrer
                  personenbezogenen Daten zu verlangen.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  7. Kontakt
                </h2>
                <p className="text-foreground">
                  Bei Fragen zum Datenschutz können Sie uns jederzeit
                  kontaktieren:
                </p>
                <p className="text-foreground mt-2">
                  {businessInfo.name}
                  <br />
                  E-Mail: {businessInfo.email}
                  <br />
                  Telefon: {businessInfo.phone}
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
