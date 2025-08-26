import React from 'react';

const MemberBenefits = () => {
  const benefits = [
    {
      icon: "/membership/v1/1.png",
      title: "Event Discounts",
      description: "Event Discounts for all kinds of membership"
    },
    {
      icon: "/membership/v1/2.png", 
      title: "Curated Digital Library",
      description: "Curated Digital Library with exclusive content on Visual Portfolio, brand strategy, design thinking and leadership"
    },
    {
      icon: "/membership/v1/3.png",
      title: "Member Lounge", 
      description: "Member Lounge for real-time interactions between members"
    },
    {
      icon: "/membership/v1/4.png",
      title: "Private Collaborations",
      description: "Invitation to Private Collaborations with renowned designers, strategists and media leaders"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        MEMBER BENEFITS
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className="flex items-start space-x-4 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex-shrink-0">
              <img 
                src={benefit.icon}
                alt={benefit.title}
                className="w-25 h-25 object-contain"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberBenefits;