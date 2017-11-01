import React, { Component } from 'react';
import "animate.css/animate.min.css";
import './App.css';
import Particles from 'react-particles-js';
import { fadeInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import ScrollAnimation from "react-animate-on-scroll";
import { stack as Menu } from 'react-burger-menu';
import ComputerIcon from 'material-ui-icons/Computer';
import TextFormatIcon from 'material-ui-icons/TextFormat';
import PersonPinIcon from 'material-ui-icons/PersonPin';
import SimpleMediaCard from './SimpleMediaCard.js';
import Rohit from "./images/rohit.jpg";
import Liam from "./images/liam.jpg";
import Colton from "./images/colton.jpg";
import Computer from "./images/computer_edit.jpg";
import Logo from "./images/ACC-transparent.png";
import { Parallax } from 'react-parallax';

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
  },
  subtitleText: {
    fontSize: "2em",
    animation: 'x 1.5s',
    animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
    margin: 0,
  },
  headerStyle: {
    fontColor: "#ffffff",
    fontSize: "4em",
    marginTop: "100px"
  },
  linkStyle: {
    margin: "10px",
    color: "#ffffff",
    textDecoration: "none"
  },
  largeIcon: {
    width: 120,
    height: 120,
    marginLeft: "40px",
    marginRight: "40px",
  },
  card: {
    maxWidth: 345,
    height: 245,
  },
};

class App extends Component {

