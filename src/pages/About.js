import React from "react";
import MultiplePizzas from "../assets/apsabout.jpg";
import "../styles/About.css";
function About() {
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${MultiplePizzas})` }}
      ></div>
        <h1 className="abouth1"> ABOUT US</h1>
      <div class="row">
  <div class="column1" >
  <p> <h3>
  Situated in the central province of Sri Lanka, Akurana is the island's central. 
  Diverse and vibrant, the city is the administrative and economic center of the country. 
  Colombo is Sri Lanka's largest city, home to around a million people is also one of the 
  busiest ports in the South Asia. Colombo was the capital for over two hundred years until 
  the capital was shifted to nearby Kandy, but remains the hub and heart of the city.
        
  </h3> </p>
  </div>
  <div class="column2">
  <p> <h3>
  The vision of the Democratic Socialist Republic of Sri Lanka is to be the wonder of Asia by 
  2015 and concurrent to this vision our vision is to make Homagama a people-friendly township 
  replete with modern amenities. Our mission is to strengthen and uplift all facilities connected 
  with the welfare of people by executing public services in maintaining health services, thoroughfares 
  and environmental cleanliness in the area of authority of the Pradeshiya Sabha
        
       </h3> </p>
  </div>
</div>     
      </div>
  );
}

export default About;
