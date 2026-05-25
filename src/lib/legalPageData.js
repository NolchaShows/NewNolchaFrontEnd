import {
  getPrivacyPolicyPageData,
  getTermsOfUsePageData,
} from "@/lib/strapi";
import { hasRenderableDescription } from "@/lib/strapiRichText";

function pickAttributes(payload) {
  return payload?.data?.attributes ?? payload?.data ?? null;
}

function mapLegalPage(attrs, defaults) {
  if (!attrs || typeof attrs !== "object") {
    return { ...defaults, fromStrapi: false };
  }

  const title = (attrs.title || defaults.title || "").trim();
  const intro = attrs.intro ?? attrs.introduction ?? null;
  const content = attrs.content ?? attrs.body ?? null;
  const hasStrapiBody =
    hasRenderableDescription(intro) || hasRenderableDescription(content);

  return {
    title: title || defaults.title,
    intro,
    content,
    fromStrapi: hasStrapiBody,
  };
}

export async function getPrivacyPolicyContent() {
  const defaults = { title: "Privacy Policy", intro: null, content: null, fromStrapi: false };
  try {
    const response = await getPrivacyPolicyPageData();
    return mapLegalPage(pickAttributes(response), defaults);
  } catch {
    return defaults;
  }
}

export async function getTermsOfUseContent() {
  const defaults = { title: "Terms of Use", intro: null, content: null, fromStrapi: false };
  try {
    const response = await getTermsOfUsePageData();
    return mapLegalPage(pickAttributes(response), defaults);
  } catch {
    return defaults;
  }
}
