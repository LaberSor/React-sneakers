import React from 'react';
import Arrow from 'images/arrow.svg';

function Info({ imageUrl, title, description, buttonTitle, onClose, imageWidth = 120 }) {
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img src={imageUrl} alt="blankCart" className="mb-20" width={imageWidth} />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button className="greenButton" onClick={onClose}>
        <img src={Arrow} alt="Arrow" />
        {buttonTitle}
      </button>
    </div>
  );
}
export default Info;
