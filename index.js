// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Importa as configurações de e-mail e banco de dados
const sendMail = require('./email');
const dbUrl = require('./DB');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Conection OK');
});

app.post('/send-email', async (req, res) => {
    const to = req.body.to
    const subject = req.body.subject
    const text = req.body.text
    const html = req.body.html
  
    if (!to || !subject || !text || !html) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    try {
      await sendMail(to, subject, text, html);
      res.status(200).send('Email enviado com sucesso!');
    } catch (error) {
      res.status(500).send('Erro ao enviar email.' + error);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
