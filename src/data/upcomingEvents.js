export const upcomingListEvents = [
  {
    title: "Consensus Hong Kong",
    image: "/homepage/upcoming_events/upcoming1.jpg",
    date: "February 10-12, 2026",
    location:
      "Join us for the Consensus 2026 Official Opening Night Party at The Trilogy, a multi-experience destination spanning three distinct venues on the 26th floor, overlooking the Hong Kong skyline.",
    pastEventsLocation: "Houston Texas Usa",
    letsTalkLocation: "Location:",
    whiteLabelLocation: "Location:",
    venue:
      "Join us for the Consensus 2026 Official Opening Night Party at The Trilogy, a multi-experience destination spanning three distinct venues on the 26th floor, overlooking the Hong Kong skyline.",
    whatToExpect:
      "Get your brand front and center at Consensus 2026's Official Opening Night for an unforgettable fusion of technology, innovation, and entertainment.",
    rsvpLink: "https://luma.com/ConsensusHK2026Opening",
    logo: "https://images.squarespace-cdn.com/content/6543e07afbb3360bba3e0b3b/36f8725a-8462-4311-ad4b-4d19fd9c4b26/Consensus+Hong+Kong+2026.webp?content-type=image%2Fwebp",
    mainImage:
      "https://images.squarespace-cdn.com/content/6543e07afbb3360bba3e0b3b/e5191464-6cdc-4f1b-9c00-9b8f9726dd08/049_Photagonist.ca.webp?content-type=image%2Fwebp",
    galleryImages: [],
  },
  {
    title: "Bitcoin Conference Vegas",
    image: "/homepage/upcoming_events/upcoming2.jpg",
    date: "April 27, 2026",
    location: "Las Vegas, Nevada, USA",
    pastEventsLocation: "Houston Texas Usa",
    letsTalkLocation: "Location:",
    whiteLabelLocation: "Location:",
    venue: "Las Vegas Convention Center and surrounding venues",
    whatToExpect:
      "Join the world's largest Bitcoin conference featuring top speakers, networking opportunities, and exclusive events.",
    rsvpLink: "#",
    logo: "",
    mainImage: "/homepage/upcoming_events/upcoming2.jpg",
    galleryImages: [],
  },
  {
    title: "Consensus Miami",
    image: "/homepage/upcoming_events/upcoming3.jpg",
    date: "May 5 - 7, 2026",
    location: "Miami, Florida, USA",
    pastEventsLocation: "Houston Texas Usa",
    letsTalkLocation: "Location:",
    whiteLabelLocation: "Location:",
    venue: "Miami Beach Convention Center",
    whatToExpect:
      "Experience Consensus Miami with cutting-edge blockchain technology, networking events, and exclusive after-parties.",
    rsvpLink: "#",
    logo: "",
    mainImage: "/homepage/upcoming_events/upcoming3.jpg",
    galleryImages: [],
  },
  {
    title: "Multichain Summer Series",
    image: "/homepage/upcoming_events/upcoming4.jpg",
    date: "July 15 - September 25, 2026",
    location: "Multiple Locations",
    pastEventsLocation: "Houston Texas Usa",
    letsTalkLocation: "Location:",
    whiteLabelLocation: "Location:",
    venue: "Various locations across major cities",
    whatToExpect:
      "A summer-long series of events celebrating multichain innovation, featuring workshops, conferences, and networking opportunities.",
    rsvpLink: "#",
    logo: "",
    mainImage: "/homepage/upcoming_events/upcoming4.jpg",
    galleryImages: [],
  },
  {
    title: "New York Fashion Week",
    image: "/homepage/upcoming_events/upcoming5.jpg",
    date: "September 10 - 14, 2026",
    location: "New York City, New York, USA",
    pastEventsLocation: "Houston Texas Usa",
    letsTalkLocation: "Location:",
    whiteLabelLocation: "Location:",
    venue: "Various venues across Manhattan",
    whatToExpect:
      "Join us for exclusive fashion week events, runway shows, and networking with industry leaders and influencers.",
    rsvpLink: "#",
    logo: "",
    mainImage: "/homepage/upcoming_events/upcoming5.jpg",
    galleryImages: [],
  },
  {
    title: "Token 2049 Singapore",
    image: "/homepage/upcoming_events/upcoming6.jpg",
    date: "October 7-8, 2026",
    location: "Singapore",
    pastEventsLocation: "Houston Texas Usa",
    letsTalkLocation: "Location:",
    whiteLabelLocation: "Location:",
    venue: "Marina Bay Sands, Singapore",
    whatToExpect:
      "Asia's premier crypto event featuring the brightest minds in Web3, blockchain, and cryptocurrency.",
    rsvpLink: "#",
    logo: "",
    mainImage: "/homepage/upcoming_events/upcoming6.jpg",
    galleryImages: [],
  },
  {
    title: "Art Basel Miami",
    image: "/homepage/upcoming_events/upcoming7.jpg",
    date: "December 3-4, 2026",
    location: "Miami Beach, Florida, USA",
    pastEventsLocation: "Houston Texas Usa",
    letsTalkLocation: "Location:",
    whiteLabelLocation: "Location:",
    venue: "Miami Beach Convention Center and surrounding galleries",
    whatToExpect:
      "Experience the intersection of art and technology at Art Basel Miami with exclusive events, gallery openings, and VIP experiences.",
    rsvpLink: "#",
    logo: "",
    mainImage: "/homepage/upcoming_events/upcoming7.jpg",
    galleryImages: [],
  },
];

export const slugifyUpcomingEventTitle = (title = "") =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getUpcomingEventHref = (title) =>
  `/?upcoming=${encodeURIComponent(slugifyUpcomingEventTitle(title))}`;
