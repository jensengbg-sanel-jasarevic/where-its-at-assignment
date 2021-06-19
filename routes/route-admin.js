const { getEvents, addEvent, findUsername } = require('../models/database-functions');
const { matchPassword } = require('../models/hash-password');
const { Router } = require("express");
const jwt = require('jsonwebtoken');

const router = new Router();

// GET - Retrieve all events
router.get('/events', async (req, res) => {
    const events = await getEvents();
    res.send(JSON.stringify(events));
});

// POST - Add event
router.post('/events', async (req, res) => {
    const body = req.body;    
    let postEvent = await addEvent(body);

    let resObj = {
        success: false
    }

    if (postEvent) {
        resObj.success = true;
        resObj.message = 'Event added';
    }
    res.send(JSON.stringify(resObj));
});

// POST - Login authentication 
router.post('/', async (req, res) => {
    const body = req.body;

    let resObj = {
        success: false,
    }

    const user = await findUsername(body);    
    const isAMatch = await matchPassword(body.password, user.password);

    if (user && isAMatch) {
        const token = jwt.sign({ id: user.username }, 'a1b1c1', {
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
        const user = jwt.verify(token, 'a1b1c1');

        if (user) {
            resObj.loginSuccess = true;
            resObj.user = user;
        }
    }
    res.send(JSON.stringify(resObj));
});

module.exports = router;