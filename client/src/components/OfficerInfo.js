import React, {Component} from 'react';

//Picture-Img Imports
import Hannah from "../assets/images/hannah.jpg"
import Gabriel from '../assets/images/gabriel.jpg';
import Feras from '../assets/images/feras.jpg';
import Marissa from '../assets/images/marissa.jpg';
import Thomas from '../assets/images/thomas.jpg';
import Edgar from '../assets/images/edgar.jpg';

import {SimpleMediaCard} from './SimpleMediaCard.js';
import ScrollAnimation from "react-animate-on-scroll";

import '../assets/OfficerInfo.css';

//THE .headerStyle ISN'T UPDATING THE FONT SIZE CORRECTLY

class OfficerInfo extends Component{
    render(){
        return(
            <div strength={400} className="officer_background" style={{ backgroundColor: "#a7c0cd", color: "#ffffff", overflowY: "hidden" }}>
                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                            <h1 className="headerStyle"> who we are </h1>
                            <div style={{ paddingBottom: "100px" }}>
                                <SimpleMediaCard imgSrc={Hannah} firstName="Hannah" lastName="Gooden" major="Computer Science" classYear="'20" subtitle="President" />
                                <SimpleMediaCard imgSrc={Gabriel} firstName="Gabriel" lastName="Britain" major="Computer Science" classYear="'20" subtitle="Vice President" />
                                <SimpleMediaCard imgSrc={Feras} firstName="Feras" lastName="Khemakhem" major="Computer Science" classYear="'20" subtitle="Project Management Chair" />
                                <SimpleMediaCard imgSrc={Marissa} firstName="Marissa" lastName="Soria" major="Electronic Systems Engineering Technology" classYear="'20" subtitle="Events Chair" />
                                <SimpleMediaCard imgSrc={Thomas} firstName="Thomas" lastName="McDonald" major="Computer Science" classYear="'20" subtitle="Co-Workshops Chair" />
                                <SimpleMediaCard imgSrc={Edgar} firstName="Edgar" lastName="Martinez" major="Computer Science" classYear="'20" subtitle="Co-Workshops Chair" />
                            </div>
                        </ScrollAnimation>
                    </div>
        );
    }

}
export default OfficerInfo;
