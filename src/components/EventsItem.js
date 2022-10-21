import React from "react";

function EventsItem({ image, name, price }) {
  return (
    <div className="eventsItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
    </div>
  );
}

export default EventsItem;
