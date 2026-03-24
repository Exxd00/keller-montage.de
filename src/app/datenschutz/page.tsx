import { BUSINESS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung von ${BUSINESS.fullName}`,
};

export default function DatenschutzPage() {
  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="container-max">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">Datenschutzerklärung für {BUSINESS.fullName}</h2>
              <p className="text-foreground">
                Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und den Zweck
                der Erhebung und Verwendung personenbezogener Daten auf unserer Webseite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">1. Verantwortliche Stelle</h2>
              <p className="text-foreground">
                Verantwortlich für die Datenverarbeitung auf dieser Webseite ist:
                <br /><br />
                {BUSINESS.companyName}
                <br />
                {BUSINESS.owner}
                <br />
                {BUSINESS.address}
                <br />
                {BUSINESS.postalCode} {BUSINESS.city}
                <br /><br />
                E-Mail: <strong>{BUSINESS.email}</strong>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">2. Datenerfassung beim Besuch unserer Webseite</h2>
              <p className="text-foreground">
                Beim Besuch unserer Webseite werden automatisch Daten erfasst und in Logfiles auf
                unseren Servern gespeichert. Diese Daten können Folgendes umfassen:
              </p>
              <ul className="list-disc list-inside text-foreground mt-4 space-y-2">
                <li>IP-Adresse des zugreifenden Computers</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Name und URL der abgerufenen Datei</li>
                <li>Übertragene Datenmenge</li>
                <li>Browsertyp und -version</li>
                <li>Betriebssystem des Nutzers</li>
                <li>Referrer URL (die zuvor besuchte Seite)</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Internet-Service-Provider des Nutzers</li>
              </ul>
              <p className="text-foreground mt-4">
                Diese Daten werden ausschließlich zu statistischen Zwecken und zur Verbesserung
                unserer Webseite verwendet. Eine Zusammenführung dieser Daten mit anderen
                Datenquellen wird nicht vorgenommen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">3. Cookies</h2>
              <p className="text-foreground">
                Unsere Webseite verwendet Cookies, um die Nutzung der Seite zu erleichtern und
                bestimmte Funktionen zu ermöglichen. Cookies sind kleine Textdateien, die auf Ihrem
                Endgerät gespeichert werden und die eine Analyse der Benutzung der Webseite
                ermöglichen. Sie können das Speichern von Cookies in den Einstellungen Ihres
                Browsers deaktivieren.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">4. Kontaktaufnahme</h2>
              <p className="text-foreground">
                Wenn Sie per E-Mail oder Kontaktformular mit uns in Kontakt treten, werden Ihre
                angegebenen Daten zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen
                gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">5. Rechte des Nutzers</h2>
              <p className="text-foreground">
                Sie haben das Recht, Auskunft über die zu Ihrer Person gespeicherten Daten, deren
                Herkunft und Empfänger sowie den Zweck der Datenverarbeitung zu erhalten. Außerdem
                haben Sie das Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Bitte
                kontaktieren Sie uns hierzu unter den oben genannten Kontaktdaten.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">6. SSL- bzw. TLS-Verschlüsselung</h2>
              <p className="text-foreground">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
                vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns
                als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte
                Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf
                „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">7. Änderungen dieser Datenschutzerklärung</h2>
              <p className="text-foreground">
                Diese Datenschutzerklärung kann sich ändern, zum Beispiel aufgrund gesetzlicher
                Änderungen oder Änderungen unserer Webseite. Die aktuelle Datenschutzerklärung
                finden Sie stets auf unserer Webseite.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
