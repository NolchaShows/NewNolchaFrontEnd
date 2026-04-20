import client from "@/lib/graphql/apollo-client";
import { GET_ABOUT_PAGE } from "@/lib/graphql/queries/about";

const STRAPI_BASE =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ??
  (process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT ?? "https://new-nolcha-strapi.onrender.com/graphql").replace(
    /\/graphql\/?$/,
    ""
  );

function authHeaders(): HeadersInit {
  const token =
    process.env.STRAPI_SERVER_TOKEN ?? process.env.NEXT_PUBLIC_STRAPI_CLIENT_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const toAbsoluteUrl = (url?: string | null) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_BASE}${url}`;
};

type AboutMedia = {
  url?: string | null;
  formats?: { [key: string]: { url?: string | null } | undefined } | null;
} | null;

const getMediaUrl = (media: AboutMedia) => {
  const formatUrl =
    media?.formats?.large?.url ?? media?.formats?.medium?.url ?? media?.formats?.thumbnail?.url;
  return toAbsoluteUrl(media?.url ?? formatUrl ?? null);
};

export const DUMMY_ABOUT_PAGE = {
  heroVideo:
    "https://pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev/homepage/homepage-1.mp4",
  statementSection: {
    label: "[ WHO WE ARE ]",
    headline: "MATTE IS A CREATIVE COMPANY FROM NEW YORK",
    description:
      "At the intersection of entertainment and advertising. MATTE is a brand of 10 years-serving its own audience whilst offering multidisciplinary strategic, creative, and production services for brands and artists, and exposing the opportunities in between.",
    ctaText: "GET IN TOUCH",
    ctaHref: "/contact-us",
    rightItems: ["WE BUILD WORLDS", "WE CREATE CHARACTERS", "WE ENTERTAIN THEM"],
  },
  differentiators: {
    label: "[ OUR DIFFERENTIATORS ]",
    items: [
      {
        title: "BORN IN ENTERTAINMENT",
        description:
          "Creative for the sake of it. A collective desire to put new creative products into the world. Experiences, stories, MATTE-owned IP.",
      },
      {
        title: "BUILT A CULTURE AND A FOLLOWING",
        description:
          "Amassing fans of the work. Fostering a community. Building a global network taste-makers. Attracting the attention brands.",
      },
      {
        title: "CREATING BRAND WORLDS",
        description:
          "Providing strategic and creative expertise-as well as good taste-to category-leading brands. Shaping the mark they make on culture at large.",
      },
    ],
  },
  services: {
    label: "[ OUR SERVICES ]",
    title: "MATTE HAS A MULTIDISCIPLINARY STUDIO THAT WORKS WITH TALENT AND BRANDS",
    ctaText: "SEE ALL PROJECTS",
    ctaHref: "/projects",
    videoSrc: "/video.mp4",
    stories: [
      {
        title: "World Building",
        description:
          "At MATTE Projects, we see brands as immersive worlds. Each brand we create is a full sensory experience, blending art, music, and design to reflect its community's values and aspirations. We handle everything from brand strategy and design systems to content and community engagement, crafting a brand world people want to join.",
      },
      {
        title: "Experiential",
        description:
          "Creating experiences that make people feel something is our bread and butter. At MATTE, we bring elements of entertainment to craft experiential moments that people seek out and cherish.",
      },
    ],
  },
  ecosystem: {
    label: "[ OUR ECOSYSTEM ]",
    title: "MATTE'S UNIQUE ECOSYSTEM",
    imageSrc: "/about/ecosystem.webp",
  },
  clients: {
    label: "[ OUR CLIENTS ]",
    title: "CATEGORY AGNOSTIC PARTNER PORTFOLIO",
    description:
      "At MATTE, our diverse client portfolio spans various industries, enabling us to approach each project uniquely. Working across diverse industries provides us with cross-industry insights, allowing us to create impactful work that influences culture and identify unique partnership opportunities.",
    ctaText: "CONTACT US",
    ctaHref: "/contact-us",
    logos: [
      "/home/logo-slider/forbes.webp",
      "/landing/forbes.svg",
      "/home/logo-slider/vogue.webp",
      "/home/logo-slider/wwd.webp",
      "/home/logo-slider/adage.webp",
      "/home/logo-slider/one37.webp",
      "/home/logo-slider/coindesk.webp",
      "/home/logo-slider/cointale.webp",
      "/home/logo-slider/nftnow.webp",
    ],
  },
  press: {
    label: "[ PRESS ]",
    title: "MATTE MOVES PEOPLE TO MAKE CULTURE, TOGETHER",
    viewMoreText: "VIEW MORE",
    viewMoreHref: "/press",
    featureDate: "April 11, 2024",
    featureTitle: "PUMA WANTS TO SPRINT IN OLYMPICS BRAND RACE AGAINST NIKE AND ADIDAS",
    featureSource: "ADWEEK",
    featureImage: "/about/press.webp",
  },
};

function pickAttributes(payload: any) {
  return payload?.data?.attributes ?? payload?.data ?? null;
}

function normalizeStories(stories: any[] = []) {
  return stories
    .map((story) => ({
      title: story?.title ?? "",
      description: story?.description ?? "",
    }))
    .filter((s) => s.title || s.description);
}

function normalizeStringItems(items: any[] = []) {
  return items
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (typeof item?.text === "string") return item.text.trim();
      if (typeof item?.value === "string") return item.value.trim();
      return "";
    })
    .filter(Boolean);
}

function mapGraphql(data: any) {
  const page = data?.aboutPage;
  if (!page) return null;

  return {
    heroVideo: getMediaUrl(page.heroVideo as AboutMedia),
    statementSection: {
      label: page.statementSection?.label ?? undefined,
      headline: page.statementSection?.headline ?? undefined,
      description: page.statementSection?.description ?? undefined,
      ctaText: page.statementSection?.ctaText ?? undefined,
      ctaHref: page.statementSection?.ctaUrl ?? undefined,
      rightItems: normalizeStringItems(page.statementSection?.rightItems || []),
    },
    differentiators: {
      label: page.differentiatorsSection?.label ?? undefined,
      items: normalizeStories(page.differentiatorsSection?.items || []),
    },
    services: {
      label: page.servicesSection?.label ?? undefined,
      title: page.servicesSection?.title ?? undefined,
      ctaText: page.servicesSection?.ctaText ?? undefined,
      ctaHref: page.servicesSection?.ctaUrl ?? undefined,
      videoSrc: getMediaUrl(page.servicesSection?.video as AboutMedia) ?? undefined,
      stories: normalizeStories(page.servicesSection?.stories || []),
    },
    ecosystem: {
      label: page.ecosystemSection?.label ?? undefined,
      title: page.ecosystemSection?.title ?? undefined,
      imageSrc: getMediaUrl(page.ecosystemSection?.image as AboutMedia) ?? undefined,
    },
    clients: {
      label: page.clientsSection?.label ?? undefined,
      title: page.clientsSection?.title ?? undefined,
      description: page.clientsSection?.description ?? undefined,
      ctaText: page.clientsSection?.ctaText ?? undefined,
      ctaHref: page.clientsSection?.ctaUrl ?? undefined,
      logos: (page.clientsSection?.logos || [])
        .map((logo: any) => getMediaUrl(logo as AboutMedia))
        .filter(Boolean),
    },
    press: {
      label: page.pressSection?.label ?? undefined,
      title: page.pressSection?.title ?? undefined,
      viewMoreText: page.pressSection?.viewMoreText ?? undefined,
      viewMoreHref: page.pressSection?.viewMoreUrl ?? undefined,
      featureDate: page.pressSection?.featureDate ?? undefined,
      featureTitle: page.pressSection?.featureTitle ?? undefined,
      featureSource: page.pressSection?.featureSource ?? undefined,
      featureImage: getMediaUrl(page.pressSection?.featureImage as AboutMedia) ?? undefined,
    },
  };
}

function mapRest(json: any) {
  const attrs = pickAttributes(json);
  if (!attrs) return null;

  const getComp = (camel: string, snake: string) => attrs[camel] ?? attrs[snake] ?? null;
  const statement = getComp("statementSection", "statement_section") || {};
  const differentiators = getComp("differentiatorsSection", "differentiators_section") || {};
  const services = getComp("servicesSection", "services_section") || {};
  const ecosystem = getComp("ecosystemSection", "ecosystem_section") || {};
  const clients = getComp("clientsSection", "clients_section") || {};
  const press = getComp("pressSection", "press_section") || {};

  return {
    heroVideo: getMediaUrl((attrs.heroVideo?.data?.attributes ?? attrs.heroVideo) as AboutMedia),
    statementSection: {
      label: statement.label,
      headline: statement.headline,
      description: statement.description,
      ctaText: statement.ctaText,
      ctaHref: statement.ctaUrl,
      rightItems: normalizeStringItems(statement.rightItems || []),
    },
    differentiators: {
      label: differentiators.label,
      items: normalizeStories(differentiators.items || []),
    },
    services: {
      label: services.label,
      title: services.title,
      ctaText: services.ctaText,
      ctaHref: services.ctaUrl,
      videoSrc: getMediaUrl((services.video?.data?.attributes ?? services.video) as AboutMedia) ?? undefined,
      stories: normalizeStories(services.stories || []),
    },
    ecosystem: {
      label: ecosystem.label,
      title: ecosystem.title,
      imageSrc: getMediaUrl((ecosystem.image?.data?.attributes ?? ecosystem.image) as AboutMedia) ?? undefined,
    },
    clients: {
      label: clients.label,
      title: clients.title,
      description: clients.description,
      ctaText: clients.ctaText,
      ctaHref: clients.ctaUrl,
      logos: (clients.logos?.data || clients.logos || [])
        .map((logo: any) => getMediaUrl((logo?.attributes ?? logo) as AboutMedia))
        .filter(Boolean),
    },
    press: {
      label: press.label,
      title: press.title,
      viewMoreText: press.viewMoreText,
      viewMoreHref: press.viewMoreUrl,
      featureDate: press.featureDate,
      featureTitle: press.featureTitle,
      featureSource: press.featureSource,
      featureImage: getMediaUrl((press.featureImage?.data?.attributes ?? press.featureImage) as AboutMedia) ?? undefined,
    },
  };
}

async function fetchAboutPageRest() {
  const url = `${STRAPI_BASE}/api/about-page?populate[heroVideo]=true&populate[statementSection]=true&populate[differentiatorsSection][populate][items]=true&populate[servicesSection][populate][0]=stories&populate[servicesSection][populate][1]=video&populate[ecosystemSection][populate]=image&populate[clientsSection][populate]=logos&populate[pressSection][populate]=featureImage`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { ...authHeaders() },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function mergeDeep(base: any, incoming: any) {
  if (!incoming) return base;
  return {
    ...base,
    ...incoming,
    statementSection: { ...base.statementSection, ...incoming.statementSection },
    differentiators: {
      ...base.differentiators,
      ...incoming.differentiators,
      items:
        incoming.differentiators?.items?.length > 0
          ? incoming.differentiators.items
          : base.differentiators.items,
    },
    services: {
      ...base.services,
      ...incoming.services,
      stories:
        incoming.services?.stories?.length > 0 ? incoming.services.stories : base.services.stories,
    },
    ecosystem: { ...base.ecosystem, ...incoming.ecosystem },
    clients: {
      ...base.clients,
      ...incoming.clients,
      logos: incoming.clients?.logos?.length > 0 ? incoming.clients.logos : base.clients.logos,
    },
    press: { ...base.press, ...incoming.press },
  };
}

export async function getAboutPageContent() {
  let graphqlMapped = null;
  try {
    const { data } = await client().query({ query: GET_ABOUT_PAGE });
    graphqlMapped = mapGraphql(data);
  } catch {
    graphqlMapped = null;
  }

  const restJson = await fetchAboutPageRest();
  const restMapped = restJson ? mapRest(restJson) : null;

  return mergeDeep(mergeDeep(DUMMY_ABOUT_PAGE, graphqlMapped), restMapped);
}
