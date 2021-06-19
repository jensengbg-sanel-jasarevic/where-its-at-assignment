const submitOrderButton = document.querySelector('#order-submit');
postSelectedTicket();

function showOrder(order) {
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

        postOrder(orderObj);
        location.href = 'http://localhost:7000/user-ticket.html';
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

 async function postSelectedTicket() {
    const sessionEventID = await getSessionStorage();
    const url = 'http://localhost:7000/api/index/order';
    
    let event = {
        eventID: sessionEventID
    }
    
    try {
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(event),
            headers : {
                'Content-Type': 'application/json'
            }
        });
        let data = await response.json();
        showOrder(data);

    } catch(error) {
        console.log('Error: ', error);
    }
}

function setSessionTicketNumber(ticketNumber) {
    sessionStorage.setItem('ticketnumber', ticketNumber);
}

async function postOrder(orderObj) {
    const url = 'http://localhost:7000/api/index/addorder';
    
    let body = {
        order: orderObj
    }

    try {
        let response = await fetch(url, {
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