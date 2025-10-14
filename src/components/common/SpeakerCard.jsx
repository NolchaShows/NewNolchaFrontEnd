import React from 'react';

const SpeakerCard = ({ image }) => {
  return (
      <div className="w-full">
        <img 
          src={image} 
          className="w-full h-auto object-cover"
        />
      </div>
  );
};

export default SpeakerCard;

