// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Importa as configurações de e-mail e banco de dados
const email = require('./email');
const dbUrl = require('./DB');

app.get('/', (req, res) => {
    res.send('Conection OK');
});


app.post('/send-email', async (req, res) => {
    const { to, subject, text, html } = req.body;
  
    try {
      await sendMail(to, subject, text, html);
      res.status(200).send('Email enviado com sucesso!');
    } catch (error) {
      res.status(500).send('Erro ao enviar email.');
    }
  });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
