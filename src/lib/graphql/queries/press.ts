import { gql } from "@apollo/client";

export const PRESS_MEDIA_FIELDS = gql`
  fragment PressMediaFields on UploadFile {
    url
    name
    mime
    width
    height
    formats
  }
`;

export const GET_PRESS_PAGE = gql`
  query GetPressPage {
    pressPage {
      mediaCoverage {
        title
        paragraphText
        linkText
        linkUrl
        image {
          ...PressMediaFields
        }
      }
      pressCards {
        title
        link
        newsPaperLogo {
          ...PressMediaFields
        }
        image {
          ...PressMediaFields
        }
      }
    }
  }

  ${PRESS_MEDIA_FIELDS}
`;
