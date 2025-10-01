import React from 'react';

const SpeakersLineup = ({speakers}) => {
  return (
    <div className="w-full">
      <div className="hidden md:block w-full max-w-none mx-auto border border-gray-300 2xl:border-2 rounded-2xl 2xl:rounded-3xl bg-white p-6 2xl:p-10 shadow-sm 2xl:shadow-lg">
        <h2 className="text-xl font-bold 2xl:text-3xl text-gray-900 mb-6 2xl:mb-10">SPEAKERS LINEUP</h2>
        <div className="space-y-4 2xl:space-y-8">
          {speakers.map((speaker) => (
            <div 
              key={speaker.id}
              className="bg-[#EBE2D7] rounded-2xl 2xl:rounded-3xl p-4 2xl:p-6 flex items-center space-x-4 2xl:space-x-6 hover:shadow-md 2xl:hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-20 h-20 2xl:w-28 2xl:h-28 rounded-2xl 2xl:rounded-3xl overflow-hidden flex-shrink-0 ring-2 ring-offset-2 ring-offset-[#EBE2D7] ring-white/50 2xl:ring-4 2xl:ring-offset-4">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1 2xl:mb-3">
                  <div className="font-semibold text-gray-900 text-base 2xl:text-2xl">
                    {speaker.name}
                  </div>
                  <span className="text-gray-500 text-sm 2xl:text-xl font-medium bg-white/60 2xl:bg-white/80 px-2 2xl:px-4 py-1 2xl:py-2 rounded-lg 2xl:rounded-xl">
                    {speaker.time}
                  </span>
                </div>
                
                <div className="text-gray-600 text-sm 2xl:text-lg mb-3 2xl:mb-4">
                  {speaker.title}
                </div>
                
                <div className="flex items-center space-x-2 2xl:space-x-3">
                  <div className="w-4 h-4 2xl:w-6 2xl:h-6 bg-gray-800 rounded-sm 2xl:rounded-md flex items-center justify-center">
                    <div className="w-2 h-2 2xl:w-3 2xl:h-3 bg-white rounded-sm"></div>
                  </div>
                  <span className="text-gray-700 text-sm 2xl:text-lg font-medium">
                    {speaker.topic}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden max-w-sm mx-auto bg-white border-2 border-gray-300 rounded-lg p-4 relative">

        <h2 className="text-lg font-bold text-gray-900 mb-4">SPEAKERS LINEUP</h2>
        
        <div className="space-y-4">
          {speakers.map((speaker) => (
            <div 
              key={speaker.id}
              className="bg-[#EBE2D7] rounded-2xl overflow-hidden"
            >
              <div className="w-full rounded-2xl h-40 my-3 ml-3 mr-6 overflow-hidden">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-[94%] rounded-2xl h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {speaker.name}
                  </h3>
                  <span className="text-gray-400 text-sm">
                    {speaker.time}
                  </span>
                </div>
                
                <p className="text-gray-500 text-sm mb-4">
                  {speaker.title}
                </p>
                
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-800 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">
                    {speaker.topic}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeakersLineup;