import { gql } from "@apollo/client";

export const ABOUT_MEDIA_FIELDS = gql`
  fragment AboutMediaFields on UploadFile {
    url
    name
    mime
    width
    height
    formats
  }
`;

export const GET_ABOUT_PAGE = gql`
  query GetAboutPage {
    aboutPage {
      heroVideo {
        ...AboutMediaFields
      }
      statementSection {
        label
        headline
        description
        ctaText
        ctaUrl
        rightItems {
          text
        }
      }
      differentiatorsSection {
        label
        items {
          title
          description
        }
      }
      servicesSection {
        label
        title
        ctaText
        ctaUrl
        video {
          ...AboutMediaFields
        }
        stories {
          title
          description
        }
      }
      clientsSection {
        label
        title
        description
        ctaText
        ctaUrl
        logos(pagination: { limit: 100 }) {
          ...AboutMediaFields
        }
      }
      pressSection {
        label
        title
        viewMoreText
        viewMoreUrl
      }
    }
  }

  ${ABOUT_MEDIA_FIELDS}
`;
