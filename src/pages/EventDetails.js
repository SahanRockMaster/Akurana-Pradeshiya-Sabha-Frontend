import React from 'react';
import '../styles/EventDetails.css';
import DetailsThumb from '../components/DetailsThumb';

class EventDetails extends React.Component{

  state = {
    products: [
      {
        "_id": "1",
        "title": "Sharamadana",
        "src": [
            "https://plus.unsplash.com/premium_photo-1665655617505-fbde940ee529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1797&q=80",
            "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
            "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=973&q=80",
            "https://media.istockphoto.com/id/1354192776/photo/shot-of-two-technicians-working-together-in-a-server-room.jpg?s=612x612&w=is&k=20&c=eYJDWHVMrBw6XnIdmmdT4epo77i9hDKZk9x5oKmVNqY=",
            "https://media.istockphoto.com/id/1354192776/photo/shot-of-two-technicians-working-together-in-a-server-room.jpg?s=612x612&w=is&k=20&c=eYJDWHVMrBw6XnIdmmdT4epo77i9hDKZk9x5oKmVNqY="
          ],
        "description": "Welcome to our Akurana pradeshiya sabha shramadana event. Here you can come and join with the event.",
        "count": 1
      }
    ],
    index: 0
  };

  myRef = React.createRef();

  handleTab = index =>{
    this.setState({index: index})
    const images = this.myRef.current.children;
    for(let i=0; i<images.length; i++){
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  componentDidMount(){
    const {index} = this.state;
    this.myRef.current.children[index].className = "active";
  }


  render(){
    const {products, index} = this.state;
    return(
      <div className="app">
        {
          products.map(item =>(
            <div className="details" key={item._id}>
              <div className="big-img">
                <img src={item.src[index]} alt=""/>
              </div>

              <div className="box">
                <div className="row">
                  <h2>{item.title}</h2>
                </div>
            

                <p>{item.description}</p>
                <p>{item.content}</p>

                <DetailsThumb images={item.src} tab={this.handleTab} myRef={this.myRef} />

              </div>
            </div>
          ))
        }
      </div>
    );
  };
}

export default EventDetails;
