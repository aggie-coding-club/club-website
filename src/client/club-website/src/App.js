import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';

const centerdText = {
  position: "absolute",
  margin: 0,
  width: "100%",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 11,
  color: "#ffffff"
};

class App extends Component {
  render() {
    return (
      <div style={{backgroundColor: "#0288D1", position: "absolute", width: "100%", height: "100%", margin: "0"}} className="App">
        <header style={centerdText}>
          <h1 style={{fontSize: "4em", margin: 0}}> aggie coding club </h1>
          <p style={{fontSize: "2em", fontWeight : 900, margin: 0}}> Empowering texas a&m students to code </p>
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
          <h1 style={{fontSize: "4em"}}> what we do </h1>
        </div>

      </div>
    );
  }
}

export default App;
