import React from 'react';

function SimpleMediaCard(props) {
  return (
    <div class="tile">
      <img src={props.imgSrc} alt={props.alt}/>
      <div class="text">
      <h2 class="animate-text">{props.subtitle}</h2>
      <h3 class="animate-text">{props.major} '{props.classYear}</h3>
      <h1 style={{textAlign: "left"}}>{props.firstName}</h1>
      <h1 style={{textAlign: "left"}}>{props.lastName}</h1>
      </div>
      </div>
  );
}

export default SimpleMediaCard;
