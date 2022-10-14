import { addEventElementToParentEl } from "./helper.js"
import { addNewEventFormToElement } from "./helper.js"

// getting the username from the browser's sessionStorage
// https://www.youtube.com/watch?v=x0VcigW9kN0&ab_channel=OpenJavaScript

//  const usernameVal = sessionStorage.getItem('usernameKey')

//   console.log(usernameVal)
let events = [];

window.onload = function () {

  // console.log(document)
  const eventFormElement = document.getElementById("addNewEvent")
  initNewEventForm(eventFormElement)
  
  
  // button.onclick = add

  //     const button2 = document.querySelector('#removeButton')
  //     button2.onclick = remove

  //     const button3 = document.querySelector('#resultsButton')
  //     button3.onclick = results

  //     const button4 = document.querySelector('#updateButton')
  //     button4.onclick = update

  // from tutorial -https://www.youtube.com/watch?v=MkESyVB4oUw&ab_channel=TylerPotts
  
/// console log to all events
  fetch("/getEvents", {
    method: "GET",
  })
  .then((res) => res.json())
  .then((res) => {
    events = res
    
    //console.log(res)
    const eventList = document.getElementById('dateEventList')
    //console.log(eventList)

    events.forEach(event => {
      //const sdatems = Date.parse(event.startDate)
      const sdate = new Date(event.startDate);
      //console.log("sdatems: " + sdatems)
      //console.log("event.startDate: " + event.startDate)
      //console.log("sdate: " + sdate)
      const edate = new Date(event.endDate);
      
      // div id will be equal to the SERVER-GENERATED ID (not db-generated)
      const eventElement = document.createElement('div')
      eventElement.setAttribute('id', `event_div_${event.id}`)
      insertExistingEventIntoDiv(eventList, eventElement, event, sdate, edate)
    })
  })

  // CALLS ADD (IS DEFINED)
  // document.getElementById('addButton').addEventListener('click', add(new Event()))
}

export function initNewEventForm(formParentElement) {
  // call helper
  addNewEventFormToElement(formParentElement)
  
  // set add button onclick
  const addButton = document.getElementById( "addButton" )
  //console.log(addButton)
  addButton.onclick = add
}

export function insertExistingEventIntoDiv(eventList, eventDiv, event, sdate, edate) {
  //console.log("client.js : insertExistingEventIntoDiv()")
  
  // call helper
  eventDiv.className += "eventDiv"
  //console.log(sdate)
  //console.log(edate)
  addEventElementToParentEl(eventDiv, event, sdate, edate)
  eventList.appendChild(eventDiv)
  
  //console.log(`deleteButton_${event.id}`)
  //console.log(eventDiv)
  // set edit/delete button onclicks
  //let deletButton2 = eventDiv.children[4].children[1]
  const deleteButton = document.getElementById(`deleteButton_${event.id}`)
  deleteButton.onclick = function (e) {
    remove(e, event.id)
  }
  
  const editButton = document.getElementById(`editButton_${event.id}`)
  editButton.onclick = function (e) {
    update(e, event.id)
  }
}

export function add(e) {
  e.preventDefault();
  
  console.log("client.js:add()")
  
  //const TaskBase = document.querySelector("#TaskBase");

  const inputStartDate = document.querySelector("#inputStartDate");
  const inputStartTime = document.querySelector("#inputStartTime");
  const inputEndDate = document.querySelector("#inputEndDate");
  const inputEndTime = document.querySelector("#inputEndTime");
  const inputName = document.querySelector("#inputName");
  const inputDescription = document.querySelector("#inputDescription");
  const sDateString = dateIntegerFromInputs(inputStartDate, inputStartTime)
  const eDateString = dateIntegerFromInputs(inputEndDate, inputEndTime)
  //console.log(sDateString)
  console.log(inputDescription.value)
  // console.log(inputStartTime.value)
  // console.log(inputStartDate.value)
  
  if (validateForm(inputName.value, inputStartDate.value, inputEndDate.value)) {
    console.log("blocked attempt to add event")
    alert("Error: Task is missing a field");
  } else {
    //console.log(sDateString);
    const json = {
      startDate: sDateString,
      endDate: eDateString,
      name: inputName.value,
      desc: inputDescription.value,
    };
    console.log(JSON.stringify(json));

    fetch("/addEvent", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // needed for MongoDB and/or the server to know you are using JSON data?
      body: JSON.stringify(json),
    })
      .then((response) => response.json()) // the response will be similar to `{acknowledged: true, insertedId: '632b31bc5fefa072c1ca1fe7'}`
      .then((resjson) => {
        //adds field in JSON task for object ID
        json._id = resjson.insertedId;
        //console.log(json);

        let tr = document.createElement("tr");
        // tr.innerText = JSON.stringify(json)
        tr.innerHTML = `<td>${json._id}</td>  <td>${json.User}</td>   <td>${json.Task}</td> <td>${json.TypeOfTask}</td> <td>${json.Difficulty}</td> <td>${json.Semester}</td>`;
        //TaskBase.appendChild(tr);
      });

    // return false
  }
};

