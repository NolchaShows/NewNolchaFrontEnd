import { resolveStrapiFileUrl, unwrapStrapiEntry } from "@/lib/strapiMediaUrl";

const normLinks = (column) => {
  if (!column?.links || !Array.isArray(column.links)) return [];
  return column.links
    .map((item) => ({
      label: (item?.label || "").trim(),
      href: (item?.href || "").trim(),
    }))
    .filter((l) => l.label && l.href);
};

export const DEFAULT_FOOTER_CONTENT = {
  stayInformed: {
    title: "Stay Informed",
    description:
      "Get updates on upcoming events, sponsorship opportunities, and partner announcements.",
  },
  logoUrl: "/footer/logo.png",
  description:
    "Nolcha has been at the forefront of technology, culture, and immersive experiences producing high-impact events, summits, and activations for visionary brands and the world's leading blockchain, AI, and crypto conferences..",
  socialLinks: [
    {
      platform: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.nolcha.com%2Fcontent-for-swiper-with-popup%2Fart-basel-2025-xw6ct",
    },
    { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/nolchashows" },
    { platform: "x", label: "X", url: "https://x.com/nolchashows" },
  ],
  quickLinks: {
    title: "Quick Links:",
    links: [
      { label: "White Label", href: "/white-label" },
      { label: "Press", href: "/press" },
      { label: "Speakers", href: "/speakers" },
      { label: "Featured Artists", href: "/featured-artists" },
      { label: "Designers", href: "/designers" },
    ],
  },
  resources: {
    title: "Helpful Resources:",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms-of-use" },
    ],
  },
  contact: {
    title: "Lets Talk",
    company: "NOLCHA",
    address: "1345 Ave of the Americas, 2nd floor, New York, NY 10105",
    email: "Partnerships@nolcha.com",
  },
  copyright: "Copyright © 2026 Nolcha, All rights reserved",
};

/**
 * @param {unknown} data - Strapi `data` payload (or full response body)
 * @returns {typeof DEFAULT_FOOTER_CONTENT}
 */
const normSocialLinks = (links) => {
  if (!Array.isArray(links)) return [];
  return links
    .map((item) => {
      const raw = unwrapStrapiEntry(item) || item;
      const platform = String(raw?.platform || "other").toLowerCase();
      const url = String(raw?.url || "").trim();
      const label =
        String(raw?.label || "").trim() ||
        (platform === "x" ? "X" : platform.charAt(0).toUpperCase() + platform.slice(1));
      return { platform, label, url };
    })
    .filter((item) => item.url);
};

export function mapStrapiDataToFooterContent(data) {
  const raw = data?.data != null ? data.data : data;
  const f = unwrapStrapiEntry(raw) || raw;
  if (!f || typeof f !== "object") {
    return { ...DEFAULT_FOOTER_CONTENT };
  }

  const logoFromStrapi = resolveStrapiFileUrl(f.logo);
  const quick = f.quick_links;
  const res = f.resources;
  const contact = f.contact;

  const quickTitle = (quick?.title || DEFAULT_FOOTER_CONTENT.quickLinks.title).trim();
  const quickList = normLinks(quick);
  const resTitle = (res?.title || DEFAULT_FOOTER_CONTENT.resources.title).trim();
  const resList = normLinks(res);
  const socialFromCms = normSocialLinks(f.social_links);
  const socialLinks =
    socialFromCms.length > 0 ? socialFromCms : DEFAULT_FOOTER_CONTENT.socialLinks;

  return {
    stayInformed: {
      title:
        (f.stay_informed_title && String(f.stay_informed_title).trim()) ||
        DEFAULT_FOOTER_CONTENT.stayInformed.title,
      description:
        (f.stay_informed_description && String(f.stay_informed_description).trim()) ||
        DEFAULT_FOOTER_CONTENT.stayInformed.description,
    },
    logoUrl: logoFromStrapi || DEFAULT_FOOTER_CONTENT.logoUrl,
    description: (f.description && String(f.description).trim()) || DEFAULT_FOOTER_CONTENT.description,
    socialLinks,
    quickLinks: {
      title: quickTitle,
      links: quickList.length > 0 ? quickList : DEFAULT_FOOTER_CONTENT.quickLinks.links,
    },
    resources: {
      title: resTitle,
      links: resList.length > 0 ? resList : DEFAULT_FOOTER_CONTENT.resources.links,
    },
    contact: {
      title: (contact?.title && String(contact.title).trim()) || DEFAULT_FOOTER_CONTENT.contact.title,
      company: (contact?.company && String(contact.company).trim()) || DEFAULT_FOOTER_CONTENT.contact.company,
      address: (contact?.address && String(contact.address).trim()) || DEFAULT_FOOTER_CONTENT.contact.address,
      email: (contact?.email && String(contact.email).trim()) || DEFAULT_FOOTER_CONTENT.contact.email,
    },
    copyright: (f.copyright && String(f.copyright).trim()) || DEFAULT_FOOTER_CONTENT.copyright,
  };
}
