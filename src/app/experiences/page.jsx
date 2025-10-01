"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const ExperiencesPage = () => {
  const router = useRouter();

  const experiences = [
    {
      id: 'vv_raching_with_jack_butcher',
      title: 'VV Racing with Jack Butcher',
      subtitle: 'Bitcoin Conference Nashville 2024',
      image: '/experiences/jack/conf.png',
      path: '/experiences/vv_raching_with_jack_butcher'
    },
    {
      id: 'bitcoin_conferance',
      title: 'Bitcoin Conference',
      subtitle: 'Inscribing Nashville x Nolcha Shows x Gamma',
      image: '/experiences/bitcoin/conf.png',
      path: '/experiences/bitcoin_conferance'
    },
    {
      id: 'opening_night_consensus',
      title: 'Opening Night Consensus',
      subtitle: '2024',
      image: '/experiences/opening/conf.png',
      path: '/experiences/opening_night_consensus'
    },
    {
      id: 'ctrl_ordinals_collection_launch',
      title: 'CTRL Ordinals Collection Launch',
      subtitle: 'Bitcoin Conference',
      image: '/experiences/ctrl/conf.png',
      path: '/experiences/ctrl_ordinals_collection_launch'
    },
    {
      id: 'new_york_fashion_week',
      title: 'New York Fashion Week',
      subtitle: 'World Trade Center 69th Floor',
      image: '/experiences/newyork/conf.png',
      path: '/experiences/new_york_fashion_week'
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="py-8 px-4 ml-5">
        <h1 className="text-[32px] xl:text-[64px] 2xl:text-[72px] font-bold text-[#000000] mb-2">
          Experiences
        </h1>
        <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[#000000] text-[20px] md:text-[24px] 2xl:text-[36px]">
          Discover our premium events and experiences
        </p>
      </div>

      {/* Experiences Grid */}
      <div className="px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={() => router.push(experience.path)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#000000] mb-2">
                  {experience.title}
                </h3>
                <p className="text-[#666666] text-sm">
                  {experience.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperiencesPage;