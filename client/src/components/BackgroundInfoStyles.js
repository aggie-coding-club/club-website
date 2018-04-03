import { fadeInUp } from 'react-animations';
import Radium from 'radium';

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
    },
    mottoIdea: { 
        fontSize: "2em", 
        fontWeight: 500, 
        color: "#0288D1", 
        marginLeft: 50, 
        marginRight: 50, 
    },
    description: { 
        fontSize: "1.25em", 
        fontWeight: 500, 
        maxWidth: "900px", 
        left: "50%", 
        transform: "translateX(-50%)", 
        position: "relative", 
        paddingLeft: 50, 
        paddingRight: 50, 
    },
    backgroundDivMain: {
        position: "relative", 
        paddingBottom: "100px", 
        alignItems: "center",

    }
};
export default styles; 