import React from "react";

function EventsItem({ image, name, event }) {
  return (
    <div className="eventsItem"  onClick={event}>
      <div style={{ backgroundImage: `url(http://localhost:8000/${image})` }}> </div>
      <h1> {name} </h1>
    </div>
  );
}

export default EventsItem;
