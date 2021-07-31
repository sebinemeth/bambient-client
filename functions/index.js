const functions = require('firebase-functions');
const axios = require('axios');
const express = require('express');

const app = express();
const main = express();

main.use('/api', app);

app.get('/timestamp', (request, response) => {
    response.send(`${Date.now}`);
});

app.get('/weather', async (request, response) => {
    console.error("hello")
    try {
        const response = await axios.get("https://api.openweathermap.org/data/2.5/onecall");
        response.send(response);
    } catch (error) {
        response.send(error);
    }
});

exports.api = functions.https.onRequest(main);