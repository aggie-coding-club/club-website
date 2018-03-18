import React, {Component} from 'react';

import Particles from 'react-particles-js';
import particles from './particlesjs-config.json';
import { fadeInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import ACC_Banner from './images/acc_banner.png';
import styles from './TitleDiv.css';

/*const styles = {
    centeredDiv: { //yes
        position: "absolute",
        margin: 0,
        width: "100%",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
        color: "#ffffff",
    },
    titleText: { //yes
        fontSize: "6em",
        animation: 'x 1.5s',
        animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
        margin: 0,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        lineHeight: 1,
    },
    subtitleText: { //yes
        fontSize: "2em",
        animation: 'x 1.5s',
        animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
        margin: 0,
        marginLeft: 20,
        marginRight: 20,
        lineHeight: 1,
    }
};*/

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