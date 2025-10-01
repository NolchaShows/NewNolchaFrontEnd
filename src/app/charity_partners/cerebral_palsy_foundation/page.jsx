"use client";
import CharityPartner from '@/components/common/CharityPartner'
import { useCharityPartnerData } from '@/utils/charityPartnerUtils'
import React from 'react'

const Page = () => {
  const { charityData, loading, error } = useCharityPartnerData(
    'cerebral_palsy_foundation',
    'Cerebral Palsy Foundation',
    'Fashion Runway'
  );

  if (loading) {
    return (
      <div className="w-full bg-white min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !charityData) {
    return (
      <div className="w-full bg-white min-h-screen flex items-center justify-center">
        <div className="text-xl">{error || 'Content not found'}</div>
      </div>
    );
  }

  return (
    // Merge in organization-specific defaults when the CMS is missing content
    <CharityPartner {...(() => {
      const defaults = {
        contentCard: {
          title: 'Design Cares Fashion Show Presents Kaleidoscope Fundraiser',
          description: "Our partnership with St. Jude Children’s Research Hospital commenced over 15 years ago, launching the Design Cares Fashion Show Presents Kaleidoscope fundraiser in support of St. Jude's mission.",
          image: '/charity_partners/cerebral/content.png'
        },
        textCards: [
          {
            image: '/charity_partners/cerebral/image/4.png',
            text: "When I think of fashion, I think of expression: really showing what you have on the inside on the outside. Working with the students, and model mentors with disabilities to make this happen was a joyful experience.\n\nI am so thrilled to have been part of this project – and to see the extraordinary work and how well it was received. - Anna Sui, Show Mentor & Fashion Designer",
            subtext: null,
            imagePosition: 'left',
            cardNumber: 1,
          },
          {
            image: '/charity_partners/cerebral/image/5.png',
            text: "Models included Madison Ferris, who starred as Laura Wingfield in Sam Gold’s production of “The Glass Menagerie;” Andrea Dalzell, a former Miss Wheelchair New York, and Jessy Yates, the first physically disabled person to be admitted to Yale’s Graduate School of Drama.\n\nIt’s tough to admit, but it’s often hard for people to see past disability, said Yates. There are so many misconceptions and misperceptions. What better way to change this than by creating fashion that helps us to see it all differently?",
            subtext: null,
            imagePosition: 'right',
            cardNumber: 2,

          },
          {
            image: '/charity_partners/cerebral/image/6.png',
            text: "Our partnership with St. Jude Children’s Research Hospital commenced over 15 years ago, launching the Design Cares Fashion Show Presents Kaleidoscope fundraiser in support of St. Jude's mission.\n\nI am so thrilled to have been part of this project – and to see the extraordinary work and how well it was received. - Anna Sui, Show Mentor & Fashion Designer",
            subtext: null,
            imagePosition: 'left',
            cardNumber: 3,

          }
        ],
        textHeroData: {
          slides: [
            {
              main_image: { url: '/home/hero.png' },
              second_image: { url: '/home/forbes.png' },
              description: "Our partnership with St. Jude Children’s Research Hospital commenced over 15 years ago, launching the Design Cares Fashion Show Presents Kaleidoscope fundraiser in support of St. Jude's mission."
            },
            {
              main_image: { url: '/home/hero.png' },
              second_image: { url: '/home/forbes.png' },
              description: "Nolcha Shows Returns To Art Basel Miami Beach Featuring Leading Web3 Brands."
            }
          ]
        }
      };

      // Detect CMS fallback markers and only then apply the richer defaults
      const isFallbackCard = charityData?.contentCard && (charityData.contentCard.title === 'Content Coming Soon' || charityData.contentCard.title === 'Unable to Load Content');

      if (isFallbackCard) {
        return {
          ...charityData,
          contentCard: defaults.contentCard,
          textCards: (charityData.textCards && charityData.textCards.length > 0) ? charityData.textCards : defaults.textCards,
          textHeroData: (charityData.textHeroData && charityData.textHeroData.slides && charityData.textHeroData.slides.length > 0) ? charityData.textHeroData : defaults.textHeroData
        };
      }

      return charityData;
    })()} />
  )
}

export default Page