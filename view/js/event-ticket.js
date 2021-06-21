// Local API server URL: http://localhost:7000
// Cloud API server URL: https://where-its-at.herokuapp.com

const API_URL = 'https://where-its-at.herokuapp.com'

const sessionTicketNumber = sessionStorage.getItem('ticketnumber');
getTicket()

 async function showTicket (data) {
    let ticketEventName = document.querySelector('.ticket-eventname');
    ticketEventName.innerHTML = data.ticketOrder.name;
    
    let ticketWhere = document.querySelector('.ticket-where');
    ticketWhere.innerHTML = data.ticketOrder.where;
    
    let ticketDate = document.querySelector('.ticket-date');
    ticketDate.innerHTML = data.ticketOrder.date;
    
    let ticketFromTime = document.querySelector('.ticket-fromtime');
    ticketFromTime.innerHTML = data.ticketOrder.from;
    
    let ticketToTime = document.querySelector('.ticket-totime');
    ticketToTime.innerHTML = data.ticketOrder.until;
    
    let ticketNumberID = document.querySelector('.ticket-numberID');
    ticketNumberID.innerHTML = 'Biljettnummer: ' + data.ticketOrder.ticket;
}

 async function getTicket() {
    const response = await fetch(API_URL + `/api/ticket/${sessionTicketNumber}`, {method: 'GET'});
    const data = await response.json();
    showTicket(data);
}