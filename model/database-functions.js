const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const db = low(adapter);
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

module.exports = {
async getEvents() {
    return await db.get('events').value();
},

async addEvent(adminFormInput) {
    return await db.get('events').push({id: uuid, name: adminFormInput.nameFormInput, where: adminFormInput.whereFormInput, date: adminFormInput.dateFormInput, from: adminFormInput.fromFormInput, until: adminFormInput.toFormInput, seats: 0, tickets: adminFormInput.ticketsFormInput, price: adminFormInput.priceFormInput}).write();
},

async findUsername(user) {
    return await db.get('users').find({ username: user.username }).value();
},

async findEvent(event) {
    return await db.get('events').find({ id: event.eventID }).value();
},

async addTicketOrder(order, ticketNumber) {
    let userOrder = order; 
    userOrder.ticket = ticketNumber;
    await db.get('orders').push(userOrder).write();
    return userOrder;
},

async findTicketOrder(ticketNumber) {
    return await db.get('orders').find({ ticket: ticketNumber }).value();
},

async assignVerified(ticketNumber) {
    return await db.get('orders').find({ ticket: ticketNumber }).assign({verified: true}).write();
},

};