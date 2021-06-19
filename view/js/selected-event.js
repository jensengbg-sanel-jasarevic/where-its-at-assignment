const localURL = 'http://localhost:7000';
const cloudURL = 'https://where-its-at.herokuapp.com'

const submitOrderButton = document.querySelector('#order-submit');
getSelectedEvent();

function showEvent(order) {
    submitOrderButton.addEventListener('click', () => {

        let orderObj = {
            id: order.id,
            namn: order.name,
            var: order.where,
            datum: order.date,
            from: order.from,
            till: order.to,
            platser: 0,
            biljetter: 0,
            pris: 0,
            verified: false
        }

        postTicketOrder(orderObj);
        location.href = cloudURL + '/event-ticket.html';
    });

    let orderSectionTag = document.querySelector('.order-ticket');
    let orderDivTag = document.createElement('div');
    orderDivTag.classList.add('myTicket');

    orderDivTag.innerHTML =
        '<h1 class="order-eventname">' + order.name + '</h1>' + 
        '<p class="order-date">' + order.date + ' kl ' + order.from + '-' + order.to + '<p>' +  
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
        let response = await fetch(cloudURL + '/api', {
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
        let response = await fetch(cloudURL + '/api/ticket', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data = await response.json();
        
        setSessionTicketNumber(data.biljettnummer);

    } catch(error) {
        console.log('Error: ', error);
    }
}