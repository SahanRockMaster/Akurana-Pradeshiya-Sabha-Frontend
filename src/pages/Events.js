import React from 'react';
import { EventsList } from '../helpers/EventsList';
import EventsItem from '../components/EventsItem';
import '../styles/Events.css';

function Events() {
  return (
    <div className="events">
      <h1 className="ebventsTitle">Events</h1>
      <div className="eventsList">
        {EventsList.map((eventsItem, key) => {
          return (
            <EventsItem
              key={key}
              image={eventsItem.image}
              name={eventsItem.name}
              price={eventsItem.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Events;
