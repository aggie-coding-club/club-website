import React, { Component } from 'react';
import './App.css';
import "animate.css/animate.min.css";
import Particles from 'react-particles-js';
import { fadeInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import ScrollAnimation from "react-animate-on-scroll";
import EmailIcon from 'material-ui-icons/Email';
import SimpleMediaCard from './SimpleMediaCard.js';
import ProjectCard from './ProjectCard.js';
import Rohit from "./images/rohit.jpg";
import Liam from "./images/liam.jpg";
import Colton from "./images/colton.jpg";
import Hannah from "./images/hannah.jpg"
import William from './images/william.jpg';
import Marcus from './images/marcus.jpg';
import Marissa from './images/marissa.jpg';
import Simone from './images/simone.jpg';
import Material from './images/material.jpg';
import Engineering from "./images/hrbb.jpg";
import {Parallax} from 'react-parallax';
import ACC_Banner from './images/acc_banner.png';
import FaSlack from 'react-icons/lib/fa/slack';
import FaGithub from 'react-icons/lib/fa/github';
import FaGoogle from 'react-icons/lib/fa/google';
import FaCheck from 'react-icons/lib/fa/puzzle-piece';
import FaWrench from 'react-icons/lib/fa/wrench';
import FaComments from 'react-icons/lib/fa/comments';
import Chip from 'material-ui/Chip';



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
    fontSize: "4.5em",
    marginTop: "100px",
    marginBottom: "100px"
  },
  introHeaderStyle: {
    fontColor: "#ffffff",
    fontSize: "4.5em",
    marginTop: "100px",
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
  column:{
    marginTop: 50,
    width: "500px",
    display: "inline-block",
  },
  topChip:{
    position: "relative",
    fontFamily: "Raleway",
    left: "50%",
    transform: "translateX(-50%)",
    marginBottom: 10,
    backgroundColor: "#0288D1",
    color: "#ffffff",
  },
  middleChip:{
    position: "relative",
    fontFamily: "Raleway",
    left: "50%",
    transform: "translateX(-50%)",
    marginBottom: 10,
    backgroundColor: "#03a9f4",
    color: "#ffffff",
  },
  bottomChip:{
    position: "relative",
    fontFamily: "Raleway",
    left: "50%",
    transform: "translateX(-50%)",
    marginBottom: 10,
    backgroundColor: "#29b6f6",
    color: "#ffffff",
  }
};

class App extends Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {

    return (
      <div className="App">
        <main id="page-wrap">
          <div style={{ backgroundColor: "#0288D1", height: "100vh" }}>
            <img src={ACC_Banner} className="banner" alt="acc_logo" style={{ position: "absolute", left: "30px", top: "-80px", width: "130px" }} />
            <a href="#" style={{ width: "auto", height: "40px", position: "absolute", right: "20px", top: "20px", border: "#ffffff solid 1px", textDecoration: "none" }} className="signUpBox">
              <h1 className="signUpText" style={{ marginLeft: "20px", marginRight: "20px", fontSize: "1em" }}> PROJECT SIGN UPS </h1>
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
          <div style={{ position: "relative", paddingBottom: "200px", alignItems: "center" }}>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
              <h1 style={styles.introHeaderStyle}> what we do </h1>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
              <p style={{ fontSize: "2em", fontWeight: 500, color: "#0288D1" }}> All it takes is an idea, a computer, and the willingness to build something amazing. </p>
              <p style={{ fontSize: "1.25em", fontWeight: 500, maxWidth: "800px", left: "50%", transform: "translateX(-50%)", position: "relative" }}> Here at the Aggie Coding Club, we believe that anyone, any major, from any background can learn how to code. Coding doesn''t taken anything more than than the computer that you have for college, the text editor that comes with it, and yourself. All it takes is a great idea and the willingness to execute it.</p>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
              <div style={styles.column}>
                <FaCheck style={styles.largeIcon}/>
                <h1 style={{fontSize: "2.5em"}}> Projects </h1>
                <Chip style={styles.topChip} label="Work on a 3-5 person team"/>
                <Chip style={styles.middleChip} label="Build an app, make a webiste, or even design a game"/>
                <Chip style={styles.bottomChip} label="Gain experience with new languages and frameworks"/>
              </div>
              <div style={styles.column}>
                <FaWrench style={styles.largeIcon}/>
                <h1 style={{fontSize: "2.5em"}}> Workshops </h1>
                <Chip style={styles.topChip} label="Learn new techologies from club members"/>
                <Chip style={styles.middleChip} label="Get exposed to coding concepts and Github version-control"/>
                <Chip style={styles.bottomChip} label="Acquire resume help and internship interview experience"/>
              </div>
              <div style={styles.column}>
                <FaComments style={styles.largeIcon}/>
                <h1 style={{fontSize: "2.5em"}}> Company Talks </h1>
                <Chip style={styles.topChip} label="Network with some of the top tech companies"/>
                <Chip style={styles.middleChip} label="Learn what managers want to hear in job interviews"/>
                <Chip style={styles.bottomChip} label="Talk with professional who have experience in the industry"/>
              </div>
            </ScrollAnimation>
          </div>
          <Parallax bgImage={Material} strength={400} style={{ backgroundColor: "#757575", color: "#ffffff", overflowY: "hidden" }}>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
              <h1 className="whiteHeader" style={styles.headerStyle}> who we are </h1>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={175}>
              <div style={{ paddingBottom: "100px" }}>
                <SimpleMediaCard imgSrc={Rohit} firstName="Rohit" lastName="Muchlera" major="Computer Science" classYear="18" subtitle="Club President" />
                <SimpleMediaCard imgSrc={Colton} firstName="Colton" lastName="Weaver" major="Electrical Engineering" classYear="18" subtitle="Vice President" />
                <SimpleMediaCard imgSrc={Liam} firstName="Liam" lastName="Moran" major="Computer Science" classYear="18" subtitle="Project Management Chair" />
                <SimpleMediaCard imgSrc={William} firstName="William" lastName="O'Rosky" major="Computer Engineering" classYear="18" subtitle="Workshops Chair" />
                <SimpleMediaCard imgSrc={Marcus} firstName="Marcus" lastName="Heinonen" major="Computer Science" classYear="18" subtitle="Events Chair" />
                <SimpleMediaCard imgSrc={Hannah} firstName="Hannah" lastName="Gooden" major="Computer Science" classYear="21" subtitle="Recruitment Chair" />
                <SimpleMediaCard imgSrc={Marissa} firstName="Marissa" lastName="Soira" major="Computer Science" classYear="20" subtitle="Social Chair" />
                <SimpleMediaCard imgSrc={Simone} firstName="Simone" lastName="Serrano" major="MIS" classYear="19" subtitle="Marketing Chair" />
              </div>
            </ScrollAnimation>
          </Parallax>
          <div style={{ backgroundColor: "#ffffff", overflowY: "hidden" }}>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
              <h1 style={styles.headerStyle}> where we are </h1>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
              <div style={{ width: "auto", display: "inline-block", fontSize: "1.5vw", color: "#500000", paddingTop: "50px" }}>
                <h1> H.R Bright Building </h1>
                <h2> Every Tuesday 8PM </h2>
                <h2> Room #113 </h2>
              </div>
              <img alt="Engineering-Map" src={Engineering} style={{ float: "right", display: "inline-block", width: "50%", marginRight: "5%", marginBottom: "150px", border: "2px solid #000000" }} />
            </ScrollAnimation>
          </div>
          <Parallax bgImage={Material} strength={400} style={{ backgroundColor: "#757575", color: "#ffffff", overflowY: "hidden", height: "auto" }}>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
              <h1 className="whiteHeader" style={styles.headerStyle}> what we're building </h1>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={175}>
              <div style={{ paddingBottom: "100px" }}>
                <ProjectCard style={{display:"inline-block"}}/>
              </div>
            </ScrollAnimation>
          </Parallax>
          <div style={{ backgroundColor: "#546E7A", color: "#ffffff", overflowY: "hidden" }}>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
              <h1 className="whiteHeader" style={{ fontSize: "4.5em", marginTop: "100px" }}> drop us a line </h1>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={100}>
              <div style={{ width: "auto", marginLeft: "40px", marginRight: "40px", paddingBottom: "100px", display: "inline-block" }}>
                <h1 style={{ fontSize: "3em", fontWeight: 100 }}> email </h1>
                <EmailIcon style={{ width: 90, height: 90 }} />
                <h2 style={{ position: "relative", top: "50%", fontSize: "1.25em" }}> aggiecodingclub@gmail.com </h2>
              </div>
              <div style={{ width: "auto", marginLeft: "40px", marginRight: "40px", paddingBottom: "100px", display: "inline-block" }}>
                <h1 style={{ fontSize: "3em", fontWeight: "100" }}> slack </h1>
                <FaSlack style={{ width: 90, height: 90 }} />
                <h2 style={{ position: "relative", top: "50%", fontSize: "1.25em" }}> aggie-coding-club.slack.com </h2>
              </div>
              <div style={{ width: "auto", marginLeft: "40px", marginRight: "40px", paddingBottom: "100px", display: "inline-block" }}>
                <h1 style={{ fontSize: "3em", fontWeight: 100 }}>github</h1>
                <FaGithub style={{ width: 90, height: 90 }} />
                <h2 style={{ position: "relative", top: "50%", fontSize: "1.25em" }}> github.com/aggie-coding-club </h2>
              </div>
              <div style={{ width: "auto", marginLeft: "40px", marginRight: "40px", paddingBottom: "100px", display: "inline-block" }}>
                <h1 style={{ fontSize: "3em", fontWeight: 100 }}>google drive</h1>
                <FaGoogle style={{ width: 90, height: 90 }} />
                <h2 style={{ position: "relative", top: "50%", fontSize: "1.25em" }}> tinyurl.com/ydhotylu </h2>
              </div>
            </ScrollAnimation>
            <div className="copyright">
              <h4 style={{ color: "#ffffff" }}>&#169; copyright Jonathan Innis </h4>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
export default App;
