import React, {Component} from 'react';

import Particles from 'react-particles-js';
import particles from './particlesjs-config.json';
import { fadeInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import ACC_Banner from './images/acc_banner.png';

const styles = {
    centeredDiv: {
        position: "absolute",
        margin: 0,
        width: "100%",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
        color: "#ffffff",
    },
    titleText: {
        fontSize: "6em",
        animation: 'x 1.5s',
        animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
        margin: 0,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        lineHeight: 1,
    },
    subtitleText: {
        fontSize: "2em",
        animation: 'x 1.5s',
        animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
        margin: 0,
        marginLeft: 20,
        marginRight: 20,
        lineHeight: 1,
    },
    headerStyle: {
        fontColor: "#ffffff",
        fontSize: "4.5em",
        marginTop: "100px",
        marginBottom: "75px",
        marginLeft: 20,
        marginRight: 20,
        lineHeight: 1,
    },
    linkStyle: {
        margin: "10px",
        color: "#ffffff",
        textDecoration: "none"
    },
    largeIcon: {
        width: 100,
        height: 100,
        marginLeft: 40,
        marginRight: 40,
        verticalAlign: "top",
    },
    card: {
        maxWidth: 345,
        height: 245,
    },
    column: {
        marginTop: 50,
        width: 400,
        display: "inline-block",
        margin: 10,
    },
    topChip: {
        position: "relative",
        fontFamily: "Raleway",
        left: "50%",
        transform: "translateX(-50%)",
        marginBottom: 10,
        backgroundColor: "#0288D1",
        color: "#ffffff",
    },
    middleChip: {
        position: "relative",
        fontFamily: "Raleway",
        left: "50%",
        transform: "translateX(-50%)",
        marginBottom: 10,
        backgroundColor: "#03a9f4",
        color: "#ffffff",
    },
    bottomChip: {
        position: "relative",
        fontFamily: "Raleway",
        left: "50%",
        transform: "translateX(-50%)",
        marginBottom: 10,
        backgroundColor: "#29b6f6",
        color: "#ffffff",
    }
};

class Title extends Component{
  render(){
	  return(
                    <div className="title-background" style={{height: "100vh" }}>
                        <img src={ACC_Banner} className="banner" alt="acc_logo" style={{ position: "absolute", left: "30px", top: 0, minWidth: 80, width: "10%" }} />
                        <a href="#" style={{ width: "auto", height: "40px", position: "absolute", right: "20px", top: "20px", border: "#ffffff solid 1px", textDecoration: "none" }} className="signUpBox">
                            <h1 className="signUpText" style={{ marginLeft: "20px", marginRight: "20px", fontSize: "1em" }}> PROJECT SIGN UPS </h1>
                        </a>
                        <header style={styles.centeredDiv}>
                            <StyleRoot>
                                <h1 className="acc_header" style={styles.titleText}> aggie coding club </h1>
                                <p className="subtitle" style={styles.subtitleText}> empowering texas a&m students to code </p>
                            </StyleRoot>
                        </header>
                        <Particles
                            params={particles}
                        />
                    </div>
	  );
  }
}
export default Title;