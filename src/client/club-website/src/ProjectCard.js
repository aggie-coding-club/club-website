import React, {Component} from 'react';
import cImage from "./language_logos/c++.png";
import javaImage from "./language_logos/java.png";
import javascriptImage from './language_logos/javascript.png';
import pythonImage from './language_logos/python.png';
import blankImage from './language_logos/blank.png';
import FaGithub from 'react-icons/lib/fa/github';

class ProjectCard extends Component{
  state={
    projectManager: '',
    description: '',
    title: '',
    image: '',
    githubLink: '',
  }
  componentWillMount(){
    this.setState({projectManager : this.props.projectManager});
    this.setState({description : this.props.description});
    this.setState({title : this.props.title});
    this.setState({githubLink : this.props.githubLink});
    this.establishLanguage();
  }
  establishLanguage(){
    if (this.props.language === 'JavaScript') this.setState({image : javascriptImage});
    else if (this.props.language === 'Python') this.setState({image : pythonImage});
    else if (this.props.language === 'c' || this.props.language === 'Objective-C' || this.props.language === "C#") this.setState({image : cImage});
    else if (this.props.language === 'Java') this.setState({image : javaImage});
    else this.setState({image : blankImage})
  }
  render(){
    return(
      <div className="projectTile" style={{backgroundColor: "#ffffff", color: "#333e44", margin: 20, width: 400, height: 300}}>
        <div style={{position: "relative", left: 0, top: 0, width: 500, height: "auto", borderBottom: "2px solid #333e44" , margin: 0}}>
          <div className="chevron"></div>
          <h1 style={{position: "relative", left: 5, top: 0, margin: 0, width: 450, fontWeight: "1000", textAlign: "left", padding: "10px", zIndex: 2, opacity: 1, fontSize: "2.5em"}}>{this.state.title}</h1>
        </div>
        <h5 style={{position:"absolute", left: 5, fontWeight: 300, margin:0, padding: 10, fontSize: "1.5em",textAlign: "left", width: "auto"}}>Project Manager: </h5>
        <h5 style={{position: "relative", left: 210, fontSize: "1.5em", margin:0, paddingTop: 10, paddingBottom: 10, textAlign: "left"}}>{this.state.projectManager}</h5>
        <p style={{position: "relative", fontWeight: 100, fontSize: "1em", paddingLeft: 15, paddingRight: 15, textAlign: "left", margin: 0}}>{this.state.description}</p>
        <p></p>
        <img alt="language_image" style={{position: "absolute", left: 10, top: 240, width: 50, height: 50}} src={this.state.image}/>
        <a target="_blank" href={this.state.githubLink} style={{color: "#333e44", textDecoration: "none"}}><FaGithub style={{position: "absolute", width: 50, height: 50, right: 10, bottom: 10}}/></a>
      </div>
    );
  }
}

export default ProjectCard;
