// @flow weak

import React from 'react';

function SimpleMediaCard(props) {
  return (
    <div class="tile">
      <img src={props.imgSrc} alt={props.alt}/>
      <div class="text">
      <h1>{props.title}</h1>
      <h2 class="animate-text">{props.subtitle}</h2>
      <p class="animate-text">{props.description}</p>
      </div>
      </div>
  );
}

export default SimpleMediaCard;
