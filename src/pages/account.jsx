import Calendar from "../components/Calendar";
import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Account() {
  const { id } = useParams();

  const color = [0, 200, 20];

  const [events, setEvents] = useState([]);
  const [ownedEvents, setOwnedEvents] = useState([]);
  const [alphas, setAlphas] = useState(
    Array(336)
      .fill()
      .map(() => 0)
  );
  const [lockedSlots, setLockedSlots] = useState(
    Array(336)
      .fill()
      .map(() => 0)
  );

  let editMode = false;
  let editButtonText = "Edit Availability";

  const fetchData = () => {
    fetch(`/info/${id}`, {
      method: "get",
      "no-cors": true,
    })
      .then((response) => response.json())
      .then((json) => {
        setEvents(json.joined);
        setOwnedEvents(json.owned);
        let newAlphas = Array(336).fill(0);
        for (let i = 0; i < json.availability.length; i++) {
          newAlphas[i] = json.availability[i] === true ? 1 : 0;
        }
        setAlphas(newAlphas);
        let newLocked = Array(336).fill(0);
        for (let i = 0; i < json.joined.length; i++) {
          fetch(`/event/${json.joined[i]}/info`, {
            method: "get",
            "no-cors": true,
          })
            .then((_response) => _response.json())
            .then((_json) => {
              if(_json.isScheduled === true){
                
                let day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].indexOf(_json.scheduledDay);
                let start = _json.scheduledStart.split(":")[0];
                let end = _json.scheduledEnd.split(":")[0];
                let startIndex = day*48+start*2;
                let endIndex = day*48+end*2;
                for(let j = startIndex; j < endIndex; j++){
                  newLocked[j] =  2;
                }
                setLockedSlots(newLocked);
              }
          });
        }
      
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [allowedUser, setAllowedUser] = useState(false);

  fetch("/validUser", {
    method: "post",
    body: JSON.stringify({
      accountId: id,
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
      setAllowedUser(json.valid);
    });

  if (allowedUser === true) {
    return (
      <div className="dispEvent">
        <div className="content">  
          <h2>All Events</h2>
          <ul>
            {events.map((event) => (
              <li>
                <a href={"/event/" + event}>{event}</a>
              </li>
            ))}
          </ul>
          <h3>Owned Events</h3>
          <ul>
            {ownedEvents.map((event) => (
              <li>
                <a href={"/event/" + event}>{event}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="cal">
          <div className="d-flex justify-content-center">
            <h1>{id}'s Availability</h1>
          </div>
          <Calendar
            startDay={0}
            endDay={6}
            startTime={0}
            endTime={47}
            color={color}
            alphas={alphas}
            readonly={false}
            lockedSlots={lockedSlots}
          />
          <div style={{textAlign: "center"}}>
            <p>Set available blocks green with your mouse.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>You are not authorized to access this content.</p>
    </div>
  );
}
