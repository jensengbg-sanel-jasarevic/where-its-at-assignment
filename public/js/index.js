const eventsListSectionTag = document.querySelector('.events-list');
const url = 'http://localhost:7000/api/index';

fetch(url + '/getallevents', { method: 'GET' })
  .then(response => response.json())
  .then(data => showEvents(data));

const showEvents = data => {
  for (let i = 0; i < data.length; i++) {
    let eventDate = document.createElement('p');
    let eventInfo = document.createElement('div');
    let eventHeader = document.createElement('h1');
    let eventPlace = document.createElement('p');
    let eventTimePrice = document.createElement('p');

    eventDate.setAttribute('class', 'event-date');
    eventInfo.setAttribute('class', 'this-event');
    eventHeader.setAttribute('class', 'event-header');
    eventHeader.setAttribute('id', `${data[i].id}`);
    eventPlace.setAttribute('class', 'event-place');
    eventTimePrice.setAttribute('class', 'event-time-price');

    eventDate.innerHTML = data[i].datum;
    eventHeader.innerHTML = data[i].namn;
    eventPlace.innerHTML = data[i].var;
    eventTimePrice.innerHTML = data[i].from + ' - ' + data[i].till + '<span class="event-price">' + data[i].pris + ' sek</span>';
    
    eventsListSectionTag.append(eventDate);
    eventsListSectionTag.append(eventInfo);
    eventInfo.append(eventHeader);
    eventInfo.append(eventPlace);
    eventInfo.append(eventTimePrice);

    selectedOrder()
}};

function sessionStoreID(eventID) {
  return sessionStorage.setItem('event-id', eventID);
}

function selectedOrder() {
  const events = document.querySelectorAll('.event-header');

  for (let i = 0; i < events.length; i++) {
      events[i].addEventListener('click',  () => {
          let eventID = events[i].id;
          sessionStorage.setItem('event-id', eventID);
          location.href = 'http://localhost:7000/user-order.html';
      });
    }
}