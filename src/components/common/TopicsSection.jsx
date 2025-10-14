import React from 'react';

const TopicsSection = ({
  heading = "Topics",
  topicGroups = [],
  backgroundImage = "/inscribing_miami/topics_background.png"
}) => {
  return (
    <div
      className="max-w-none w-full mx-auto"
    >
      <div className='px-[22px] lg:px-12 pb-[60px] lg:pb-[150px]' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Heading */}
        <h1 className="text-[35px] lg:text-[87px] font-bold text-[#000000] leading-none mb-4 lg:mb-[60px] pt-[32px] lg:pt-[120px]">
          {heading}
        </h1>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] lg:gap-[60px]">
          {topicGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="bg-white rounded-[9px] lg:rounded-[17px] px-[14px] lg:px-[26px] py-[36px] lg:py-[67px]"
            >
              <div className="space-y-[10px] lg:space-y-[20px]">
                {group.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="flex gap-[15px] md:gap-[28px] items-center">
                    <div className="flex-shrink-0">
                      <div
                        className="w-[10px] h-[10px] lg:w-[20px] lg:h-[20px] rounded-[3px] lg:rounded-[5px] border-1 border-[#000]"
                        style={{ backgroundColor: '#FEF991' }}
                      ></div>
                    </div>
                    <p className="text-[16px] lg:text-[26px] text-black leading-tight">
                      {topic}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicsSection;

