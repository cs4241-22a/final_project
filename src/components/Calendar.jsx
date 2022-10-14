import React, { useState, useEffect } from "react";

/*
Serves as a time block
id: 0-335 identifies a specific time block
fill: color to set cell on selection
alpha: percentage of color
selecting: is the mouse currently highlighting or dehighlighting (read/write only)
readonly: can the cells be modified by the mouse

TODO:
Create blocks that cannot be unselected (timeslots consumed by other when3meet events, different color?)
*/
function Block({ id, fill, alpha, selecting, readonly, locked }) {
  const [percentageFill, setPercentageFill] = useState(alpha);
  const [isHover, setIsHover] = useState(false);
  const [isClicked, setIsClicked] = useState(Math.ceil(alpha) ? true : false);
  const [isLocked, setIsLocked] = useState(locked);

  useEffect(() => {
    setPercentageFill(locked === 0 ? alpha: 1);
    setIsClicked(Math.ceil(alpha) ? true : false);
  }, [alpha, locked]);

  const color =
    "rgba(" +
    fill[0] +
    "," +
    fill[1] +
    "," +
    fill[2] +
    "," +
    percentageFill +
    ")";
  const hoverColor = "rgba(0, 0, 0, .1)";
  const eventColor =
    "rgba(" +
    (255-fill[0]) +
    "," +
    (255-fill[1]) +
    "," +
    (255-fill[2]) +
    "," +
    percentageFill +
    ")";

  let handleClick,
    handleMouseEnter,
    handleMouseLeave = "";

  // If calendar is readonly, we want mouse over events to display percentage instead of handle inputs
  if (readonly) {
    handleClick = (e) => {
      e.preventDefault();
    };

    handleMouseEnter = (e) => {
      setIsHover(true);
    };

    handleMouseLeave = (e) => {
      setIsHover(false);
    };
  }
  // If the calendar is interactable, we want the cells to update their state when clicked or moused over
  else {
    handleClick = (e) => {
      e.preventDefault();
      if (isClicked && locked === 0) {
        setPercentageFill(0);
        setIsClicked(false);
      } else if (!isClicked && locked === 0) {
        setPercentageFill(1);
        setIsClicked(true);
      }
    };

    handleMouseEnter = (e) => {
      if (e.buttons == 1) {
        if (isClicked && !selecting && locked === 0) {
          setPercentageFill(0);
          setIsClicked(false);
        } else if (!isClicked && selecting && locked === 0) {
          setPercentageFill(1);
          setIsClicked(true);
        }
      } else {
        setIsHover(true);
      }
    };

    handleMouseLeave = (e) => {
      setIsHover(false);
    };
  }

  return (
    <div
      className={"timeslot " + (id & 1 ? "" : "tophalf")} //Odd cells identified for styling
      id={id}
      onMouseDown={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      selected={isClicked}
      style={{ backgroundColor: locked !== 2 ? (isHover ? hoverColor : color) : eventColor }}
    >
      {/*This p is only drawn when the cell is hovered and in the readonly state*/}
      <p className="percentage">
        {isHover && readonly ? "" + Math.ceil(percentageFill * 100) + "%" : ""}
      </p>
    </div>
  );
}

/*
A set of time blocks with day title
name: day of the week
firstBlockId: topmost timeslot of day
startTime: first timeslot to display (0-47, should be even)
endTime: last timeslot to display (0-47, should be odd, greater than startTime)
color: color to set cells
alphas: list of preset cell percentages
selecting: state of mouse event
readonly: is the cal RO
*/
function Day({
  name,
  firstBlockId,
  startTime,
  endTime,
  color,
  alphas,
  selecting,
  readonly,
  lockedSlots,
}) {
  // Create vertical stack of time blocks (with unique ids)
  const blocks = Array.from({ length: endTime - startTime + 1 }, (_, index) => {
    const blockIdx = firstBlockId + index;
    return (
      <Block
        key={blockIdx}
        id={blockIdx}
        fill={color}
        alpha={alphas[blockIdx]}
        selecting={selecting}
        readonly={readonly}
        locked={lockedSlots[blockIdx]}
      />
    );
  });
  
  const [dayName, setDayName] = useState(name);
  
  useEffect(() => {
    if (document.querySelector(`div#${name}`).offsetWidth < document.querySelector(`p#${name}`).scrollWidth) {
      setDayName(name.slice(0, 3));
    }
  }, []);
      
  return (
    <div id={name} style={{ display: "inline-block" }}>
      <p id={name} className="cal-day">{dayName}</p>
      {blocks}
    </div>
  );
}

/*
Size customizable calendar with responsive time blocks
startDay: first day of calendar (0-6)
endDay: last day of calendar (0-6)
startTime: first timeslot to display (0-47, should be even)
endTime: last timeslot to display (0-47, should be odd, greater than startTime)
color: color to set cells
alphas: list of preset cell percentages
readonly: is the cal RO

TODO:
API requests to get and post calendar data
*/
function Calendar({
  startDay,
  endDay,
  startTime,
  endTime,
  color,
  alphas,
  readonly,
  lockedSlots,
}) {
  const [selecting, setSelecting] = useState(false);

  /*
  Each time the mouse button is lifted, or when the mouse leaves the calendar, the calendar
  is iterated over and the state of each cell is recorded to an array[336]
  */
  const handleClick = (e) => {
    e.preventDefault();
    setSelecting(!e.target.selected);
  };

  const handleMouseLeave = (e) => {
    if (e.buttons == 1) {
      handleSubmit(e);
    }
  };

  //Network code goes here (mouse event over)
  const handleSubmit = (e) => {
    if (!readonly) {
      let selection = [];
      selection.length = 336;
      selection.fill(false);

      //Iterate through each timeslot in calendar
      const parent = e.target.parentElement.parentElement.parentElement;
      parent.childNodes.forEach((e) => {
        e.childNodes.forEach((e) => {
          e.childNodes.forEach((e) => {
            if (e.className.includes("timeslot")) {
              // Record which ids are selected
              selection[e.id] = e.selected;
            }
          });
        });
      });

      fetch("/setAvailability", {
        method: "POST",
        body: JSON.stringify({
          availability: selection,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        "no-cors": true,
      });
    }
  };

  // Create time column
  const timesOfDay = Array.from(
    { length: (endTime + 1 - startTime) / 2 },
    (_, index) => {
      return (
        <p key={index} className="time">
          {"" + (index + startTime / 2) + ":00"}
        </p>
      );
    }
  );

  // Create list of day columns
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const calDays = daysOfWeek.slice(startDay, endDay + 1).map((e) => (
    <td>
      <Day
        key={e}
        name={e}
        firstBlockId={daysOfWeek.indexOf(e) * 48 + startTime}
        startTime={startTime}
        endTime={endTime}
        color={color}
        alphas={alphas}
        selecting={selecting}
        readonly={readonly}
        lockedSlots={lockedSlots}
      />
    </td>
  ));

  return (
    <div>
      <table style={{width: "100%"}}>
        <tr>
          <td style={{textAlign: "right"}}>
            <div className="timeCol">{timesOfDay}</div>
          </td>
          <td>
            <div
              className="calendar"
              onMouseDown={handleClick}
              onMouseUp={handleSubmit}
              onMouseLeave={handleMouseLeave}
            >
              <table>
                <tr>{calDays}</tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Calendar;
