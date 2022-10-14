export function addEventElementToParentEl(eventParentElement, event, sdate, edate) {
  console.log("helper.js : addEventElementToParentEl()")
  console.log(event.desc)
  
  //console.log("eventParentElement: " + eventParentElement)
  //console.log("event: " + event)
  //console.log("sdate: " + sdate)
  //console.log("edate: " + edate)
  
  let html = `
    <div class="container event-name">
    <label for="inputName_${event.id}"></label>
      <input type="text" id="inputName_${event.id}" value="${event.name}" />
    </div>

    <div class="container">
      <label for="inputStartDate_${event.id}">Start Date:</label>
      <input type="date" id="inputStartDate_${event.id}" value="${getDateString(sdate.getFullYear(), sdate.getMonth(), sdate.getDate())}"/>


      <label for="inputStartTime_${event.id}">Start Time:</label>
      <input type="time" id="inputStartTime_${event.id}" value="${getTimeString(sdate)}"/>
    </div>

    <div class="container">
      <label for="inputEndDate_${event.id}">End Date:</label>
      <input type="date" id="inputEndDate_${event.id}" value="${getDateString(edate.getFullYear(), edate.getMonth(), edate.getDate())}"/>


      <label for="inputEndTime_${event.id}">End Time:</label>
      <input type="time" id="inputEndTime_${event.id}" value="${getTimeString(edate)}"/>
    </div>

    <div class="container">
      <label for="inputDescription_${event.id}">Description:</label>
      <textarea rows="2" id="inputDescription_${event.id}">${event.desc}</textarea>
    </div>

    <div class="container">
      <button id="editButton_${event.id}">Save Edits</button>
      <button id="deleteButton_${event.id}">Remove Event</button>
    </div>
  `
  
  eventParentElement.innerHTML = html
  
  //console.log(eventParentElement)
}

export function addNewEventFormToElement(formParentElement) {
  //console.log("helper.js : addNewEventFormToElement()")
  
  let html = `
    <form id="newEventForm" >
      <div class="container event-name">
        <label for="inputName">Event Name:</label>
        <input type="text" id="inputName" placeholder="Name of Event" />
      </div>

      <div class="container">
        <label for="inputStartDate">Start Date:</label>
        <input type="date" id="inputStartDate"/>


        <label for="inputStartTime">Start Time:</label>
        <input type="time" id="inputStartTime"/>
      </div>

      <div class="container">
        <label for="inputEndDate">End Date:</label>
        <input type="date" id="inputEndDate"/>


        <label for="inputEndTime">End Time:</label>
        <input type="time" id="inputEndTime"/>
      </div>

      <div class="container">
        <label for="inputDescription">Description:</label>
        <textarea rows="2" id="inputDescription" placeholder="Description of Event"></textarea>
      </div>

      <div class="container">
          <label for="addButton">Press 'add' to add the above event</label>
          <button  id="addButton" >Add</button>
      </div>
    </form>
  `
  
  formParentElement.innerHTML = html
}

export function getTimeString(date) {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  let dateTimeString = ``
  
  if(hours < 10) {
    dateTimeString += `0${hours}`
  }
  else {
    dateTimeString += `${hours}`
  }
  
  if(minutes < 10) {
    dateTimeString += `:0${minutes}`
  }
  else {
    dateTimeString += `:${minutes}`
  }
  
  //console.log('getTimeString() date: ' + dateTimeString)
  return dateTimeString
}

export function getDateString(year, month, day) {
  month += 1  // MONTH IS ZERO-INDEXED
  // console.log('getDateString() date:  ' + date)
  // const year = date.getFullYear()
  // const month = date.getMonth()
  // const day = date.getDate()
  
  let dateDateString = `${year}`
  //console.log(`getDateString:  ${year}-${month}-${day}`)
  
  if(month < 10) {
    dateDateString += `-0${month}`
  }
  else {
    dateDateString += `-${month}`
  }
  
  if(day < 10) {
    dateDateString += `-0${day}`
  }
  else {
    dateDateString += `-${day}`
  }
  
  //console.log('getDateString() date: ' + dateDateString)
  return dateDateString
}

