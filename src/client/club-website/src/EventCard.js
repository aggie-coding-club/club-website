import React, {Component} from 'react';

class EventCard extends Component{
  render(){
    return(
      <div className="card">
        <div className="content">
          <div style={{fontSize: "2em"}} className="front">
            <p className="contentWidth" style={{width: 260, paddingLeft: 20, paddingRight: 20, paddingTop: 30, fontWeight: 700, margin: 0}}> {this.props.title} </p>
            <p className="contentWidth" style={{width: 260, paddingLeft: 20, paddingRight: 20, margin: 0, fontSize: "0.65em"}}> {this.props.location} </p>
            <div style={{position: "absolute", bottom: 30, height: "auto"}}>
              <p className="contentWidth" style={{width: 260, paddingLeft: 20, paddingRight: 20, paddingTop: 30, margin: 0}}> {this.props.date} </p>
              <p className="contentWidth" style={{width: 260, paddingLeft: 20, paddingRight: 20, margin: 0, fontSize: "0.6em"}}> {this.props.time} </p>
            </div>
          </div>
          <div style={{fontSize: "2em"}} className="back">
            <p style={{position: "absolute", fontSize: "0.6em"}}> {this.props.description} </p>
          </div>
        </div>
      </div>
    );
  }
}

export default EventCard;
