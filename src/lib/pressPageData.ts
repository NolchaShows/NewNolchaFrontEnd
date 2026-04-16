import client from "@/lib/graphql/apollo-client";
import { GET_PRESS_PAGE } from "@/lib/graphql/queries/press";
import type { GetPressPageQuery } from "@/lib/graphql/__generated__/graphql";

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

type PressMedia = {
  url?: string | null;
  formats?: { [key: string]: { url?: string | null } | undefined } | null;
} | null;

const getMediaUrl = (media: PressMedia) => {
  const formats = media?.formats ?? undefined;
  const formatUrl =
    formats?.large?.url ?? formats?.medium?.url ?? formats?.thumbnail?.url;
  return toAbsoluteUrl(media?.url ?? formatUrl ?? null);
};

export type PressAboutSection = {
  title: string;
  paragraphText: string;
  link: string;
  linkText: string;
  image: string;
};

export type PressCardItem = {
  id: number;
  newsPaper: string;
  image: string;
  title: string;
  link: string;
};

export type PressStatementProps = {
  label?: string;
  headline?: string;
  ctaText?: string;
  ctaHref?: string;
};

export const DUMMY_STATEMENT: PressStatementProps = {
  label: "[ PROJECTS ]",
  headline:
    "NOLCHA'S PROJECTS CONNECT STRATEGY, CREATIVITY, AND PRODUCTION IN A NEW PRACTICE TO CREATE WORLDS THAT INSPIRE, ENTERTAIN, AND ENRICH.",
  ctaText: "GET IN TOUCH",
  ctaHref: "/contact-us",
};

export const DUMMY_ABOUT: PressAboutSection = {
  title: "Press & media",
  paragraphText:
    "Nolcha partners with leading outlets and creators to tell stories at the intersection of fashion, technology, and culture. Reach out for coverage, interviews, and partnerships.",
  link: "/contact-us",
  linkText: "Get in touch",
  image: "/home/slider9.jpg",
};

export const DUMMY_CARDS: PressCardItem[] = [
  {
    id: 1,
    title: "Featured coverage",
    link: "/contact-us",
    newsPaper: "/home/logo-slider/forbes.webp",
    image: "/home/slider9.jpg",
  },
  {
    id: 2,
    title: "Industry spotlight",
    link: "/contact-us",
    newsPaper: "/home/logo-slider/vogue.webp",
    image: "/home/slider9.jpg",
  },
];

function mapGraphqlPressPage(pressPage: NonNullable<GetPressPageQuery["pressPage"]>): {
  aboutSection: PressAboutSection | null;
  cards: PressCardItem[];
  statementProps: PressStatementProps;
} {
  const mediaCoverage = pressPage.mediaCoverage ?? null;
  const aboutSection = mediaCoverage
    ? {
        title: mediaCoverage.title ?? "",
        paragraphText: mediaCoverage.paragraphText ?? "",
        link: mediaCoverage.linkUrl ?? "",
        linkText: mediaCoverage.linkText ?? "",
        image: getMediaUrl(mediaCoverage.image as PressMedia) ?? "",
      }
    : null;

  const cards = (pressPage.pressCards ?? []).flatMap((card, index) => {
    if (!card) return [];
    const newsPaper = getMediaUrl(card.newsPaperLogo as PressMedia) ?? "";
    const image = getMediaUrl(card.image as PressMedia) ?? "";
    if (!card.title && !card.link && !newsPaper && !image) return [];
    return [
      {
        id: index + 1,
        newsPaper,
        image,
        title: card.title ?? "",
        link: card.link ?? "",
      },
    ];
  });

  const statement = pressPage.statementSection ?? null;
  const statementProps: PressStatementProps = statement
    ? {
        label: statement.label ?? undefined,
        headline: statement.headline ?? undefined,
        ctaText: statement.ctaText ?? undefined,
        ctaHref: statement.ctaUrl ?? undefined,
      }
    : {};

  return {
    aboutSection: aboutSection?.title || aboutSection?.paragraphText ? aboutSection : null,
    cards,
    statementProps,
  };
}

function pickAttributes(payload: any) {
  return payload?.data?.attributes ?? payload?.data ?? null;
}

