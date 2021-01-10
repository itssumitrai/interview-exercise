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
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'Connection to the API server is working!' });
});
app.get('/events/:eventId', (req, res) => {
    const { eventId } = req.params;
    fetchEventBriteRequest(
        `https://www.eventbriteapi.com/v3/events/${eventId}/?expand=ticket_classes`,
        res
    );
});
app.get('/events/:eventId/orders', (req, res) => {
    const { eventId } = req.params;
    fetchEventBriteRequest(`https://www.eventbriteapi.com/v3/events/${eventId}/orders`, res);
});
app.post('/events/:eventId/orders', (req, res) => {
    // TODO: add some validation here ??
    const { eventId } = req.params;
    const { body } = req;
    const { firstName, lastName, email, ticketClasses, ticketQuantities, paymentFee } = body;
    let basePrice = 0,
        fees = 0,
        taxes = 0;
    let baseCurrency, feesCurrency, taxCurrency;
    ticketQuantities.forEach((quantity, index) => {
        if (!quantity || quantity < 1) {
            return;
        }
        const ticket = ticketClasses[index];
        const { cost, fee = { value: 0 }, tax = { value: 0 } } = ticket;
        baseCurrency = cost.currency;
        feesCurrency = fee.currency;
        taxCurrency = tax.currency;
        basePrice += (cost.value / 100) * quantity;
        fees += (fee.value / 100) * quantity;
        taxes += (tax.value / 100) * quantity;
    });

    res.json({
        event_id: eventId,
        created: new Date().toUTCString(),
        first_name: firstName,
        last_name: lastName,
        name: firstName + ' ' + lastName,
        email,
        base_price: {
            currency: baseCurrency,
            value: basePrice
        },
        eventbrite_fee: {
            currency: feesCurrency,
            value: fees
        },
        gross: {
            currency: baseCurrency,
            value: basePrice + taxes + fees
        },
        tax: {
            currency: taxCurrency,
            value: taxes
        },
        payment_fee: {
            currency: baseCurrency,
            value: paymentFee || 0
        },
        status: 'placed'
    });
});
app.listen(3000, () => {
    console.log(`API Server listening at http://localhost:3000`);
});
