import React, {Component} from 'react';

//Picture-Img Imports
import Rohit from "./images/rohit.jpg";
import Liam from "./images/liam.jpg";
import Colton from "./images/colton.jpg";
import Hannah from "./images/hannah.jpg"
import William from './images/william.jpg';
import Marcus from './images/marcus.jpg';
import Marissa from './images/marissa.jpg';
import Simone from './images/simone.jpg';

import SimpleMediaCard from './SimpleMediaCard.js';
import ScrollAnimation from "react-animate-on-scroll";

import './OfficerInfo.css';

//THE .headerStyle ISN'T UPDATING THE FONT SIZE CORRECTLY

class OfficerInfo extends Component{
    render(){
        return(
            <div strength={400} className="officer_background" style={{ backgroundColor: "#a7c0cd", color: "#ffffff", overflowY: "hidden" }}>
                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                            <h1 className="headerStyle"> who we are </h1>
                            <div style={{ paddingBottom: "100px" }}>
                                <SimpleMediaCard imgSrc={Rohit} firstName="Rohit" lastName="Muchlera" major="Computer Science" classYear="'18" subtitle="Club President" />
                                <SimpleMediaCard imgSrc={Colton} firstName="Colton" lastName="Weaver" major="Electrical Engineering" classYear="'18" subtitle="Vice President" />
                                <SimpleMediaCard imgSrc={Liam} firstName="Liam" lastName="Moran" major="Computer Science" classYear="'18" subtitle="Project Management Chair" />
                                <SimpleMediaCard imgSrc={William} firstName="William" lastName="O'Rosky" major="Computer Engineering" classYear="'18" subtitle="Workshops Chair" />
                                <SimpleMediaCard imgSrc={Marcus} firstName="Marcus" lastName="Heinonen" major="Computer Science" classYear="'18" subtitle="Events Chair" />
                                <SimpleMediaCard imgSrc={Hannah} firstName="Hannah" lastName="Gooden" major="Computer Science" classYear="'20" subtitle="Recruitment Chair" />
                                <SimpleMediaCard imgSrc={Marissa} firstName="Marissa" lastName="Soira" major="Computer Science" classYear="'20" subtitle="Social Chair" />
                                <SimpleMediaCard imgSrc={Simone} firstName="Simone" lastName="Serrano" major="MIS" classYear="'19" subtitle="Marketing Chair" />
                            </div>
                        </ScrollAnimation>
                    </div>
        );
    }

}
export default OfficerInfo;