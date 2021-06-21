// Local API server URL: http://localhost:7000
// Cloud API server URL: https://where-its-at.herokuapp.com

const API_URL = 'https://where-its-at.herokuapp.com'

const sessionTicketNumber = sessionStorage.getItem('ticketnumber');
getTicket()

 async function showTicket (data) {
    let ticketEventName = document.querySelector('.ticket-eventname');
    ticketEventName.innerHTML = data.ticket.name;
    
    let ticketWhere = document.querySelector('.ticket-where');
    ticketWhere.innerHTML = data.ticket.where;
    
    let ticketDate = document.querySelector('.ticket-date');
    ticketDate.innerHTML = data.ticket.date;
    
    let ticketFromTime = document.querySelector('.ticket-fromtime');
    ticketFromTime.innerHTML = data.ticket.from;
    
    let ticketToTime = document.querySelector('.ticket-totime');
    ticketToTime.innerHTML = data.ticket.until;
    
    let ticketNumberID = document.querySelector('.ticket-numberID');
    ticketNumberID.innerHTML = 'Biljettnummer: ' + data.ticket.biljettnummer;
}

 async function getTicket() {
    const response = await fetch(API_URL + `/api/ticket/${sessionTicketNumber}`, {method: 'GET'});
    const data = await response.json();
    showTicket(data);
}