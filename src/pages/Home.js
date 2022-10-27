import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/aps.jpeg";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> Akurana </h1>
          <h1>Pradeshiya Sabha </h1>
        <p> Welcome to Akurana pradeshiya sabha website</p>
        <Link to="/home">
          <button> Explore More </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
