import React, { useEffect, useRef, useState } from 'react';
import '../styles/EventDetails.css';
import DetailsThumb from '../components/DetailsThumb';
import axios from 'axios';
import { useParams } from "react-router-dom";
import defImage from '../assets/homes.jpg'

const EventDetails = () => {

  let params = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [indexx, setIndex] = useState(0);
  const defImages = useState([defImage]);

  const myRef = useRef();

  const handleTab = index => {
    setIndex(index);
    const xx = myRef.current.children;
    for (let i = 0; i < xx.length; i++) {
      xx[i].className = xx[i].className.replace("active", "");
    }
    xx[index].className = "active";
  };

  useEffect(() => {
    const id = params.event;
    fetchData(id);
  }, []);

  const fetchData = async (id) => {

    await axios
      .get("http://local.backend-dev/api/getAllPosts")
      .then((response) => {
        response.data.data.forEach((post) => {
          if (post.id === parseInt(id)) {
            setName(post.name)
            setDescription(post.description)
            let array = [];
            post.post_attachments.forEach((img) => {
              array.push(img.attachment);
            });
            setImages(array)
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    
    <div className="app">
      <div className="details" >
        <div className="big-img">
          <img src={images.length !== 0 ? images[indexx] : defImage} alt="" />
        </div>

        <div className="box">
          <div className="row">
            <h2>{name}</h2>
          </div>


          <p>{description}</p>

          <DetailsThumb images={images.length !== 0? images: defImages} tab={handleTab} myRef={myRef} />

        </div>
      </div>
    </div>
  );

}

export default EventDetails;
