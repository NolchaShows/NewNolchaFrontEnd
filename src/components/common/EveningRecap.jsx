import React from 'react';
import StyledHeading from './StyledHeading';

const EveningRecap = ({ year, title, videoUrl }) => {
    return (
        <div className="py-[52px] lg:py-[150px] max-w-none w-full mx-auto">
            {year && title && (
                <StyledHeading
                    firstPart={year}
                    secondPart={title}
                    strokeColor="#000000"
                    fillColor="#FEF991"
                    textColor="#000000"
                    className="mb-[30px] md:mb-[50px]"
                />
            )}
            <video
                src={videoUrl}
                className="w-full max-h-[700px] 2xl:max-h-[900px] object-cover"
                controls
                playsInline
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default EveningRecap;