// use query selector all
function remove (e, eventID) {
  //console.log("client.js : remove()")
  e.preventDefault();
  // get the ID of the task that we want to delete
  let jsonID = { id: eventID }
  fetch("/removeEvent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jsonID),
  })
  .then((res) => res.json)
  .then((json) => console.log(json))
  .then(() => {
    let el = document.getElementbyId(`event_div_${event.id}`)
    el.remove()
    
    events.splice(events.findIndex(element => element.id === eventID),1)
    // TODO: 
  })
};

// FIXME: this isn't doing things right
function update (e, eventID) {
  console.log("update()")
  e.preventDefault();
  let eventName = document.getElementById(`inputName_${eventID}`)
  let eventStart = document.getElementById(`inputStartDate_${eventID}`)
  let eventStartTime = document.getElementById(`inputStartTime_${eventID}`)
  let eventEnd = document.getElementById(`inputEndDate_${eventID}`)
  let eventEndTime = document.getElementById(`inputEndTime_${eventID}`)
  let eventDesc = document.getElementById(`inputDescription_${eventID}`)
  //console.log(eventDesc)
  const sDateString = dateIntegerFromInputs(eventStart, eventStartTime)
  const eDateString = dateIntegerFromInputs(eventEnd, eventEndTime)
  //console.log(sDateString)
  
  if (validateForm(eventName.value, eventStart.value, eventEnd.value)) {
    console.log("blocked attempt to udpate event")
    alert("Error: Task is missing a field");
  } else {
    let jsonUpdate = {
      name: eventName.value,
      startDate: sDateString,
      endDate: eDateString,
      id: eventID,
      desc: eventDesc.value
    };
    console.log(JSON.stringify(jsonUpdate))

    fetch("/updateEvent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonUpdate),
    }).then((res) => {
      let index = events.findIndex(element => element.id === eventID);
      events[index] = new Object(jsonUpdate.name,jsonUpdate.startDate,jsonUpdate.endDate,jsonUpdate.id,jsonUpdate.description);
    });
  }
};

var el = document.getElementById("calView");
if(el){
document.getElementById("calView").addEventListener("click", () => {
  window.location.replace("calendar.html");
});
}

// function dateStringFromInputs(dateInput, timeInput) {
//   console.log(timeInput.value)
//  // console.log(timeInput.value)
//   let dateString = ""
//   if(timeInput.value != "") {
//     dateString = `${dateInput.value}T${timeInput.value}Z+05:00`
//   }
//   else {
//     dateString = `${dateInput.value}T00:00Z+05:00`
//   }
//   //console.log("dateStringFromInputs(): " + dateString)
//   return dateString
// }

function dateIntegerFromInputs(dateInput, timeInput) {
  const dateInputString = dateInput.value  // "YYYY-MM-DD"
  const timeInputString = timeInput.value  // "HH:mm"
  const year = Number(dateInputString.substring(0,4))
  const month = Number(dateInputString.substring(5,7))
  const day = Number(dateInputString.substring(8,10))
  
  if(timeInputString != "") {
    const hour = Number(timeInputString.substring(0,2))
    const minute = Number(timeInputString.substring(3,5))
    
    const date = new Date(year, month-1, day, hour, minute)
    return date.valueOf()
  }
  
  const date = new Date(year, month-1, day, 0, 0)
  return date.valueOf()
}

function validateForm(nameInput, sDateInput, eDateInput) {
  // RETURNS TRUE IF FIELDS ARE MISSING
  return ((nameInput === "") || (sDateInput === "") || (eDateInput === ""))
}


