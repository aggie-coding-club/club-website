import React, { Component } from 'react';
import './assets/App.css';
import "animate.css/animate.min.css";
import { fadeInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import ScrollAnimation from "react-animate-on-scroll";

//Component Imports
import SimpleMediaCard from './components/SimpleMediaCard.js';
import EventCard from './components/EventCard.js';
import ProjectCard from './components/ProjectCard.js';
import Title from './components/Title';
import Events from './components/Events';
import BackgroundInfo from './components/BackgroundInfo';

//Picture-Img Imports
import Rohit from "./assets/images/rohit.jpg";
import Liam from "./assets/images/liam.jpg";
import Colton from "./assets/images/colton.jpg";
import Hannah from "./assets/images/hannah.jpg"
import William from './assets/images/william.jpg';
import Marcus from './assets/images/marcus.jpg';
import Marissa from './assets/images/marissa.jpg';
import Simone from './assets/images/simone.jpg';
import Engineering from "./assets/images/hrbb.jpg";
import ACC_Banner from './assets/images/acc_banner.png';

//Icon Imports
import EmailIcon from 'material-ui-icons/Email';
import FaSlack from 'react-icons/lib/fa/slack';
import FaGithub from 'react-icons/lib/fa/github';
import FaGoogle from 'react-icons/lib/fa/google';
import FaCheck from 'react-icons/lib/fa/puzzle-piece';
import FaWrench from 'react-icons/lib/fa/wrench';
import FaComments from 'react-icons/lib/fa/comments';

//Material UI Imports
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';



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

class App extends Component {
    constructor(props) {
        super(props);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillMount() {
        this.attachData();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        if (this.state.width > 768) {
            var num_nb = Math.round(Math.sqrt(window.innerWidth * 15));
        } else {
            var num_nb = Math.round(Math.sqrt(window.innerWidth * 3));
        }
        this.setState({ particles: num_nb });
    }

    state = {
        projectsError: false,
        open: false,
        members: [],
        teams: [],
        repos: [],
        events: [],
        width: 0,
        height: 0,
        particles: 0,
    }

    showSettings(event) {
        event.preventDefault();
    }

    attachData() {
        fetch('/node/init').then((response) => {
            console.log(response);
            return response.json();
        }).then((json) => {
            this.setState({ teams: json.github.teams });
            this.setState({ repos: json.github.repos });
            this.setState({ events: json.events });
        }).catch((error) => {
            console.error(error);
            this.setState({ projectsError: true });
            this.setState({ open: true })
        });
    }

    handleClose = (event, reason) => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div className="App">
                <Snackbar
                    style={{ height: 30, width: 100 }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">There was a error pulling data from Github</span>}
                    action={[
                        <Button key="undo" color="accent" dense onClick={this.handleClose}>
                            DISMISS
              </Button>,
                    ]}
                />

                    <Title/>
                    <BackgroundInfo/>

                    {/*Officer Info*/}
                    <div strength={400} className="officer_background" style={{ backgroundColor: "#a7c0cd", color: "#ffffff", overflowY: "hidden" }}>
                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                            <h1 className="header" style={styles.headerStyle}> who we are </h1>
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

                    {/*Meeting Location Info*/}{/*
          <div style={{ backgroundColor: "#ffffff", overflow: "hidden" }}>
            <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
              <h1 style={styles.headerStyle}> where we are </h1>
              <div style={{marginBottom: 100, display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                <div style={{ position: "relative", width: 600, fontSize: "2em", color: "#500000", margin: 10, top: -45}}>
                  <h1> H.R Bright Building </h1>
                  <h2> Tuesdays at 8PM </h2>
                  <h2 style={{marginBottom: 0}}> Room 113 </h2>
                </div>
                <img alt="Engineering-Map" src={Engineering} style={{position: "relative", width: "700px", margin: 10, maxWidth: "90vw", border: "2px solid #000000"}} />
              </div>
            </ScrollAnimation>
          </div>*/}

                    <Events events={this.state.events}/>

                    {/*Projects Info*/}
                    {this.state.projectsError ? null :
                        <div className="projects_background" style={{ backgroundColor: "#757575", color: "#ffffff", overflowY: "hidden", height: "auto" }}>
                            <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                                <h1 className="header" style={styles.headerStyle}> what we&#39;re building </h1>
                            </ScrollAnimation>
                            <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={175}>
                                <div style={{ paddingBottom: "100px" }}>
                                    {this.state.teams.map(team =>
                                        <ProjectCard key={team.id} title={team.name} repo={team.repos} members={team.members} projectManager={team.projectManagers} />
                                    )}
                                </div>
                            </ScrollAnimation>
                        </div>}

                    {/*Resource Links*/}
                    <div style={{ backgroundColor: "#546E7A", color: "#ffffff", overflowY: "hidden", display: "flex", flexWrap: "wrap" }}>
                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={200}>
                            <h1 className="header" style={styles.headerStyle}> drop us a line </h1>
                            <div style={{ width: "auto", marginLeft: "40px", marginRight: "40px", paddingBottom: "100px", display: "inline-block" }}>
                                <h1 className="infoHeader" style={{ fontSize: "3em", fontWeight: 100 }}> email </h1>
                                <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#ffffff" }} href="mailto:aggiecodingclub@gmail.com"><EmailIcon style={{ width: 90, height: 90 }} /></a>
                                <h2 style={{ position: "relative", top: "50%", fontSize: "1.25em" }}> aggiecodingclub@gmail.com </h2>
                            </div>
                            <div style={{ width: "auto", marginLeft: "40px", marginRight: "40px", paddingBottom: "100px", display: "inline-block" }}>
                                <h1 className="infoHeader" style={{ fontSize: "3em", fontWeight: "100" }}> slack </h1>
                                <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#ffffff" }} href="https://aggie-coding-club.slack.com"><FaSlack style={{ width: 90, height: 90 }} /></a>
                                <h2 style={{ position: "relative", top: "50%", fontSize: "1.25em" }}> aggie-coding-club.slack.com </h2>
                            </div>
                            <div style={{ width: "auto", marginLeft: "40px", marginRight: "40px", paddingBottom: "100px", display: "inline-block" }}>
                                <h1 className="infoHeader" style={{ fontSize: "3em", fontWeight: 100 }}>github</h1>
                                <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#ffffff" }} href="https://github.com/aggie-coding-club"><FaGithub style={{ width: 90, height: 90 }} /></a>
                                <h2 style={{ position: "relative", top: "50%", fontSize: "1.25em" }}> github.com/aggie-coding-club </h2>
                            </div>
                            <div style={{ width: "auto", marginLeft: "40px", marginRight: "40px", paddingBottom: "100px", display: "inline-block" }}>
                                <h1 className="infoHeader" style={{ fontSize: "3em", fontWeight: 100 }}>google drive</h1>
                                <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#ffffff" }} href="https://tinyurl.com/ydhotylu"><FaGoogle style={{ width: 90, height: 90 }} /></a>
                                <h2 style={{ position: "relative", top: "50%", fontSize: "1.25em" }}> tinyurl.com/ydhotylu </h2>
                            </div>
                        </ScrollAnimation>
                        <div className="copyright">
                            <h4 style={{ color: "#ffffff", fontSize: "0.75em" }}>&#169; 2018 Jonathan Innis | Gabriel Britain </h4>
                        </div>
                    </div>
            </div>
        );
    }
}
export default App;