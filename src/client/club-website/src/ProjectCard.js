import React, {Component} from 'react';
import SimpleMediaCard from './SimpleMediaCard.js';

class ProjectCard extends Component{

  state = {
    members: [],
    teams: [],
    repos: [],
  }

  attachData(){
    fetch('/github').then((response) => {
      return response.json();
      }).then((json) => {
      this.setState({members: json.members});
      this.setState({teams: json.teams});
      this.setState({repos: json.repos});
      console.log(json.teams);
    }).catch((error) => {console.log(error)});
  }

  componentDidMount() {
    this.attachData();
  }

  render(){
    return(
      <div style={{position: "relative", left: "50%", transform:"translateX(-50%)"}}>
        {this.state.teams.map(team=>
          <SimpleMediaCard key={team.id} lastName={team.name}/>
        )}
      </div>
    );
  }
}

export default ProjectCard;
