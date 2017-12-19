import React, {Component} from 'react';

class EventCard extends Component{
  render(){
    return(
      <div className="card">
        <div className="content">
          <div style={{fontSize: "2em"}} className="front">
            <p style={{width: 260, padding: 20, fontWeight: 700}}> Facebook Talk </p>
            <p style={{width: 260, padding: 20, bottom: 20}}> 02/17/2018 </p>
          </div>
          <div style={{fontSize: "2em"}} className="back">
            Back!
          </div>
        </div>
      </div>
    );
  }
}

export default EventCard;
