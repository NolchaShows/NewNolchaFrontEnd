import { useEffect, useState } from "react";

const DEFAULT_STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "https://new-nolcha-strapi.onrender.com";

const makeMediaUrl = (media) => {
  if (!media) return null;

  let url = null;

  if (media.data?.attributes?.url) {
    url = media.data.attributes.url;
  } else if (media.url) {
    url = media.url;
  } else if (typeof media === "string") {
    url = media;
  }

  if (!url) return null;

  return url.startsWith("http") ? url : `${DEFAULT_STRAPI_URL}${url}`;
};

export const getDefaultWhiteLabelPageData = () => ({
  heroSection: {
    videoSrc:
      "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/shao-nyfw-hero-video.mp4",
    firstPart: "White Label Global Event Partner",
    secondPart: "",
    strokeColor: "#000000",
    fillColor: "#FEF991",
    textColor: "#FFFFFF",
    overlayOpacity: 20,
    isGoogleDrive: false,
  },
  introSection: {
    image: "/white-label/white-label.jpg",
    heading: "Your Event. Your Brand. Our Infrastructure.",
    paragraph:
      "We don't just produce events. We design strategic environments that elevate brand positioning and facilitate real business outcomes, supported by the scale, network, and operational discipline developed across 280+ global events.",
  },
  infrastructureSection: {
    heading: "360deg White-Label Event Infrastructure",
    items: [
      { title: "Creative Concept Experience Design" },
      { title: "Venue Sourcing & Transformation" },
      { title: "Entertainment & Costume Design" },
      { title: "Art Direction & Music Curation" },
      { title: "Signature F&B Programming" },
      { title: "Biz Dev & Strategic Introductions" },
      { title: "Guest List Management" },
      { title: "Budget Strategy & Oversight" },
      { title: "VIP Experience & Guest Relations" },
      { title: "Showflow & Crew Operations" },
    ],
    paragraph:
      "<strong>Our 360 turnkey white-label events</strong> are custom, story-driven, and tailored to your mission, audience, and goals. <strong>From</strong> intimate gatherings, <strong>to summits</strong> to large-scale immersive experiences. We take care of every detail, from concept to execution, so you can focus on what matters most.",
  },
  partnerSection: null,
  ctaSection: {
    heading: "Let's Build Your Event.",
    description:
      "Tell us your vision - we'll handle everything else. Whether you're looking for an intimate gathering, full-scale conference, or 360 immersive experience activation for thousands, Nolcha produces it under your brand, at your standard.",
    ctaLabel: "Get Started",
    ctaUrl: "/contact-us",
    backgroundImage: "/white-label/cta-bg.jpg",
  },
});

export const transformWhiteLabelPageData = (data) => {
  const defaults = getDefaultWhiteLabelPageData();
  const heroSection = data?.hero_section || {};
  const introSection = data?.intro_section || {};
  const infrastructureSection = data?.infrastructure_section || {};
  const sharedPartnerSection = data?.shared_partner_section || null;
  const ctaSection = data?.cta_section || {};
  const infrastructureTiles = Array.isArray(infrastructureSection.tiles)
    ? infrastructureSection.tiles
        .map((item) => ({
          title: item?.title || "",
        }))
        .filter((item) => item.title)
    : [];

  return {
    heroSection: {
      videoSrc: makeMediaUrl(heroSection.video) || defaults.heroSection.videoSrc,
      firstPart: heroSection.firstPart || heroSection.first_part || defaults.heroSection.firstPart,
      secondPart:
        heroSection.secondPart || heroSection.second_part || defaults.heroSection.secondPart,
      strokeColor: defaults.heroSection.strokeColor,
      fillColor: defaults.heroSection.fillColor,
      textColor: defaults.heroSection.textColor,
      overlayOpacity: defaults.heroSection.overlayOpacity,
      isGoogleDrive: defaults.heroSection.isGoogleDrive,
    },
    introSection: {
      image: makeMediaUrl(introSection.image) || defaults.introSection.image,
      heading: introSection.heading || defaults.introSection.heading,
      paragraph: introSection.paragraph || defaults.introSection.paragraph,
    },
    infrastructureSection: {
      heading: infrastructureSection.heading || defaults.infrastructureSection.heading,
      items:
        infrastructureTiles.length > 0
          ? infrastructureTiles
          : defaults.infrastructureSection.items,
      paragraph: infrastructureSection.paragraph || defaults.infrastructureSection.paragraph,
    },
    partnerSection: sharedPartnerSection || defaults.partnerSection,
    ctaSection: {
      heading: ctaSection.heading || defaults.ctaSection.heading,
      description: ctaSection.description || defaults.ctaSection.description,
      ctaLabel: ctaSection.ctaLabel || ctaSection.cta_label || defaults.ctaSection.ctaLabel,
      ctaUrl: ctaSection.ctaUrl || ctaSection.cta_url || defaults.ctaSection.ctaUrl,
      backgroundImage:
        makeMediaUrl(ctaSection.backgroundImage || ctaSection.background_image) ||
        defaults.ctaSection.backgroundImage,
    },
  };
};

export const useWhiteLabelPageData = () => {
  const [whiteLabelData, setWhiteLabelData] = useState(getDefaultWhiteLabelPageData());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { getWhiteLabelPageData } = await import("@/lib/strapi");
        const data = await getWhiteLabelPageData();

        if (data?.data?.attributes) {
          setWhiteLabelData(transformWhiteLabelPageData(data.data.attributes));
        } else if (data?.data) {
          setWhiteLabelData(transformWhiteLabelPageData(data.data));
        } else {
          setWhiteLabelData(getDefaultWhiteLabelPageData());
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching white-label page data:", err);
        setError(err.message);
        setWhiteLabelData(getDefaultWhiteLabelPageData());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { whiteLabelData, loading, error };
};
