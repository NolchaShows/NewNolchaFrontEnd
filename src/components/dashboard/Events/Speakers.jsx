import React from 'react';

const SpeakersLineup = ({speakers}) => {
  return (
    <div className="w-full">
      <div className="hidden md:block max-w-md mx-auto border border-gray-300 rounded-2xl bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">SPEAKERS LINEUP</h2>
        <div className="space-y-4">
          {speakers.map((speaker) => (
            <div 
              key={speaker.id}
              className="bg-[#EBE2D7] rounded-2xl p-4 flex items-center space-x-4"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 text-base">
                    {speaker.name}
                  </h3>
                  <span className="text-gray-500 text-sm font-medium">
                    {speaker.time}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">
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