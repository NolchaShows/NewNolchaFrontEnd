import React from 'react'
import Hero from './Hero'
import { default as PressHero } from '../press/Hero'
import MagazineCard from './MagazineCard'
import { ImageSlider } from './ImageSlider'

const Designer = () => {
  const designerImages = [
    "/designers/jeremy/1.png",
  ]
  const magazine = {
    image: "/designers/jeremy/2.png",
    title: "JEREMY COWART'S CAREER HAS OFTEN BEEN CALLED A FORREST GUMP ART CAREER.",
    description: "\"He just chases ideas in whichever direction they lead him, finding himself in the most random new situations, moments of success and failure - all while dealing with his own little reputation ruining it all.\" Serendipity never really appeals to me unless the artist engages, reasons. From having met the internet's most influential artist when an MPEG1 video chain-blurring a worldwide type-back initiative or being followed at an art auction site despite not having a background lived... It's always something wildly surprising, even for Cowart himself. \"I don't tell quick or late photos and money never motivates me.\"\n\nIt's always about the idea, always has been and always will be. Some of the ideas fail miserably but the lessons learned are invaluable and immediately no chase the next one. I've done it for 20 years and I'll do it for the rest of my life. My hope is that the public sees my love for art and love for people through all of it.\""
  }
  const social = [
    "/designers/jeremy/3.png"
  ]

  const images = [
    "/designers/jeremy/4.png",
    "/designers/jeremy/5.png",
    "/designers/jeremy/6.png",
    "/designers/jeremy/7.png"

  ]
  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2">
          <Hero heading="JEREMY COWART" images={designerImages} />
        </div>

        <div className="w-full lg:w-1/2">
          <MagazineCard {...magazine} />
          <div className='mt-10'>
              <PressHero images={social} heading='INSTAGRAM' headerStyling='text-lg text-[#003233] font-semibold' />
          </div>
          <div className='ml-9 mr-9 mb-9'>
            <ImageSlider images={images} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Designer