  showSettings (event) {
    event.preventDefault();
  }
  render() {

    return (
      <div className="App">
      <div  id="outer-container">
      <Menu width={"220px"} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } >
          <a style={styles.linkStyle} id="home" className="menu-item" href="/">Home</a>
          <a style={styles.linkStyle} id="about" className="menu-item" href="/about">About</a>
          <a style={styles.linkStyle} id="contact" className="menu-item" href="/contact">Contact</a>
          <a style={styles.linkStyle} onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
      <main id="page-wrap">
        <div style={{backgroundColor: "#0288D1", height: "100vh"}}>
          <img src={Logo} style={{position: "absolute", left: "15px", top: "15px", width: "125px"}} alt="ACCLogo"/>
          <a href="#" style={{width: "auto", height: "40px", position: "absolute", right: "20px", top: "20px", border: "#ffffff solid 1px", textDecoration: "none"}} className="signUpBox">
            <h1 className="signUpText" style={{marginLeft: "20px", marginRight: "20px", fontSize: "1em"}}> PROJECT SIGN UPS </h1>
          </a>
          <header style={styles.centeredDiv}>
            <StyleRoot>
            <h1 style={styles.titleText}> aggie coding club </h1>
            <p style={styles.subtitleText}> empowering texas a&m students to code </p>
            </StyleRoot>
          </header>
          <Particles
          params={{
            particles: {
              number: {
                value: 175,
                density: {
                  enable: false,
                  value_area: 961.4383117143238
                }
              },
              color: {
                value: "#ffffff"
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#000000"
                },
                polygon: {
                  nb_sides: 5
                },
                image: {
                  src: "img/github.svg",
                  height: 100,
                  width: 100
                }
              },
              opacity: {
                value: 0.5,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false
                }
              },
              size: {
                value: 4,
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false
                }
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
              },
              move: {
                enable: true,
                speed: 5,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200
                }
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: false,
                  mode: "repulse"
                },
                onclick: {
                  enable: true,
                  mode: "push"
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 400,
                  line_linked: {
                    opacity: 1
                  }
                },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3
                },
                repulse: {
                  distance: 200,
                  duration: 0.4
                },
                push: {
                  particles_nb: 4
                },
                remove: {
                  particles_nb: 2
                }
              }
            },
            retina_detect: true
          }}
          />
          </div>
          <div style={{position: "relative",   paddingBottom: "200px", alignItems: "center"}}>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
              <h1 style={styles.headerStyle}> what we do </h1>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={300}>
              <ComputerIcon style={styles.largeIcon}/>
              <TextFormatIcon style={styles.largeIcon}/>
              <PersonPinIcon style={styles.largeIcon}/>
              <p style={{fontSize: "2em", fontWeight: 500, color: "#0288D1"}}> All you need is a computer, a text editor, and yourself. </p>
              <p style={{fontSize: "1em", fontWeight: 500, maxWidth: "700px", left: "50%", transform: "translateX(-50%)", position: "relative"}}> Here at the Aggie Coding Club, we believe that anyone, any major, from any background can learn how to code. Coding doesn''t taken anything more than than the computer that you have for college, the text editor that comes with it, and yourself. </p>
            </ScrollAnimation>
          </div>
          <Parallax bgImage={Computer} strength={400} style={{backgroundColor: "#757575", color: "#ffffff", overflowY: "hidden"}}>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
              <h1 className="whiteHeader" style={styles.headerStyle}> who we are </h1>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={175}>
              <div style={{paddingTop:"50px", paddingBottom: "100px"}}>
                <SimpleMediaCard imgSrc={Rohit} title="Rohit Muchlera" subtitle="Club President" description="Sometimes I will just type and type and d when I do type I just keep typing until I can't stop typing and when I do stop typing it is when I feel like it"/>
                <SimpleMediaCard imgSrc={Rohit} title="Rohit Muchlera" subtitle="Club President" description="Sometimes I will just type and type and d when I do type I just keep typing until I can't stop typing and when I do stop typing it is when I feel like it"/>
                <SimpleMediaCard imgSrc={Liam} title="Colton Weaver" subtitle="Vice President" description="Sometimes I will just type and type and d when I do type I just keep typing until I can't stop typing and when I do stop typing it is when I feel like it"/>
                <SimpleMediaCard imgSrc={Colton} title="Liam Moran" subtitle="Projects Chair" description="Sometimes I will just type and type and d when I do type I just keep typing until I can't stop typing and when I do stop typing it is when I feel like it"/>
                <SimpleMediaCard imgSrc={Rohit} title="Rohit Muchlera" subtitle="Club President" description="Sometimes I will just type and type and d when I do type I just keep typing until I can't stop typing and when I do stop typing it is when I feel like it"/>
                <SimpleMediaCard imgSrc={Rohit} title="Rohit Muchlera" subtitle="Club President" description="Sometimes I will just type and type and d when I do type I just keep typing until I can't stop typing and when I do stop typing it is when I feel like it"/>
                <SimpleMediaCard imgSrc={Liam} title="Colton Weaver" subtitle="Vice President" description="Sometimes I will just type and type and d when I do type I just keep typing until I can't stop typing and when I do stop typing it is when I feel like it"/>
                <SimpleMediaCard imgSrc={Colton} title="Liam Moran" subtitle="Projects Chair" description="Sometimes I will just type and type and d when I do type I just keep typing until I can't stop typing and when I do stop typing it is when I feel like it"/>
              </div>
            </ScrollAnimation>
          </Parallax>
          <div style={{backgroundColor: "#ffffff", overflowY: "hidden"}}>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
              <h1 style={styles.headerStyle}> where we are </h1>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={175}>
              <div style={{paddingTop:"50px", paddingBottom: "200px"}}>
                <SimpleMediaCard imgSrc={Rohit} title="Rohit Muchlera" subtitle="Club President" description="Sometimes I will just type and type and d when I do type I just keep typing until I can't stop typing and when I do stop typing it is when I feel like it"/>
                <SimpleMediaCard imgSrc={Rohit} title="Rohit Muchlera" subtitle="Club President" description="Sometimes I will just type and type and d when I do type I just keep typing until I can't stop typing and when I do stop typing it is when I feel like it"/>
                <SimpleMediaCard imgSrc={Liam} title="Colton Weaver" subtitle="Vice President" description="Sometimes I will just type and type and d when I do type I just keep typing until I can't stop typing and when I do stop typing it is when I feel like it"/>
                <SimpleMediaCard imgSrc={Colton} title="Liam Moran" subtitle="Projects Chair" description="Sometimes I will just type and type and d when I do type I just keep typing until I can't stop typing and when I do stop typing it is when I feel like it"/>
              </div>
            </ScrollAnimation>
          </div>
      </main>
      </div>
      </div>
    );
  }
}
export default App;
