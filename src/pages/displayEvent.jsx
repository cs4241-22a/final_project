import Button from "react-bootstrap/Button";
import Calendar from "./components/Calendar";

export default function DisplayEvent() {
  // Create dummy availability
  const arr = Array(335)
    .fill()
    .map(() => Math.random());

  const alphas = arr;
  const color1 = [0, 200, 20];
  const color2 = [255, 0, 0];
  const color3 = [246, 76, 24];

  const eventName = "Sample Event";

  return (
    <div className="dispEvent">
      
      <div className="content">
        <h2>About:</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a
          eleifend leo, eu feugiat purus. Aenean eu feugiat ex. Nunc venenatis
          tristique finibus. Morbi facilisis posuere semper. Donec in pulvinar
          felis. Nullam sollicitudin ligula vitae finibus semper. Praesent ac
          magna purus. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Etiam vel vehicula turpis, ac
          vestibulum lacus. Nam dictum efficitur purus, in rutrum urna imperdiet
          interdum. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas.
        </p>
      </div>

      <div className="cal">
        <div class="d-flex justify-content-center">
          <h1>{eventName}</h1>
        </div>
        <Calendar
          startDay={0}
          endDay={6}
          startTime={14}
          endTime={41}
          color={color3}
          alphas={alphas}
          readonly={true}
        />
      </div>
    </div>
  );

  // return (
  //   <>
  //     Example Event Cal (readonly mon-fri 8a-5p)
  //     <Calendar startDay={1} endDay={5} startTime={16} endTime={35} color={color1} alphas={alphas} readonly={true}/>
  //     Example Account Cal (Modify full sched)
  //     <Calendar startDay={0} endDay={6} startTime={0} endTime={47} color={color2} alphas={alphas} readonly={false}/>
  //     <Button>This is a (Styled) Button</Button>
  //   </>
  // );
}
