import { resolveStrapiFileUrl } from "@/lib/strapiMediaUrl";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "https://new-nolcha-strapi-uiai.onrender.com";
const STRAPI_API_TOKEN =
  process.env.STRAPI_SERVER_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const DEFAULT_FETCH_OPTIONS = { next: { revalidate: 60 } };

const pickCharityNavImage = (page) => {
  const listingImage = resolveStrapiFileUrl(page?.listingImage);
  if (listingImage) return listingImage;

  const hero = page?.hero;
  if (!hero || typeof hero !== "object") return null;

  const video = hero.video;
  const videoIsImage =
    video &&
    typeof video === "object" &&
    String(video.mime || "").startsWith("image/");

  return (
    resolveStrapiFileUrl(hero.thumbnail) ||
    (videoIsImage ? resolveStrapiFileUrl(video) : null)
  );
};

/**
 * Fetch data from Strapi API (server-side; ISR cached by default).
 */
export async function fetchFromStrapi(endpoint, options = {}) {
  const url = `${STRAPI_URL}/api/${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const { next, signal, ...rest } = options;

  try {
    const response = await fetch(url, {
      ...DEFAULT_FETCH_OPTIONS,
      ...rest,
      next: next ?? DEFAULT_FETCH_OPTIONS.next,
      headers,
      signal: signal ?? AbortSignal.timeout(60_000),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching from Strapi:", endpoint, error);
    throw error;
  }
}

export async function getNavigationMenu() {
  try {
    const populateQuery = [
      "populate[0]=items",
      "populate[1]=items.image",
      "populate[2]=items.children",
      "populate[3]=items.children.image",
    ].join("&");

    const data = await fetchFromStrapi(`navigation-menu?${populateQuery}`);
    if (!data?.data) return null;

    const navigationMenu = data.data.attributes || data.data;
    return { data: { attributes: navigationMenu } };
  } catch {
    return null;
  }
}

/** Shallow home-page slice for navbar upcoming events (above-fold endpoint). */
export async function getHomePageForNavigation() {
  try {
    const data = await fetchFromStrapi("home-page");
    if (!data?.data) return null;
    return { data: { attributes: data.data?.attributes || data.data } };
  } catch {
    return null;
  }
}

export async function getFooterData() {
  try {
    const populate = [
      "populate[logo]=true",
      "populate[quick_links][populate][links]=true",
      "populate[resources][populate][links]=true",
      "populate[contact]=true",
      "populate[social_links]=true",
    ].join("&");
    return await fetchFromStrapi(`footer?${populate}`);
  } catch {
    return null;
  }
}

export async function getCharityPages() {
  try {
    const data = await fetchFromStrapi("charity-pages/navigation");
    if (!data?.data || !Array.isArray(data.data)) return [];

    return data.data
      .map((item) => {
        const page = item?.attributes ?? item;
        return {
          title: page?.title || "",
          slug: page?.slug || "",
          imageSrc: pickCharityNavImage(page),
        };
      })
      .filter((item) => item.title && item.slug);
  } catch {
    return [];
  }
}

export async function getDesignerPageData() {
  try {
    const qs = new URLSearchParams();
    qs.set("populate[hero][populate][video]", "true");
    qs.set("populate[artist_section][populate][media]", "true");

    let data;
    try {
      data = await fetchFromStrapi(`designer-page?${qs.toString()}`);
    } catch {
      data = await fetchFromStrapi("designer-page");
    }

    if (!data?.data) return null;
    return { data: { attributes: data.data } };
  } catch {
    return null;
  }
}

export async function getFeaturedArtistsPageData() {
  try {
    const qs = new URLSearchParams();
    qs.set("populate[hero][populate][video]", "true");
    qs.set("populate[artist_section][populate][media]", "true");

    let data;
    try {
      data = await fetchFromStrapi(`featured-artists-page?${qs.toString()}`);
    } catch {
      data = await fetchFromStrapi("featured-artists-page");
    }

    if (!data?.data) return null;
    return { data: { attributes: data.data } };
  } catch {
    return null;
  }
}

export async function getDesigners() {
  try {
    const data = await fetchFromStrapi("designers?populate[0]=listingImage");
    if (!data?.data) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getFeaturedArtists() {
  try {
    const data = await fetchFromStrapi(
      "featured-artists?populate[0]=listingImage"
    );
    if (!data?.data) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getPrivacyPolicyPageData() {
  try {
    const data = await fetchFromStrapi("privacy-policy-page");
    if (!data?.data) return null;
    return { data: { attributes: data.data?.attributes || data.data } };
  } catch {
    return null;
  }
}

export async function getTermsOfUsePageData() {
  try {
    const data = await fetchFromStrapi("terms-of-use-page");
    if (!data?.data) return null;
    return { data: { attributes: data.data?.attributes || data.data } };
  } catch {
    return null;
  }
}

export async function getExperiencesPageData() {
  try {
    const data = await fetchFromStrapi(
      "experiences-page?populate[seo][populate][0]=ogImage"
    );
    if (!data?.data) return null;
    return { data: { attributes: data.data?.attributes || data.data } };
  } catch {
    return null;
  }
}
