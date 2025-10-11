import React from 'react';
import StyledHeading from './StyledHeading';
import SpeakerCard from './SpeakerCard';

const PastSpeakers = ({ speakers = [] }) => {
  // Default placeholder speakers if none provided
  const defaultSpeakers = [
    { id: 1, image: '/past_speakers/1.png' },
    { id: 2, image: '/past_speakers/2.png'},
    { id: 3, image: '/past_speakers/3.png'},
  ];

  const displaySpeakers = speakers.length > 0 ? speakers : defaultSpeakers;

  return (
    <div className="py-[40px] md:py-[60px] lg:py-[80px] px-[16px] md:px-[40px] max-w-none w-full mx-auto">
      <StyledHeading 
        firstPart="Past"
        secondPart="Speakers"
        strokeColor="#000000"
        fillColor="#FEF991"
        textColor="#000000"
        className="mb-[30px] md:mb-[50px]"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[30px] lg:gap-[40px]">
        {displaySpeakers.map((speaker) => (
          <SpeakerCard
            key={speaker.id}
            image={speaker.image}
          />
        ))}
      </div>
    </div>
  );
};

export default PastSpeakers;

