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

const normalizeTextItems = (items) => {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      if (typeof item === "string") return item;
      return item?.text || "";
    })
    .filter(Boolean);
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
    paragraphs: [
      "We don't just produce events. We design strategic environments that elevate brand positioning and facilitate real business outcomes, supported by the scale, network, and operational discipline developed across 280+ global events.",
      "We've built a high-impact community of over 40,000 founders, investors, artists, and leaders defining what's next in Web3, AI, culture, and tech - and every event we produce activates that network.",
    ],
    byline: "Co-Founder Arthur Mandel",
  },
  infrastructureSection: {
    headingLineOne: "360deg White-Label",
    headingLineTwo: "Event Infrastructure",
    items: [
      { title: ["Creative Concept", "Experience Design"], color: "#CEC2AF" },
      { title: ["Venue Sourcing", "& Transformation"], color: "#E2A1A3" },
      { title: ["Entertainment &", "Costume Design"], color: "#95DBC7" },
      { title: ["Art Direction &", "Music Curation"], color: "#5DF6D2" },
      { title: ["Signature F&B", "Programming"], color: "#009895" },
      { title: ["Biz Dev & Strategic", "Introductions"], color: "#DDFFBB" },
      { title: ["Guest List", "Management"], color: "#A3A9DC" },
      { title: ["Budget Strategy", "& Oversight"], color: "#E4F0D0" },
      { title: ["VIP Experience", "& Guest Relations"], color: "#72D5F6" },
      { title: ["Showflow &", "Crew Operations"], color: "#FFE8FF" },
    ],
    paragraphs: [
      "<strong>Our 360 turnkey white-label events</strong> are custom, story-driven, and tailored to your mission, audience, and goals.",
      "<strong>From</strong> intimate gatherings, <strong>to summits</strong> to large-scale immersive experiences.",
      "We take care of every detail, from concept to execution, so you can focus on what matters most.",
    ],
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
  const ctaSection = data?.cta_section || {};

  const introParagraphs = normalizeTextItems(introSection.paragraphs);
  const infrastructureTiles = Array.isArray(infrastructureSection.tiles)
    ? infrastructureSection.tiles
        .map((item) => ({
          title: [
            item?.titleLineOne || item?.title_line_one || "",
            item?.titleLineTwo || item?.title_line_two || "",
          ],
          color: item?.backgroundColor || item?.background_color || "#CEC2AF",
        }))
        .filter((item) => item.title[0] || item.title[1])
    : [];

  const infrastructureParagraphs = [
    infrastructureSection.paragraphOne || infrastructureSection.paragraph_one,
    infrastructureSection.paragraphTwo || infrastructureSection.paragraph_two,
    infrastructureSection.paragraphThree || infrastructureSection.paragraph_three,
  ].filter(Boolean);

  return {
    heroSection: {
      videoSrc: makeMediaUrl(heroSection.video) || defaults.heroSection.videoSrc,
      firstPart: heroSection.firstPart || heroSection.first_part || defaults.heroSection.firstPart,
      secondPart:
        heroSection.secondPart || heroSection.second_part || defaults.heroSection.secondPart,
      strokeColor:
        heroSection.strokeColor || heroSection.stroke_color || defaults.heroSection.strokeColor,
      fillColor:
        heroSection.fillColor || heroSection.fill_color || defaults.heroSection.fillColor,
      textColor:
        heroSection.textColor || heroSection.text_color || defaults.heroSection.textColor,
      overlayOpacity:
        heroSection.overlayOpacity ??
        heroSection.overlay_opacity ??
        defaults.heroSection.overlayOpacity,
      isGoogleDrive:
        heroSection.isGoogleDrive ?? heroSection.is_google_drive ?? defaults.heroSection.isGoogleDrive,
    },
    introSection: {
      image: makeMediaUrl(introSection.image) || defaults.introSection.image,
      heading: introSection.heading || defaults.introSection.heading,
      paragraphs:
        introParagraphs.length > 0 ? introParagraphs : defaults.introSection.paragraphs,
      byline: introSection.byline || defaults.introSection.byline,
    },
    infrastructureSection: {
      headingLineOne:
        infrastructureSection.headingLineOne ||
        infrastructureSection.heading_line_one ||
        defaults.infrastructureSection.headingLineOne,
      headingLineTwo:
        infrastructureSection.headingLineTwo ||
        infrastructureSection.heading_line_two ||
        defaults.infrastructureSection.headingLineTwo,
      items:
        infrastructureTiles.length > 0
          ? infrastructureTiles
          : defaults.infrastructureSection.items,
      paragraphs:
        infrastructureParagraphs.length > 0
          ? infrastructureParagraphs
          : defaults.infrastructureSection.paragraphs,
    },
    partnerSection: data?.partner_section || defaults.partnerSection,
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
