import { gql } from "@apollo/client";

export const MEDIA_IMAGE_FIELDS = gql`
  fragment MediaImageFields on UploadFile {
    url
    name
    width
    height
    mime
    ext
    formats
  }
`;

export const MEDIA_VIDEO_FIELDS = gql`
  fragment MediaVideoFields on UploadFile {
    url
    name
    width
    height
    mime
    ext
  }
`;

export const EXPERIENCE_BLOCK_THREE_IMAGE_ROW = gql`
  fragment ExperienceBlockThreeImageRow on ComponentBlocksThreeImageRow {
    __typename
    firstImage {
      ...MediaImageFields
    }
    secondImage {
      ...MediaImageFields
    }
    thirdImage {
      ...MediaImageFields
    }
  }
`;

export const EXPERIENCE_BLOCK_FASHION_GRID_SECTION = gql`
  fragment ExperienceBlockFashionGridSection on ComponentBlocksFashionGridSection {
    __typename
    leftVideo {
      ...MediaVideoFields
    }
    rightVideo {
      ...MediaVideoFields
    }
    topImage {
      ...MediaImageFields
    }
    middleImage1 {
      ...MediaImageFields
    }
    middleImage2 {
      ...MediaImageFields
    }
    middleImage3 {
      ...MediaImageFields
    }
    bottomImage {
      ...MediaImageFields
    }
  }
`;

export const EXPERIENCE_BLOCK_IMAGE_TEXT_SECTION = gql`
  fragment ExperienceBlockImageTextSection on ComponentBlocksImageTextSection {
    __typename
    title
    description
    tagsLabel
    tags {
      text
    }
    image {
      ...MediaImageFields
    }
  }
`;

export const EXPERIENCE_BLOCK_EVENING_RECAP_SECTION = gql`
  fragment ExperienceBlockEveningRecapSection on ComponentBlocksEveningRecapSection {
    __typename
    title
    video {
      ...MediaVideoFields
    }
  }
`;

export const EXPERIENCE_BLOCK_GALLERY = gql`
  fragment ExperienceBlockGallery on ComponentBlocksGallery {
    __typename
    items {
      image {
        ...MediaImageFields
      }
    }
  }
`;

export const GET_EXPERIENCE_BY_SLUG = gql`
  query GetExperienceBySlug($slug: String!) {
    experiencePageBySlug(slug: $slug) {
      title
      slug
      hero {
        title
        subtitle
        video {
          ...MediaVideoFields
        }
      }
      blocks {
        __typename
        ...ExperienceBlockThreeImageRow
        ...ExperienceBlockFashionGridSection
        ...ExperienceBlockImageTextSection
        ...ExperienceBlockEveningRecapSection
        ...ExperienceBlockGallery
      }
    }
  }

  ${MEDIA_IMAGE_FIELDS}
  ${MEDIA_VIDEO_FIELDS}
  ${EXPERIENCE_BLOCK_THREE_IMAGE_ROW}
  ${EXPERIENCE_BLOCK_FASHION_GRID_SECTION}
  ${EXPERIENCE_BLOCK_IMAGE_TEXT_SECTION}
  ${EXPERIENCE_BLOCK_EVENING_RECAP_SECTION}
  ${EXPERIENCE_BLOCK_GALLERY}
`;

