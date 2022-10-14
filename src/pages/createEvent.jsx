import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar";

export default function CreateEvent() {
  const arr = Array(336)
    .fill()
    .map(() => 0);
  const alphas = arr;

  const color1 = [0, 200, 20];
  const color2 = [255, 0, 0];
  const color3 = [246, 76, 24];

  const [firstTime, setFirstTime] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [eventName, setEventName] = useState("Event Name");

  const [isPrivate, setIsPrivate] = useState(false);
  let renderedPrivacy = ``;
  if (!isPrivate) {
    renderedPrivacy = `
    <p>
      Anyone with the link can RSVP
    </p>
    `;
  } else {
    renderedPrivacy = `
    <label htmlFor="invitedList">Who's Invited?</label> 
    <br /> 
    <textarea id="invitedList" name="invitedList" rows="2" cols="20" required></textarea>
    <br />
    <small>Separate Users with Commas</small>
    `;
  }

  function handleChangeFirst(val) {
    const myArray = val.split(":");
    setFirstTime(myArray[0] * 2);
  }

  function handleChangeLast(val) {
    const myArray = val.split(":");
    setLastTime(myArray[0] * 2 + 1);
  }

  function flipPrivacy() {
    setIsPrivate(!isPrivate);
  }

  const createSubmit = (createEvent) => {
    createEvent.preventDefault();
    const eventForm = document.querySelector("form");
    const route = eventForm.elements.eName.value + "/joinEvent";

    if (!/^[\w_-]+$/.test(eventForm.elements.eName.value)) {
      alert("Event name must be alphanumeric with no spaces");
      return;
    }

    if (
      !eventForm.elements.firstTime.value ||
      !eventForm.elements.lastTime.value
    ) {
      alert("Must enter valid time (HH:MM:AM/PM)");
      return;
    }

    fetch("/handleSubmitEvent", {
      method: "post",
      body: JSON.stringify({
        eventname: eventForm.elements.eName.value,
        startTime: eventForm.elements.firstTime.value,
        endTime: eventForm.elements.lastTime.value,
        visibility: eventForm.elements.privacy.checked,
        invitees:
          eventForm.elements.privacy.checked === false
            ? undefined
            : eventForm.elements.invitedList.value,
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
        if (!json.error) {
          if (json.joined === true) {
            // go to display event page
            window.location.href = "/event/" + eventForm.elements.eName.value;
          } else {
            alert("Event does not exist, please try to recreate it.");
            eventForm.reset();
          }
        } else {
          alert("Event name already exists, please try another.");
        }
      });
  };

  return (
    <div className="dispEvent">
      <div className="content">
        <h2>Create a New Event</h2>
        <form>
          <fieldset>
            <div className="form-group">
              <label htmlFor="eName">Event Name:</label>
              <input
                type="text"
                id="eName"
                name="eName"
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstTime">Earliest Possible Time:</label>
              <input
                type="time"
                step="3600"
                id="firstTime"
                name="firstTime"
                onChange={(e) => handleChangeFirst(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastTime">Latest Possible Time:</label>
              <input
                type="time"
                step="3600"
                id="lastTime"
                name="lastTime"
                onChange={(e) => handleChangeLast(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="privacy">Event Privacy:</label>
              <br />
              <label className="switch">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  checked={isPrivate}
                  onChange={flipPrivacy.bind(this)}
                />
                <span className="slider round"></span>
              </label>

              <div dangerouslySetInnerHTML={{ __html: renderedPrivacy }} />
            </div>
            <button type="reset" className="btn btn-outline-secondary">
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-outline-primary"
              id="submitBtn"
              onClick={createSubmit}
            >
              Submit
            </button>
            <br />
          </fieldset>
        </form>
      </div>

      <div className="cal">
        <div className="d-flex justify-content-center">
          <h1>{eventName}</h1>
        </div>
        <Calendar
          startDay={0}
          endDay={6}
          startTime={firstTime}
          endTime={lastTime}
          color={color3}
          alphas={alphas}
          readonly={true}
          lockedSlots={alphas}
        />
      </div>
    </div>
  );
}
