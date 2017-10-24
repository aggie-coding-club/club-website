import React, { Component } from 'react';
import "animate.css/animate.min.css";
import './App.css';
import Particles from 'react-particles-js';
import { fadeInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import ScrollAnimation from "react-animate-on-scroll";

const styles = {
  centeredDiv: {
    position: "absolute",
    margin: 0,
    width: "100%",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 11,
    color: "#ffffff"
  },
  titleText: {
    fontSize: "5em",
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
    fontSize: "3em",
  }
};

class App extends Component {

  render() {

    return (
      <div style={{backgroundColor: "#0288D1", position: "absolute", width: "100%", height: "100%", margin: "0"}} className="App">
        <header style={styles.centeredDiv}>
          <StyleRoot>
          <h1 style={styles.titleText}> aggie coding club </h1>
          <p style={styles.subtitleText}> Empowering texas a&m students to code </p>
          </StyleRoot>
        </header>
        <Particles
        params={{
          particles: {
            number: {
              value: 100,
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
                width: 100,
                height: 100
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
        <div style={{height: "100%", width: "100%"}}>
        <ScrollAnimation animateIn="fadeInUp" animateOnce="true">
          <h1 style={styles.headerStyle}> what we do </h1>
        </ScrollAnimation>
        </div>
        <div style={{height: "100%", width: "100%", padding: "20px", backgroundColor: "#0288D1", color: "#ffffff"}}>
        <ScrollAnimation animateIn="fadeInUp" animateOnce="true">
          <h1 style={styles.headerStyle}> who we are </h1>
        </ScrollAnimation>
        </div>

      </div>
    );
  }
}

export default App;
