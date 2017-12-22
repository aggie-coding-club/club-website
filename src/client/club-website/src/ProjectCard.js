import React, {Component} from 'react';
import FaGithub from 'react-icons/lib/fa/github';
import Chip from 'material-ui/Chip';

class ProjectCard extends Component{
  state={
    projectManager: '',
    description: '',
    title: '',
    image: '',
    githubLink: '',
    members: [],
  }
  componentWillMount(){
    try{
      if (this.props.members.length === 0) this.setState({members: ["None"]})
      else this.setState({members: this.props.members});

      if (this.props.projectManager.length !== 0){
        this.setState({projectManager: this.props.projectManager[0].login})
      }
      else this.setState({projectManager: 'Unknown'});
      if (this.props.repo.length !== 0){
        this.setState({githubLink: this.props.repo[0].html_url});
        this.setState({description: this.props.repo[0].description});
      }
      else{
        this.setState({description: ''});
        this.setState({githubLink: '#'});
      }
      this.setState({title : this.props.title});
      console.log(this.props.repo[0].languages.JavaScript > 0);
      console.log(this.props.repo[0].languages);
    }
    catch (e){
      console.log(e);
    }
  }

  handleChipClick = (url) => {
    //console.log(url);
  }

  render(){
    return(
      <div className="projectTile" style={{backgroundColor: "#ffffff", color: "#333e44", margin: 20, width: 400, height: 300}}>
        <div style={{position: "relative", left: 0, top: 0, width: 500, height: "auto", borderBottom: "2px solid #333e44" , margin: 0}}>
          <div className="chevron"></div>
          <h1 style={{position: "relative", left: 5, top: 0, margin: 0, width: 400, fontWeight: "1000", textAlign: "left", padding: "10px", zIndex: 2, opacity: 1, fontSize: "2.25em"}}>{this.state.title}</h1>
        </div>
        <h5 style={{position:"relative", left: 5, fontWeight: 300, margin:0, padding: 10, fontSize: "1.5em",textAlign: "left", width: "auto"}}><b>Project Manager:</b> {this.state.projectManager}</h5>
        <p style={{position: "relative", fontWeight: 100, fontSize: "1em", paddingLeft: 15, paddingRight: 15, textAlign: "left", margin: 0}}>{this.state.description}</p>
        <div style={{position: "relative", textAlign: "left", paddingLeft: 15, paddingRight: 15, zIndex: 4, marginTop: 10, width: 370}}><b>Contributors: </b>{this.state.members.map(member=><Chip style={{display: "inline-flex", color: "#ffffff", backgroundColor: "#0288D1", height: 20, margin: 2, verticalAlign: "center"}} key={member.id} onClick={this.handleChipClick(member.avatar_url)} label={member.login}/>)}</div>
        <p style={{color: this.state.languageColor, fontFamily: "serif", fontSize: "4em", margin: 0, position: "absolute", left: 5, bottom: -18}}> &middot; </p>
        <p style={{margin: 0, fontSize: "0.75em", position: "absolute", left: 23, bottom: 12}}> JavaScript </p>
        <a target="_blank" rel="noopener noreferrer" href={this.state.githubLink} style={{color: "#333e44", textDecoration: "none"}}><FaGithub style={{position: "absolute", width: 50, height: 50, right: 10, bottom: 10, zIndex: 10}}/></a>
      </div>
    );
  }
}

export default ProjectCard;
