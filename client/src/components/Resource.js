import React from 'react';
import ScrollAnimation from "react-animate-on-scroll";

//Icon Imports
import EmailIcon from 'material-ui-icons/Email';
import FaSlack from 'react-icons/lib/fa/slack';
import FaGithub from 'react-icons/lib/fa/github';
import FaGoogle from 'react-icons/lib/fa/google';

import '../assets/Resource.css';

export default class Resource extends React.Component{
  render(){
    return(
      <div className="background">
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true} offset={200}>
              <h1 className="header"> drop us a line </h1>
              <div className="resourceColumn">
                  <h1 className="infoHeader"> email </h1>
                  <a target="_blank" rel="noopener noreferrer" className="link" href="mailto:aggiecodingclub@gmail.com"><EmailIcon style={{ width: 90, height: 90 }} /></a>
                  <h2 className="infoSubheader"> aggiecodingclub@gmail.com </h2>
              </div>
              <div className="resourceColumn">
                  <h1 className="infoHeader"> slack </h1>
                  <a target="_blank" rel="noopener noreferrer" className="link" href="https://aggie-coding-club.slack.com"><FaSlack style={{ width: 90, height: 90 }} /></a>
                  <h2 className="infoSubheader"> aggie-coding-club.slack.com </h2>
              </div>
              <div className="resourceColumn">
                  <h1 className="infoHeader">github</h1>
                  <a target="_blank" rel="noopener noreferrer" className="link" href="https://github.com/aggie-coding-club"><FaGithub style={{ width: 90, height: 90 }} /></a>
                  <h2 className="infoSubheader"> github.com/aggie-coding-club </h2>
              </div>
              <div className="resourceColumn">
                  <h1 className="infoHeader">google drive</h1>
                  <a target="_blank" rel="noopener noreferrer" className="link" href="https://tinyurl.com/ydhotylu"><FaGoogle style={{ width: 90, height: 90 }} /></a>
                  <h2 className="infoSubheader"> tinyurl.com/ydhotylu </h2>
              </div>
          </ScrollAnimation>
          <div className="copyright">
              <h4 className="copyrightText">&#169; 2018 Aggie Coding Club </h4>
          </div>
      </div>
    );
  }
}
