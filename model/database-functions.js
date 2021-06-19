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
    return await db.get('events').push({id: uuid, namn: adminFormInput.nameFormInput, var: adminFormInput.whereFormInput, datum: adminFormInput.dateFormInput, from: adminFormInput.fromFormInput, till: adminFormInput.toFormInput, platser: 0, biljetter: adminFormInput.ticketsFormInput, pris: adminFormInput.priceFormInput}).write();
},

async findUsername(user) {
    return await db.get('users').find({ username: user.username }).value();
},

async findEvent(event) {
    return await db.get('events').find({ id: event.eventID }).value();
},

async addTicketOrder(order, ticketNumber) {
    let userOrder = order; 
    userOrder.biljettnummer = ticketNumber;
    await db.get('orders').push(userOrder).write();
    return userOrder;
},

async findTicketOrder(ticketNumber) {
    return await db.get('orders').find({ biljettnummer: ticketNumber }).value();
},

async assignVerified(ticketNumber) {
    return await db.get('orders').find({ biljettnummer: ticketNumber }).assign({verified: true}).write();
},

};