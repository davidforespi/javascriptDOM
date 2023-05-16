const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');

const port = 3000;

// Servir archivos estáticos
app.use(express.json());
app.use(cors());

// Ruta de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});




app.post('/makecall', (req, res) => {

    const {number} = req.body;
    
    const accountSid = "AC6643f3cb9b3c";
    const authToken = "7d20a3ebb1f3b";

    const client = require("twilio")(accountSid, authToken);

    client.calls.create({
        url: "http://demo.twilio.com/docs/voice.xml",
        to: number,
        from: "+19313913657",
    })
        .then(call => console.log(call.sid));
    res.sendStatus(200);
});

app.post('/sendEmail', (req, res) => {
    const { emailContent } = req.body;
  
    // Configurar el transporte de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
	user: '',
        pass: ''        
      }
    });
  
    // Definir el contenido del correo electrónico
    const mailOptions = {
      from: 'godrestaurant13@gmail.com',
      to: emailContent,
      subject: 'Correo de prueba',
      text: 'HOLA prueba desde javascript '
    };
  
    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo electrónico:', error);
        res.sendStatus(500);
      } else {
        console.log('Correo electrónico enviado:', info.response);
        res.sendStatus(200);
      }
    });
  });

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
