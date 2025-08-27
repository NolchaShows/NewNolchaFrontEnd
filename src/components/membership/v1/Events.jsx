import React from 'react';

const Events = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* Nolcha Summit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Nolcha Summit – Miami, New York, London
          </h2>
          <p className="text-gray-600 leading-relaxed">
            A high-impact summit featuring a panel of these power cities. 
            Bringing together emerging and established designers, industry 
            cultural conversations and evening galas. Every attendee is pre-
            approved. No exceptions.
          </p>
        </div>
        
        <div className="lg:order-last">
          <img 
            src="/membership/v1/5.png"
            alt="Nolcha Summit event"
            className="w-full h-100 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Nolcha Retreat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Nolcha Retreat
          </h2>
          <p className="text-gray-600 leading-relaxed">
            A private 5-day experience hosted in luxury estates, focused on 
            clarity, elevation, and thoughtful connection.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The attendee list is carefully curated and meticulously put 
            by global innovators.
          </p>
        </div>
        
        <div>
          <img 
            src="/membership/v1/6.png"
            alt="Nolcha Retreat event"
            className="w-full h-100 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Events;