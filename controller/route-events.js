const { getEvents, findEvent, addTicketOrder, findTicketOrder } = require('../model/database-functions');
const { generateTicketNumber } = require('../model/generate-ticket-number');
const { Router } = require('express');

const router = new Router();

// GET - Retrieve all events
router.get('/', async (req, res) => {
    const events = await getEvents();
    res.send(JSON.stringify(events));
});

// POST - Retrieve selected event
router.post('/', async (req, res) => {
    const body = req.body;

    let ticket = await findEvent(body);

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

// POST - Add ticket order
router.post('/ticket', async (req, res) => {
    const body = req.body;
    const ticketNumber = generateTicketNumber();
    const postTicketOrder = await addTicketOrder(body.order, ticketNumber);
    res.send(JSON.stringify(postTicketOrder));
});

// GET - Retrieve selected ticket order
router.get('/ticket/:id', async (req, res) => {
    const ticketNumber = req.params.id;    

    let getOrderTicket = await findTicketOrder(ticketNumber);

    let resObj = {
        ticket: getOrderTicket
    }
    res.send(JSON.stringify(resObj));
});

module.exports = router;