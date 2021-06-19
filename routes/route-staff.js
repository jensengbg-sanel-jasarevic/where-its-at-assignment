const { findUsername, findTicketOrder, assignVerified } = require('../models/database-functions');
const { matchPassword } = require('../models/hash-password');
const { Router } = require("express");
const jwt = require('jsonwebtoken');

const router = new Router();

// POST - Login authentication
router.post('/', async (req, res) => {
    const body = req.body;

    let resObj = {
        success: false
    }

    const user = await findUsername(body);    
    const isAMatch = await matchPassword(body.password, user.password);
    
    if (user && isAMatch) {
        const token = jwt.sign({ id: user.username }, 'a2b1c1', {
            expiresIn: 600 
        })
        resObj.success = true;
        resObj.token = token;
        resObj.role = user.role;
    }
    res.send(JSON.stringify(resObj));
});

// GET - Check authorization
router.get('/login', async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    
    let resObj = {
        loginSuccess: false
    }

    if (token !== 'null') {
        const user = jwt.verify(token, 'a2b1c1');

        if (user) {
            resObj.loginSuccess = true;
            resObj.user = user;
        }
    }
    res.send(JSON.stringify(resObj));
});

// POST - Check if ticket exist & if has been verified
router.post('/verifyticket', async (req, res) => {
    let body = req.body;

    let resObj = {
        success: false,
        ticket: false,
        message: 'Non existing ticket number'
    };

    const ticket = await findTicketOrder(body.ticketNumber);

     if (ticket && ticket.verified !== true) {
        assignVerified(body.ticketNumber);

            resObj.success = true;
            resObj.ticket = true;
            resObj.verified = true;
            resObj.message = 'Ticket verified'

      } else if (ticket && ticket.verified == true) {
            resObj.success = false,
            resObj.ticket = true,
            resObj.message = 'Ticket has already been verified'
     };

    res.send(JSON.stringify(resObj));
});

module.exports = router;