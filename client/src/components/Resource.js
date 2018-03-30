import React from 'react';
import ScrollAnimation from "react-animate-on-scroll";

//Icon Imports
import EmailIcon from 'material-ui-icons/Email';
import FaSlack from 'react-icons/lib/fa/slack';
import FaGithub from 'react-icons/lib/fa/github';
import FaGoogle from 'react-icons/lib/fa/google';

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

export default class Resource extends React.Component{
  render(){
    return(
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
    );
  }
}
