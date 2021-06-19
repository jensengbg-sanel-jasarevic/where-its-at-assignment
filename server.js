require("dotenv").config();
const port = process.env.PORT || 7000;
const express = require('express');
const cors = require('cors');

const eventsRouter = require('./routes/route-events');
const staffRouter = require('./routes/route-staff');
const adminRouter = require('./routes/route-admin');

const app = express();

// Method inbuilt in express to recognize the incoming Request Object as a JSON Object. Required when sending data.
app.use(express.json()); 

// URL encoding converts characters into a format that can be transmitted over the Internet. 
// URL encoding is a mechanism for translating unprintable or special characters to a universally accepted format by web servers and browsers.
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// Serve static files (HTML files, CSS files, JavaScript files, images etc)
app.use(express.static('public'));

// Endpoints
app.use('/api', eventsRouter);
app.use('/api/staff', staffRouter);
app.use('/api/admin', adminRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})