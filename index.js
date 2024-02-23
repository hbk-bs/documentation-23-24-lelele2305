document.addEventListener("DOMContentLoaded", function () {
	console.log("Hello World");
});

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware zur Verarbeitung von JSON- und URL-codierten Formulardaten
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routen-Handler für die Verarbeitung des Formulars
app.post('/send-email', (req, res) => {
    const { name, emailadresse, Bewertung } = req.body;

    // Konfiguration des E-Mail-Transporteurs
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'l.manthey@hbk-bs.de', // Hier Ihre Gmail-E-Mail-Adresse eintragen
            pass: 'kg*yn.U7-6Xk' // Hier Ihr Gmail-Passwort eintragen
        }
    });

    // E-Mail-Optionen
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: 'l.manthey@hbk-bs.de', // Hier die Ziel-E-Mail-Adresse eintragen
        subject: 'Neue Formulardaten',
        text: `Name: ${name}\nE-Mail-Adresse: ${emailadresse}\nBewertung: ${Bewertung}`
    };

    // Senden der E-Mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Beim Senden der E-Mail ist ein Fehler aufgetreten.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Vielen Dank! Ihre Daten wurden erfolgreich versendet.');
        }
    });
});

// Starten des Servers
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

