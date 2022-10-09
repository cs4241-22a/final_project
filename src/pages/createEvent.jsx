// Import the Invitees List component
import Invitees from "./invitees.jsx";
import Calendar from "./components/Calendar";
import React, { useEffect, useState } from "react";

export default function CreateEvent() {
  const arr = Array(335)
    .fill()
    .map(() => 0);
  const alphas = arr;

  const color1 = [0, 200, 20];
  const color2 = [255, 0, 0];
  const color3 = [246, 76, 24];

  const [firstTime, setFirstTime] = useState("0");
  const [lastTime, setLastTime] = useState("0");
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
    <label for="invitedList">Who's Invited?</label> 
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

  //   function submitEvent(e){
  //     e.preventDefault();

  //   }

  return (
    <div className="dispEvent">
      <div className="content">
        <h2>Create a New Event</h2>
        <form>
          <fieldset>
            <div class="form-group">
              <label for="eName">Event Name</label>
              <input
                type="text"
                id="eName"
                name="eName"
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </div>

            <div class="form-group">
              <label for="firstTime">Earliest Possible Time:</label>
              <input
                type="time"
                step="3600"
                id="firstTime"
                name="firstTime"
                onChange={(e) => handleChangeFirst(e.target.value)}
                required
              />
            </div>

            <div class="form-group">
              <label for="lastTime">Latest Possible Time:</label>
              <input
                type="time"
                step="3600"
                id="lastTime"
                name="lastTime"
                onChange={(e) => handleChangeLast(e.target.value)}
                required
              />
            </div>

            <div class="form-group">
              <label for="privacy">Event Privacy:</label>
              <br />
              <label class="switch">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  checked={isPrivate}
                  onChange={flipPrivacy.bind(this)}
                />
                <span class="slider round"></span>
              </label>

              <div dangerouslySetInnerHTML={{ __html: renderedPrivacy }} />
            </div>
            <button type="reset" class="btn btn-outline-secondary">
              Clear
            </button>
            <button
              type="submit"
              class="btn btn-outline-primary"
              id="submitBtn"
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>

      <div className="cal">
        <div class="d-flex justify-content-center">
          <h1>{eventName}</h1>
          <Calendar
            startDay={0}
            endDay={6}
            startTime={firstTime}
            endTime={lastTime}
            color={color3}
            alphas={alphas}
            readonly={true}
          />
        </div>
      </div>
    </div>
  );
}
