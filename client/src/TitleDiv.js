import React, {Component} from 'react';

import Particles from 'react-particles-js';
import particles from './particlesjs-config.json';
import { fadeInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import ACC_Banner from './images/acc_banner.png';
import './TitleDiv.css';

const styles = {
  titleText: {
    animation: 'x 1.5s',
    animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
  },
  subtitleText: {
    animation: 'x 1.5s',
    animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
  }
};

class Title extends Component{
  render(){
    return(
      <div className="title-background">
        <img src={ACC_Banner} className="banner" alt="acc_logo"/>
        <a href="#" className="signUpBox">
          <h1 className="signUpText"> PROJECT SIGN UPS </h1>
        </a>
        <header className="centeredDiv">
          <StyleRoot>
            <h1 className="accHeader" style={styles.titleText}> aggie coding club </h1>
            <p className="subtitleText" style={styles.subtitleText}> empowering texas a&m students to code </p>
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
