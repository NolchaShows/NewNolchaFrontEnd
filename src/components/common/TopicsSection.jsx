import React from 'react';

const TopicsSection = ({
  heading = "Topics",
  topicGroups = [],
  backgroundImage = "/inscribing_miami/topics_background.png"
}) => {
  return (
    <div
      className="pb-[40px] md:pb-[60px] lg:pb-[80px] px-[16px] md:px-[40px] max-w-none w-full mx-auto"
    >
      <div className='px-12 pb-[150px]' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Heading */}
        <h1 className="text-[#000000] text-[40px] md:text-[56px] lg:text-[72px] 2xl:text-[80px] font-bold mb-[60px] md:mb-[60px] pt-[100px]">
          {heading}
        </h1>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-[30px] lg:gap-[40px]">
          {topicGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="bg-white rounded-[16px] md:rounded-[20px] p-[24px] md:p-[32px] lg:p-[40px]"
            >
              <div className="space-y-[16px] md:space-y-[20px]">
                {group.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="flex gap-[12px] md:gap-[16px] items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className="w-[20px] h-[20px] md:w-[20px] md:h-[20px] rounded-[5px] border-1 border-[#000]"
                        style={{ backgroundColor: '#FEF991' }}
                      ></div>
                    </div>
                    <p className="text-[#000000] text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[24px] font-medium leading-tight">
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

