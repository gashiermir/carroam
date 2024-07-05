1. Spezifikation und Design

Spezifikation

Die Applikation dient als Plattform zur Vermietung von Autos. Vermieter können ihre Fahrzeuge anbieten, während Besucher die Angebote durchsuchen und Autos mieten können. Es gibt zwei Hauptbenutzergruppen: Admins und Vermieter.

Design

Das Design der Applikation basiert auf einem einfachen, benutzerfreundlichen Layout, das durch Bootstrap unterstützt wird. Die wichtigsten Seiten und Funktionen umfassen:

	1.	Startseite: Übersicht der verfügbaren Angebote.
	2.	Angebotsseite: Detaillierte Informationen zu einem Angebot.
	3.	Registrierung und Login: Formulare zur Registrierung und Anmeldung.
	4.	Dashboard: Verwaltung der eigenen Angebote und Buchungen.
	5.	Chat: Kommunikation zwischen Vermietern und Mietern.
	6.	Buchungssystem: Buchungen von Angeboten durch Mieter.

2. Implementierung

Beschreibung der Implementierung der einzelnen Use Cases

Registrierung eines neuen Vermieters

	•	Frontend: Formular zur Eingabe von Name, Adresse, E-Mail und Passwort.
	•	Backend: Validierung der Eingabedaten und Speicherung des neuen Benutzers in der Datenbank.
	•	Besonderheiten: Nutzung von Vue.js für die Eingabevalidierung.

Anlegen eines neuen Angebots

	•	Frontend: Formular zur Eingabe der Fahrzeugdetails (Marke, Modell, PS, Getriebe, Preis, Beschreibung, Standort, Verfügbarkeit).
	•	Backend: Validierung der Eingabedaten und Speicherung des neuen Angebots in der Datenbank.

Buchung eines Angebots

	•	Frontend: Formular zur Eingabe der Buchungsdetails (Preis, Buchungsdatum, Buchung von/bis).
	•	Backend: Validierung der Eingabedaten und Speicherung der Buchung in der Datenbank.

Verwaltung der Buchungen

	•	Frontend: Liste der Buchungen mit Optionen zur Bestätigung oder Ablehnung.
	•	Backend: Aktualisierung des Buchungsstatus in der Datenbank.

Chat zwischen Vermieter und Mieter

	•	Frontend: Chat-Interface zur Eingabe und Anzeige von Nachrichten.
	•	Backend: Speicherung und Abruf von Nachrichten zwischen den Teilnehmern eines Chats.

Vue.js Verwendung

	•	Registrierungsseite: Eingabevalidierung für Felder wie Vorname, Nachname, E-Mail, etc.
	•	Passwort-Komponente: Dynamische Anzeige der Passwortstärke.
	•	Chat-Komponente: Echtzeit-Chat zwischen Vermieter und Mieter.

3. Bereitstellung

URL der Applikation

Die Applikation ist unter folgender URL erreichbar: [URL der Applikation]

Benutzerkonten

	•	Admin-Benutzer:
	•	Benutzername: admin@example.com
	•	Passwort: admin123
	•	Vermieter-Benutzer:
	•	Benutzername: vermieter@example.com
	•	Passwort: vermieter123

4. Optimierung

Optimierungsmaßnahmen

SEO (Suchmaschinenoptimierung)

	•	Titel und Meta-Tags: Jede Seite hat eindeutige Titel und Meta-Beschreibungen.
	•	URL-Struktur: Saubere und lesbare URLs.
	•	Sitemap: Automatisch generierte Sitemap zur Unterstützung der Indexierung durch Suchmaschinen.

Performance Tuning

	•	Lazy Loading: Komponenten und Bilder werden nur bei Bedarf geladen.
	•	Code Splitting: JavaScript-Code wurde in kleinere, leichter ladbare Teile aufgeteilt.
	•	Caching: Caching-Strategien für statische Ressourcen wurden implementiert.
	•	Minifizierung: JavaScript- und CSS-Dateien wurden minifiziert, um die Ladezeiten zu verkürzen.
	•	Datenbank-Indizes: Indizes wurden auf häufig abgerufene Datenbankfelder gesetzt, um die Abfrageleistung zu verbessern.