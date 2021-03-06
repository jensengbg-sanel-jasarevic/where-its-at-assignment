// Local API server URL: http://localhost:7000
// Cloud API server URL: https://where-its-at.herokuapp.com

const API_URL = 'https://where-its-at.herokuapp.com'

let eventList = document.querySelector('.events-list-admin');
let addEventBtn = document.querySelector('#add-event-btn');
signedIn();

addEventBtn.addEventListener('click', () => {
    const formName = document.querySelector('#admin-add-name');
    const formWhere = document.querySelector('#admin-add-where');
    const formDate = document.querySelector('#admin-add-date');
    const formFrom = document.querySelector('#admin-add-from');
    const formTo = document.querySelector('#admin-add-to');
    const formTickets = document.querySelector('#admin-add-tickets');
    const formPrice = document.querySelector('#admin-add-price');
    
        let formObj = {
            nameFormInput: formName.value,
            whereFormInput: formWhere.value,
            dateFormInput: formDate.value,
            fromFormInput: formFrom.value,
            toFormInput: formTo.value,
            ticketsFormInput: parseInt (formTickets.value),
            priceFormInput: parseInt (formPrice.value)
        }
        eventList.innerHTML = '';
        addEvent(formObj);
        getEvents();
    });

function getSessionToken() {
    return sessionStorage.getItem('auth');
} 

async function signedIn() {
    const token = getSessionToken();

    const response = await fetch(API_URL + '/api/admin/login', { 
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        } 
    });
    const data = await response.json();

    if (data.loginSuccess) {
        getEvents();
    } else if (!data.loginSuccess) {
        location.href = API_URL + '/login-admin.html'
    } 
};

async function getEvents() {
    const response = await fetch(API_URL + '/api/admin/events', { method: 'GET' } );
    const data = await response.json();
    showEvents(data);
};

async function showEvents(events) {
    let nameElement = document.createElement('ul');
    nameElement.classList.add('admin-name');
    nameElement.innerHTML = 'NAMN';
   
    let whereElement = document.createElement('ul');
    whereElement.classList.add('admin-where');
    whereElement.innerHTML = 'VAR';

    let seatsElement = document.createElement('ul');
    seatsElement.classList.add('admin-quantity');
    seatsElement.innerHTML = 'ANTAL PLATSER';

    let soldTicketsElement = document.createElement('ul');
    soldTicketsElement.classList.add('admin-soldtickets');
    soldTicketsElement.innerHTML = 'SÅLDA BILJETTER';

    for(eventData of events) {   
        let eventName = document.createElement('li');
        eventName.classList.add('admin-eventname');
        eventName.innerHTML = eventData.name;

        let eventPlace = document.createElement('li');
        eventPlace.classList.add('admin-place');
        eventPlace.innerHTML = eventData.where;

        let eventSeats = document.createElement('li');
        eventSeats.classList.add('admin-quantitynumber');
        eventSeats.innerHTML = eventData.seats;

        let eventSoldTickets = document.createElement('li');
        eventSoldTickets.classList.add('admin-ticketssold');
        eventSoldTickets.innerHTML = eventData.tickets;

        nameElement.append(eventName);
        whereElement.append(eventPlace);
        seatsElement.append(eventSeats);
        soldTicketsElement.append(eventSoldTickets);
        eventList.append(nameElement, whereElement, seatsElement, soldTicketsElement);
    }
};

async function addEvent(event) {
    try {
        const response = await fetch(API_URL + '/api/admin/events', {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = response.json();
        
    return await data;
    } catch(error) {
        console.log('Error: ', error);
    }
};