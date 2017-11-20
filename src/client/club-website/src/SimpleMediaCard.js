import React from 'react';

function SimpleMediaCard(props) {
  return (
    <div className="tile">
      <img src={props.imgSrc} alt={props.alt}/>
      <div className="text">
      <h1 className="firstName" style={{textAlign: "left"}}>{props.firstName}</h1>
      <h1 className="lastName" style={{textAlign: "left"}}>{props.lastName}</h1>
      <h2 className="animate-text">{props.subtitle}</h2>
      <h3 className="animate-text">{props.major} '{props.classYear}</h3>
      </div>
      </div>
  );
}

export default SimpleMediaCard;
