const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS middleware
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const TELEGRAM_BOT_TOKEN = '7129053667:AAFdqtJzPZGLboxkD1e-O2D20jEoLSFONAw';
const CHAT_ID = '-1002081862480';

app.post('/sendToTelegram', (req, res) => {
    const { name, phoneNumber } = req.body;
    const message = `Prijava:\nIme: ${name}\nBroj telefona: ${phoneNumber}`;

    axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message
    })
    .then(response => {
        console.log('Сообщение успешно отправлено в Telegram:', response.data);
        res.status(200).send('Данные успешно отправлены в Telegram.');
    })
    .catch(error => {
        console.error('Ошибка отправки сообщения в Telegram:', error);
        res.status(500).send('Произошла ошибка при отправке данных в Telegram.');
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Внутренняя ошибка сервера');
});
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
