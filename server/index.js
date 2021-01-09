const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Api Token
const API_TOKEN = 'DG6CKACK7BIBDSBYZCF3'; // api token for eventbrite apis to work

function fetchEventBriteRequest(url, res, options = {}) {
    fetch(url, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        },
        ...options
    })
        .then((res) => res.json())
        .then((json) => res.json(json))
        .catch((err) => () => {
            res.json({
                message: err.message,
                statusCode: err.statusCode || err.code
            });
        });
}

app.get('/', (req, res) => {
    res.json({ message: 'Connection to the API server is working!' });
});
app.get('/events/:eventId', (req, res) => {
    const { eventId } = req.params;
    fetchEventBriteRequest(`https://www.eventbriteapi.com/v3/events/${eventId}/?expand=ticket_classes`, res);
});
app.get('/events/:eventId/orders', (req, res) => {
    const { eventId } = req.params;
    fetchEventBriteRequest(`https://www.eventbriteapi.com/v3/events/${eventId}/orders`, res);
});
app.listen(3000, () => {
    console.log(`API Server listening at http://localhost:3000`);
});
