import React from 'react';
import Slider from 'react-image-slider';

function ImageSlider(props){
  const images = props.imageList;
  return (
      <Slider images={images} isInfinite delay={5000}>
        {images.map((image, key) => <div key={key}>{image}</div>)}
      </Slider>
    );
}

export default ImageSlider;
