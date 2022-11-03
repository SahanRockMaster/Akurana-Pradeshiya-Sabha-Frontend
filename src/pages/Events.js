import React, { useEffect,useState } from "react";
import { EventsList } from "../helpers/EventsList";
import EventsItem from "../components/EventsItem";
import "../styles/Events.css";
import axios from "axios";
import Homes from "../assets/homes.jpg";


function Events() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    fetchData(token);
  }, []);

  const fetchData = async (token) => {
    await axios
      .get("http://local.backend-dev/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log();
        setPost(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="events">
      <h1 className="ebventsTitle">Events</h1>
      <div className="eventsList">
        {posts.map((post) => {
          return (
            <EventsItem
              key={post.id}
              image={post.post_attachments.length === 0? Homes: post.post_attachments[0].attachment}
              name={post.name}
            
            />
          );
        })}
      </div>
    </div>
  );
}

export default Events;
