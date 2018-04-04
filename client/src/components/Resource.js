import React from 'react';
import ScrollAnimation from "react-animate-on-scroll";

//Icon Imports
import EmailIcon from 'material-ui-icons/Email';
import FaSlack from 'react-icons/lib/fa/slack';
import FaGithub from 'react-icons/lib/fa/github';
import FaGoogle from 'react-icons/lib/fa/google';

import '../assets/Resource.css';

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
      <div className="background">
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={200}>
              <h1 className="header"> drop us a line </h1>
              <div className="column">
                  <h1 className="infoHeader"> email </h1>
                  <a target="_blank" rel="noopener noreferrer" className="link" href="mailto:aggiecodingclub@gmail.com"><EmailIcon style={{ width: 90, height: 90 }} /></a>
                  <h2 className="infoSubheader"> aggiecodingclub@gmail.com </h2>
              </div>
              <div className="column">
                  <h1 className="infoHeader"> slack </h1>
                  <a target="_blank" rel="noopener noreferrer" className="link" href="https://aggie-coding-club.slack.com"><FaSlack style={{ width: 90, height: 90 }} /></a>
                  <h2 className="infoSubheader"> aggie-coding-club.slack.com </h2>
              </div>
              <div className="column">
                  <h1 className="infoHeader">github</h1>
                  <a target="_blank" rel="noopener noreferrer" className="link" href="https://github.com/aggie-coding-club"><FaGithub style={{ width: 90, height: 90 }} /></a>
                  <h2 className="infoSubheader"> github.com/aggie-coding-club </h2>
              </div>
              <div className="column">
                  <h1 className="infoHeader">google drive</h1>
                  <a target="_blank" rel="noopener noreferrer" className="link" href="https://tinyurl.com/ydhotylu"><FaGoogle style={{ width: 90, height: 90 }} /></a>
                  <h2 className="infoSubheader"> tinyurl.com/ydhotylu </h2>
              </div>
          </ScrollAnimation>
          <div className="copyright">
              <h4 className="copyrightText">&#169; 2018 Jonathan Innis | Gabriel Britain </h4>
          </div>
      </div>
    );
  }
}
