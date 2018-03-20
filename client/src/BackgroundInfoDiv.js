import React, {Component} from 'react';
import { fadeInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import ScrollAnimation from "react-animate-on-scroll";

//Icon Imports
import FaCheck from 'react-icons/lib/fa/puzzle-piece';
import FaWrench from 'react-icons/lib/fa/wrench';
import FaComments from 'react-icons/lib/fa/comments';

//Material UI Imports
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

class BackgroundInfo extends Component {
    render() {
        return( 

            <div style={{ position: "relative", paddingBottom: "100px", alignItems: "center" }}>
                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                            <h1 className="header" style={styles.headerStyle}> what we do </h1>
                            <p style={{ fontSize: "2em", fontWeight: 500, color: "#0288D1", marginLeft: 50, marginRight: 50 }}> All it takes is an idea, a computer, and the willingness to build something amazing. </p>
                            <p style={{ fontSize: "1.25em", fontWeight: 500, maxWidth: "900px", left: "50%", transform: "translateX(-50%)", position: "relative", paddingLeft: 50, paddingRight: 50 }}> Here at Aggie Coding Club, we believe that anyone, any major, from any background can learn how to code. Coding doesn&#39;t take anything more than than the computer that you have for college, the text editor that comes with it, and yourself. All it takes is a great idea and the willingness to execute it.</p>
                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                                <div style={styles.column}>
                                    <FaCheck style={styles.largeIcon} />
                                    <h1 className="columnHeader" style={{ fontSize: "2.5em" }}> Projects </h1>
                                    <Chip className="chips" style={styles.topChip} label="Work on a 3-5 person team" />
                                    <Chip className="chips" style={styles.middleChip} label="Build an app, make a website, or even design a game" />
                                    <Chip className="chips" style={styles.bottomChip} label="Gain experience with new languages and frameworks" />
                                </div>
                                <div style={styles.column}>
                                    <FaWrench style={styles.largeIcon} />
                                    <h1 className="columnHeader" style={{ fontSize: "2.5em" }}> Workshops </h1>
                                    <Chip className="chips" style={styles.topChip} label="Learn new techologies from club members" />
                                    <Chip className="chips" style={styles.middleChip} label="Get exposed to coding concepts and Github version-control" />
                                    <Chip className="chips" style={styles.bottomChip} label="Acquire resume help and internship interview experience" />
                                </div>
                                <div style={styles.column}>
                                    <FaComments style={styles.largeIcon} />
                                    <h1 className="columnHeader" style={{ fontSize: "2.5em" }}> Company Talks </h1>
                                    <Chip className="chips" style={styles.topChip} label="Network with some of the top tech companies" />
                                    <Chip className="chips" style={styles.middleChip} label="Learn what managers want to hear in job interviews" />
                                    <Chip className="chips" style={styles.bottomChip} label="Talk with professionals who have experience in the industry" />
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>

            );
    }
} 
export default BackgroundInfo;