import { insertExistingEventIntoDiv } from "./client.js"
import { initNewEventForm } from "./client.js"
import { getDateString } from "./helper.js"
import { add } from "./client.js"

let nav = 0
let clicked = null;
let events = [];

window.onload = function () {
  // initButtons();
  //load();
  
  const eventFormElement = document.getElementById("addNewEvent")
  initNewEventForm(eventFormElement)
}

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  console.log("open modal")
  clicked = new Date(date);
  console.log("Clicked date:  " + clicked)
  //console.log("Clicked date month: " + clicked.getMonth())
  // ~~> NOTE: Date.getMonth() is ZERO-INDEXED (Jan = 0-th month, Oct = 9-th month, etc.)
  
  const dstring = getDateString(clicked.getFullYear(), clicked.getMonth(), clicked.getDate())
  let formSDate = document.getElementById("inputStartDate")
  formSDate.value = dstring
  let formEDate = document.getElementById("inputEndDate")
  formEDate.value = dstring
  
  const eventList = document.getElementById('dateEventList')
  //const eventForDay = events.find(e => e.startDate === clicked);

  events.forEach(event => {
    
    //console.log("startDate: " + event.startDate);
    const sdate = new Date(event.startDate);
    const edate = new Date(event.endDate);
    //console.log(sdate);
    //console.log(edate);
    
    const isStartDateClicked = clicked.getFullYear() === sdate.getFullYear() && clicked.getMonth() === sdate.getMonth() && clicked.getDate() === sdate.getDate()
    const isEndDateClicked = clicked.getFullYear() === edate.getFullYear() && clicked.getMonth() === edate.getMonth() && clicked.getDate() === edate.getDate()
    
    if(isStartDateClicked || isEndDateClicked){
      // console.log("Start   date:  " + sdate)
      // console.log("End     date:  " + edate)
      
      // add event to list of events
      
      // div id will be equal to the SERVER-GENERATED ID (not db-generated)
      const eventElement = document.createElement('div')
      eventElement.setAttribute('id', `event_div_${event.id}`)
      //console.log(eventElement)
      
      insertExistingEventIntoDiv(eventList, eventElement, event, sdate, edate)
      
      eventList.appendChild(eventElement)
    }
  })

  
//   if (false) {
//     const list = document.getElementById('dateEventList')
    
//     deleteEventModal.style.display = 'block';
//   } else {
    
//   }
  newEventModal.style.display = 'block';
  backDrop.style.display = 'block';
}

function load() {
  console.log("cal.js : load()")
  // get + set list of events
  fetch("/getEvents", {
    method: "GET",
  })
  .then((res) => res.json())
  .then((res) => {
    //console.log(res)
    
    events = res
  })
  .then((res) => {
      const dt = new Date();

      if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
      }

      const day = dt.getDate();
      const month = dt.getMonth();
      const year = dt.getFullYear();

      const firstDayOfMonth = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
      const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

      document.getElementById('monthDisplay').innerText = 
        `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

      calendar.innerHTML = '';

      for(let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if (i > paddingDays) {
          // hard-coded to GMT-0400 (Eastern Daylight Time) for now
          const tempDate = new Date(year, month, i - paddingDays, 0, 0)
          const dayNumber = tempDate.valueOf()
          //console.log("dayNumber: " + dayNumber)
          //const dayString = `${year}-${month + 1}-${i - paddingDays}T05:00:00.000Z`
          //console.log('load() date string: ' + dayString)

          daySquare.innerText = i - paddingDays;
          let eventsForDay = 0
          events.forEach(e => {
            //console.log("e.startDate: " + e.startDate)
            const sdate = new Date(e.startDate)
            const edate = new Date(e.endDate)
            
            if(areDatesEqual(tempDate, sdate) || areDatesEqual(tempDate, edate)) {
              eventsForDay += 1
            }
          })
          //console.log(eventsForDay)

          if (i - paddingDays === day && nav === 0) {
            daySquare.id = 'currentDay';
          }

          if (eventsForDay > 0) {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.innerText = `${eventsForDay} events`;
            daySquare.appendChild(eventDiv);
          }

          daySquare.addEventListener('click', () => openModal(dayNumber));
        } else {
          daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);    
      }
  })
  // ~~~~~~~~~~
  

}

function closeModal() {
  //console.log("close modal")
  
  // TODO: CLEAR EVENT LIST
  document.getElementById('dateEventList').innerHTML ="";
  
 // eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  //deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  //eventTitleInput.value = '';
  clicked = null;
  load();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });
  document.getElementById('listView').addEventListener('click', () => {
  
    window.location.replace("list.html")
  });

  //document.getElementById('saveButton').addEventListener('click', saveEvent);
  //console.log("getting buttons by id")
  
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  //document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  //document.getElementById('closeButton').addEventListener('click', closeModal);

}

initButtons();
load();


function areDatesEqual(date1, date2) {
  const a = (date1.getFullYear() === date2.getFullYear())
  const b = (date1.getMonth() === date2.getMonth())
  const c = (date1.getDate() === date2.getDate())
  
  return (a && b && c)
}
