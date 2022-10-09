export default function Account() {
  const hello = "Hello React!";
  let events = [];
  let ownedEvents = [];
  let alphas = [];
  
  // const color1 = [0, 200, 20];
  // const color2 = [255, 0, 0];
  const color3 = [246, 76, 24];

  fetch("/:username/info", { method: "get", "no-cors": true })
    .then((response) => response.json())
    .then((json) => {
      this.events = json.joinedEvents;
      this.ownedEvents = json.ownedEvents;
      this.alphas = json.availability;
    });

  return (
    <div className="account">
      <h1>{this.props.username}</h1>
      <div class="container">
        <div class="row">
          <div class="col-3">
            <h2>My Events</h2>
            {this.events}
            <h3>Owned Events</h3>
            {this.ownedEvents}
          </div>
          <div class="col-6">
            <h2>My Availability</h2>
            <div class="user-calendar">
              <Calendar
                startDay={0}
                endDay={6}
                startTime={0}
                endTime={47}
                color={color3}
                alphas={alphas}
                readonly={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
