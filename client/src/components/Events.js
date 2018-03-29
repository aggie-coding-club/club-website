import React from 'react';
import EventCard from './EventCard.js';
import ScrollAnimation from "react-animate-on-scroll";

const styles = {
    headerStyle: {
        fontColor: "#ffffff",
        fontSize: "4.5em",
        marginTop: "100px",
        marginBottom: "75px",
        marginLeft: 20,
        marginRight: 20,
        lineHeight: 1,
    }
};

export default class Events extends React.Component{
  render(){
    return (
      <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
        <div style={{ position: "relative", paddingBottom: "100px" }}>
            <h1 className="header" style={styles.headerStyle}> events coming up next </h1>
            {
                this.props.events ?
                    this.props.events.map((event) => {
                        console.log(event);
                        const startDate = new Date(event.start.dateTime);
                        const endDate = new Date(event.end.dateTime);
                        const options = {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        }
                        const duration = `${startDate.toLocaleTimeString('en-US', options)} - ${endDate.toLocaleTimeString('en-US', options)}`;
                        return <EventCard title={event.summary} location={event.location} date={startDate.toLocaleDateString('en-US')} time={duration} description={event.description}/>
                    })
                    : null
            }
            {/*<EventCard title="ACC Kickoff Meeting" location="Koldus 110" date="01/29/2018" time="6-7 PM" description="" />}
            */}
        </div>
      </ScrollAnimation>
    );
  }
}
