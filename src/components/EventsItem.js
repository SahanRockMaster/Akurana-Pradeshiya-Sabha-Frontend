import React from "react";

function EventsItem({ image, name, event }) {
  return (
    <div className="eventsItem" onClick={event}>
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
    </div>
  );
}

export default EventsItem;
