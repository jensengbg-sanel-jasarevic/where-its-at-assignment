// Local API server URL: http://localhost:7000
// Cloud API server URL: https://where-its-at.herokuapp.com

const API_URL = 'https://where-its-at.herokuapp.com'

const eventsListSectionTag = document.querySelector('.events-list');

fetch(API_URL + '/api', { method: 'GET' })
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

    eventDate.innerHTML = data[i].date;
    eventHeader.innerHTML = data[i].name;
    eventPlace.innerHTML = data[i].where;
    eventTimePrice.innerHTML = data[i].from + ' - ' + data[i].until + '<span class="event-price">' + data[i].price + ' sek</span>';
    
    eventsListSectionTag.append(eventDate);
    eventsListSectionTag.append(eventInfo);
    eventInfo.append(eventHeader);
    eventInfo.append(eventPlace);
    eventInfo.append(eventTimePrice);

    selectedEvent()
}};

function sessionStoreID(eventID) {
  return sessionStorage.setItem('event-id', eventID);
}

function selectedEvent() {
  const events = document.querySelectorAll('.event-header');

  for (let i = 0; i < events.length; i++) {
      events[i].addEventListener('click',  () => {
          let eventID = events[i].id;
          sessionStorage.setItem('event-id', eventID);
          location.href = API_URL + '/selected-event.html';
      });
    }
}