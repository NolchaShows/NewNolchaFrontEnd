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
    <div className="pb-[70px] lg:pb-[150px] px-[22px] lg:px-12 max-w-none w-full mx-auto bg-[#F4F4F4]">
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

