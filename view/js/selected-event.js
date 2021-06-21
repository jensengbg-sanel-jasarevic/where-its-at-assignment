// Local API server URL: http://localhost:7000
// Cloud API server URL: https://where-its-at.herokuapp.com

const API_URL = 'https://where-its-at.herokuapp.com'

const submitOrderButton = document.querySelector('#order-submit');
getSelectedEvent();

function showEvent(order) {
    submitOrderButton.addEventListener('click', () => {

        let orderObj = {
            id: order.id,
            name: order.name,
            where: order.where,
            date: order.date,
            from: order.from,
            until: order.until,
            seats: 0,
            tickets: 0,
            price: 0,
            verified: false
        }

        postTicketOrder(orderObj);
        location.href = API_URL + '/event-ticket.html';
    });

    let orderSectionTag = document.querySelector('.order-ticket');
    let orderDivTag = document.createElement('div');
    orderDivTag.classList.add('myTicket');

    orderDivTag.innerHTML =
        '<h1 class="order-eventname">' + order.name + '</h1>' + 
        '<p class="order-date">' + order.date + ' kl ' + order.from + '-' + order.until + '<p>' +  
        '<p class="order-place">' + '@ ' + order.where + '<p>' + 
        '<p class="order-price">' + order.price + ' sek<p>';

    orderSectionTag.append(orderDivTag);
}

function getSessionStorage() {
    return sessionStorage.getItem('event-id');
 }

 async function getSelectedEvent() {
    const sessionEventID = await getSessionStorage();
    
    let event = {
        eventID: sessionEventID
    }
    
    try {
        let response = await fetch(API_URL + '/api', {
            method: 'POST',
            body: JSON.stringify(event),
            headers : {
                'Content-Type': 'application/json'
            }
        });
        let data = await response.json();
        showEvent(data);

    } catch(error) {
        console.log('Error: ', error);
    }
}

function setSessionTicketNumber(ticketNumber) {
    sessionStorage.setItem('ticketnumber', ticketNumber);
}

async function postTicketOrder(orderObj) {    
    let body = {
        order: orderObj
    }

    try {
        let response = await fetch(API_URL + '/api/ticket', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data = await response.json();
        
        setSessionTicketNumber(data.ticket);

    } catch(error) {
        console.log('Error: ', error);
    }
}