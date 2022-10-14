import Button from "react-bootstrap/Button";
import Calendar from "../components/Calendar";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function DisplayEvent() {

  const color = [0, 200, 20];

  const { eventName } = useParams();
  const [validPage, setValidPage] = useState(false);
  const [invitedUser, setInvitedUser] = useState(true);
  const [alphas, setAlphas] = useState(Array(336).fill(0));
  const [attendee, setAttendee] = useState(false);
  const [owner, setOwner] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [lockedSlots, setLockedSlots] = useState(
    Array(336)
      .fill()
      .map(() => 0)
  );

  const joinEvent = () => {
    fetch(`/${eventName}/joinEvent`, {
      method: "get",
      "no-cors": true,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        fetchData();
      });
  };
  
  const leaveEvent = () => {
    fetch(`/${eventName}/leaveEvent`, {
      method: "get",
      "no-cors": true,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
      window.location.href = "/user/"+json.username
        fetchData();
      });
  };

  const fetchData = () => {
    fetch(`/event/${eventName}/info`, {
      method: "get",
      "no-cors": true,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setValidPage(json ? true : false);
        setAlphas(json.groupAvailability);
        setAttendee(json.event.attendees.includes(json.user));
        setOwner(json.event.owner === json.user);
        setStartTime(json.event.startTime.split(":")[0] * 2);
        setEndTime(json.event.endTime.split(":")[0] * 2 + 1);
        if(json.isScheduled === true){
          let newLocked = Array(336).fill(0);
          let day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].indexOf(json.scheduledDay);
          let start = json.scheduledStart.split(":")[0];
          let end = json.scheduledEnd.split(":")[0];
          let startIndex = day*48+start*2;
          let endIndex = day*48+end*2;
          for(let j = startIndex; j < endIndex; j++){
            newLocked[j] =  2;
          }
          setLockedSlots(newLocked);
        }
      });
  };
  
  const scheduleSubmit = (scheduleEvent) => {
    scheduleEvent.preventDefault();
    //alert("Logging in...");
    const scheduleForm = document.querySelector("form");
    const route = "/" + eventName + "/editEvent";
    fetch(route, {
      method: "post",
      body: JSON.stringify({
        isScheduled: true,
        scheduledStart: scheduleForm.elements.startTime.value,
        scheduledEnd: scheduleForm.elements.endTime.value,
        scheduledDay: scheduleForm.elements.day.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      "no-cors": true,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        scheduleForm.reset();
        fetchData();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  fetch("/invitedUser", {
    method: "post",
    body: JSON.stringify({
      event: eventName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    "no-cors": true,
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      setInvitedUser(json.valid);
    });

  if (validPage === true && invitedUser === true) {
    return (
      <div className="dispEvent">
        
        <div classname="event" style={{padding: "10px"}}>
          <h1>Schedule Event</h1>
          <form id="scheduleForm" style={{display: owner ? "" : "none"}}>
            <fieldset>
              <div className="form-group">
                <label for="day">Select the day:</label>
                <select id="day" name="day" required>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>                
              <div className="form-group">
                <label htmlFor="startTime">Event Start Time:</label>
                <input
                  type="time"
                  step="3600"
                  id="startTime"
                  name="startTime"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="endTime">Event End Time:</label>
                <input
                  type="time"
                  step="3600"
                  id="endTime"
                  name="endTime"
                  required
                />
              </div>

              <br />
              <button className="btn btn-outline-primary" onClick={scheduleSubmit}>
                Schedule Event
              </button>
            </fieldset>
          </form>
          <button
          className="btn btn-outline-secondary"
          onClick={joinEvent}
          style={{ display: attendee ? "none" : "", marginTop: "10px" }}
          >
          Join Event
          </button>
          <button
          className="btn btn-outline-danger"
          onClick={leaveEvent}
          style={{ display: attendee ? "" : "none", marginTop: "10px" }}
          >
          Leave Event
          </button>
        </div>
        
        <div className="cal">
          <div className="d-flex justify-content-center">
            <h1>{eventName}</h1>
          </div>
          <Calendar
            startDay={0}
            endDay={6}
            startTime={startTime}
            endTime={endTime}
            color={color}
            alphas={alphas}
            readonly={true}
            lockedSlots={lockedSlots}
          />
          
          <div style={{textAlign: "center"}}>
            <p>Group availability is displayed green.</p>
          </div>
          
        </div>
        <br />
      </div>
    );
  }

  return (
    <div>
      <p>404: The event you requested does not exist!</p>
      <code>invalid event: {eventName}</code>
    </div>
  );
}
