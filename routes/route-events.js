const { getEvents, showEvent, addOrder, getTicketFromOrders } = require('../models/database-functions');
const { generateTicketNumber } = require('../models/generate-ticket-number');
const { Router } = require('express');
const router = new Router();

router.get('/getallevents', async (req, res) => {
    const events = await getEvents();
    res.send(JSON.stringify(events));
});

router.post('/order', async (req, res) => {
    const body = req.body;

    let ticket = await showEvent(body);

    let resObj = {
        id: ticket.id,
        name: ticket.namn,
        where: ticket.var,
        date: ticket.datum,
        from: ticket.from,
        to: ticket.till,
        price: ticket.pris
    }    
    res.send(JSON.stringify(resObj));
});

router.post('/addorder', async (req, res) => {
    const body = req.body;
    const ticketNumber = generateTicketNumber();
    const addTicketOrder = await addOrder(body.order, ticketNumber);
    res.send(JSON.stringify(addTicketOrder));
});

router.get('/getorderticket/:id', async (req, res) => {
    const ticketNumber = req.params.id;    

    let getOrderTicket = await getTicketFromOrders(ticketNumber);

    let resObj = {
        ticket: getOrderTicket
    }
    res.send(JSON.stringify(resObj));
});

module.exports = router;