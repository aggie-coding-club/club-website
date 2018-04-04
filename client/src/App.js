import React, { Component } from 'react';
import './assets/App.css';

import ScrollAnimation from "react-animate-on-scroll";

//Component Imports
import SimpleMediaCard from './components/SimpleMediaCard.js';
import EventCard from './components/EventCard.js';
import ProjectCard from './components/ProjectCard';
import Title from './components/Title';
import CustomSnackbar from './components/CustomSnackbar';
import OfficerInfo from './components/OfficerInfo';
import Resource from './components/Resource';
import BackgroundInfo from './components/BackgroundInfo';
import Events from './components/Events';





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

    componentWillMount() {
        this.attachData();
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
              <CustomSnackbar open={this.state.open} handleClose={this.handleClose}/>
              <Title/>
              <BackgroundInfo/>
              <OfficerInfo/>
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
                <Resource/>
            </div>
        );
    }
}
export default App;