function mapRestToPressPage(json: any): {
  aboutSection: PressAboutSection | null;
  cards: PressCardItem[];
  statementProps: PressStatementProps;
} {
  const attrs = pickAttributes(json);
  if (!attrs) {
    return { aboutSection: null, cards: [], statementProps: {} };
  }

  const mc = attrs.mediaCoverage ?? attrs.media_coverage;
  let aboutSection: PressAboutSection | null = null;
  if (mc && typeof mc === "object") {
    const img = mc.image?.data?.attributes ?? mc.image;
    aboutSection = {
      title: mc.title ?? "",
      paragraphText: mc.paragraphText ?? mc.paragraph_text ?? "",
      link: mc.linkUrl ?? mc.link_url ?? "",
      linkText: mc.linkText ?? mc.link_text ?? "",
      image: getMediaUrl(img as PressMedia) ?? "",
    };
    if (!aboutSection.title && !aboutSection.paragraphText) {
      aboutSection = null;
    }
  }

  const rawCards = attrs.pressCards ?? attrs.press_cards ?? [];
  const list = Array.isArray(rawCards)
    ? rawCards
    : Array.isArray(rawCards?.data)
      ? rawCards.data
      : [];

  const cards: PressCardItem[] = [];

  list.forEach((entry: any, index: number) => {
    const card = entry?.attributes ?? entry;
    if (!card) return;
    const newsPaper = getMediaUrl(
      (card.newsPaperLogo?.data?.attributes ?? card.newsPaperLogo) as PressMedia
    ) ?? "";
    const image = getMediaUrl((card.image?.data?.attributes ?? card.image) as PressMedia) ?? "";
    if (!card.title && !card.link && !newsPaper && !image) return;
    cards.push({
      id: index + 1,
      newsPaper,
      image,
      title: card.title ?? "",
      link: card.link ?? "",
    });
  });

  const st = attrs.statementSection ?? attrs.statement_section;
  let statementProps: PressStatementProps = {};
  if (st && typeof st === "object") {
    statementProps = {
      label: typeof st.label === "string" ? st.label : undefined,
      headline: typeof st.headline === "string" ? st.headline : undefined,
      ctaText: typeof st.ctaText === "string" ? st.ctaText : undefined,
      ctaHref: typeof st.ctaUrl === "string" ? st.ctaUrl : undefined,
    };
  }

  return { aboutSection, cards, statementProps };
}

async function fetchPressPageRest(): Promise<any | null> {
  const urls = [
    `${STRAPI_BASE}/api/press-page?populate=*`,
    `${STRAPI_BASE}/api/press-page?populate[mediaCoverage][populate]=image&populate[pressCards][populate][0]=newsPaperLogo&populate[pressCards][populate][1]=image&populate[statementSection]=true`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 60 },
        headers: { ...authHeaders() },
      });
      if (res.ok) return await res.json();
    } catch {
      /* next url */
    }
  }
  return null;
}

function pickAbout(section: PressAboutSection | null): PressAboutSection | null {
  if (!section) return null;
  return section.title || section.paragraphText ? section : null;
}

export async function getPressPageContent(): Promise<{
  aboutSection: PressAboutSection;
  cards: PressCardItem[];
  statementProps: PressStatementProps;
}> {
  let graphql: ReturnType<typeof mapGraphqlPressPage> | null = null;

  try {
    const { data } = await client().query<GetPressPageQuery>({
      query: GET_PRESS_PAGE,
    });
    if (data?.pressPage) {
      graphql = mapGraphqlPressPage(data.pressPage);
    }
  } catch {
    graphql = null;
  }

  if (graphql && !graphql.aboutSection && graphql.cards.length === 0) {
    graphql = null;
  }

  let restMapped: ReturnType<typeof mapRestToPressPage> | null = null;
  const restJson = await fetchPressPageRest();
  if (restJson) {
    restMapped = mapRestToPressPage(restJson);
  }

  const aboutSection =
    pickAbout(graphql?.aboutSection ?? null) ??
    pickAbout(restMapped?.aboutSection ?? null) ??
    DUMMY_ABOUT;

  const cardsFromGraphql =
    graphql && graphql.cards.length > 0 ? graphql.cards : null;
  const cardsFromRest =
    restMapped && restMapped.cards.length > 0 ? restMapped.cards : null;
  const cards = cardsFromGraphql ?? cardsFromRest ?? DUMMY_CARDS;

  const statementFromRest = restMapped?.statementProps ?? {};
  const statementFromGraphql = graphql?.statementProps ?? {};
  const statementProps: PressStatementProps = {
    ...DUMMY_STATEMENT,
    ...statementFromGraphql,
    ...statementFromRest,
  };

  return {
    aboutSection,
    cards,
    statementProps,
  };
}
