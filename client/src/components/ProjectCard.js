import React, {Component} from 'react';
import FaGithub from 'react-icons/lib/fa/github';
import Chip from 'material-ui/Chip';
import Colors from '../assets/colors.js';

class ProjectCard extends Component{
  state={
    projectManager: '',
    description: '',
    title: '',
    image: '',
    githubLink: '',
    language: '',
    color: '',
    members: [],
  }
  componentWillMount(){
    try{
      //Establish team members
      this.setState({members: this.props.members});
      this.setState({title : this.props.title});
      console.log(this.props.title);
      if (this.props.languages) this.establishLanguage();

      //Establish project manager
      if (this.props.projectManager.length !== 0){
        this.setState({projectManager: this.props.projectManager[0].login})
      }
      else{
        this.setState({projectManager: 'Unknown'});
      }

      //Establish repo url and repo description
      if (this.props.repo !== 0){
        if (this.props.html_url) this.setState({githubLink: this.props.repo[0].html_url});
        if (this.props.description){
          if (this.props.repo[0].description.length > 175) this.setState({description: this.props.repo[0].description.substr(0,175) + "\u2026"});
          else this.setState({description: this.props.repo[0].description});
        }
      }

      //Establish title and language

    }
    catch (e){
      console.log(e);
    }
  }

  establishLanguage(){
    if (Object.keys(this.props.repo[0].languages).length !== 0){
      const data = this.props.repo[0].languages;
      const biggestLanguage = Object.keys(data).reduce(function(a, b){ return data[a] > data[b] ? a : b });
      this.setState({language: biggestLanguage});
      this.setState({color: Colors[biggestLanguage].color})
    }
  }

  handleChipClick = (url) => {
    //console.log(url);
  }

  render(){
    return(
      <div className="projectTile" style={{backgroundColor: "#ffffff", color: "#333e44", margin: 20, width: 400, height: 300}}>
        <div className="projectTileOverlay" style={{position: "relative", left: 0, top: 0, width: 500, height: "auto", borderBottom: "2px solid #333e44" , margin: 0}}>
          <div className="chevron"></div>
          <h1 className="projectTileTitle" style={{position: "relative", left: 5, top: 0, margin: 0, width: 400, fontWeight: "1000", textAlign: "left", padding: "10px", zIndex: 2, opacity: 1, fontSize: "2.25em"}}>{this.state.title}</h1>
        </div>
        <h5 className="projectTileSubtitle" style={{position:"relative", left: 5, fontWeight: 300, margin:0, paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 5, fontSize: "1.25em",textAlign: "left", width: "auto"}}><b>Project Manager:</b> {this.state.projectManager}</h5>
        {this.state.description !== '' ? <p className="projectTileDescription" style={{position: "relative", fontWeight: 100, fontSize: "1em", paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, textAlign: "left", margin: 0}}>{this.state.description}</p> : null}
        {this.state.members.length > 0 ? <div className="projectTileChipsContainer" style={{position: "relative", textAlign: "left", paddingLeft: 15, paddingRight: 15, zIndex: 4, marginTop: 5, width: 370}}><b>Contributors: </b>{this.state.members.map(member=><Chip className="projectTileChips" style={{display: "inline-flex", color: "#ffffff", backgroundColor: "#0288D1", height: 20, margin: 2, verticalAlign: "center"}} key={member.id} onClick={this.handleChipClick(member.avatar_url)} label={member.login}/>)}</div> : null}
        {this.state.color !== '' ? <p className="projectTileMiddot" style={{color: this.state.color, fontFamily: "serif", fontSize: "4em", margin: 0, position: "absolute", left: 5, bottom: -18}}> &middot; </p> : null}
        <p className="projectTileLanguage" style={{margin: 0, fontSize: "0.8em", position: "absolute", left: 23, bottom: 11.5}}> {this.state.language} </p>
        <a target="_blank" rel="noopener noreferrer" href={this.state.githubLink} style={{color: "#333e44", textDecoration: "none"}}><FaGithub className="projectTileGithubLink" style={{position: "absolute", width: 50, height: 50, right: 10, bottom: 10, zIndex: 10}}/></a>
      </div>
    );
  }
}

export default ProjectCard;
