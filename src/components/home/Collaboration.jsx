import React, { useState } from 'react';

const NolchaExperience = () => {
  const [expandedSection, setExpandedSection] = useState('connect'); // First section expanded by default

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'connect',
      title: 'Connect + Collaborate',
      content: 'Join leaders in Web3 and crypto for dynamic gatherings. Connect, engage and build with pioneers in a setting that fosters collaboration and drives industry innovation.'
    },
    {
      id: 'connect2',
      title: 'Connect + Collaborate',
      content: 'Join leaders in Web3 and crypto for dynamic gatherings. Connect, engage and build with pioneers in a setting that fosters collaboration and drives industry innovation.'
    },
    {
      id: 'leadership',
      title: 'Thought Leadership + Education',
      content: 'Gain insights from industry experts and thought leaders. Participate in educational sessions that cover the latest trends, technologies, and best practices in the Web3 and blockchain space.'
    }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Image */}
          <div className="relative">
            <img 
              src="/home/collaborate.png" 
              alt="Nolcha Shows collaboration event"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <p className="text-sm text-gray-600 mt-3">
              Image from Nolcha Shows x World Trade Center 69 Floor
            </p>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            {/* Main heading */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-8">
                Nolcha Shows Experiences Are The Destination For Brands And Organizations To Continue To Build, Engage And Connect.
              </h1>
            </div>

            {/* Expandable sections */}
            <div className="space-y-4">
              {sections.map((section) => (
                <div key={section.id} className="border-b border-gray-200">
                  {/* Section header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex justify-between items-center py-6 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h2 className="text-xl lg:text-2xl font-semibold text-black">
                      {section.title}
                    </h2>
                    <div className="ml-4 flex-shrink-0">
                      {expandedSection === section.id ? (
                        // Minus icon
                        <svg 
                          className="w-6 h-6 text-black" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      ) : (
                        // Plus icon
                        <svg 
                          className="w-6 h-6 text-black" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* Expandable content */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedSection === section.id ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}>
                    <div className="text-gray-700 text-base lg:text-lg leading-relaxed pr-8">
                      {section.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NolchaExperience;