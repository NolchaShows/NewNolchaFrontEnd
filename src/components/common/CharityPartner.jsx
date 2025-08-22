import React from 'react'
import Hero from '../landing/Hero'
import Gallery from '../experiences/Gallery'
import TextHero from '../charity_partners/TextHero'

const CharityPartner = ({
    mainHeading,
    subHeading,
    conferenceImages,
    textImages,
    galleryImages
}) => {
    console.log(textImages)
    return (
        <div className="w-full bg-white">
            <div className="py-8 px-4 ml-5">
                <h1 className="text-2xl md:text-3xl font-bold text-black mb-2 tracking-wide">
                    {mainHeading}
                </h1>
                <p className="text-gray-600 text-sm md:text-base font-medium">
                    {subHeading}
                </p>
            </div>

            <Hero images={conferenceImages}/>
            <TextHero images={textImages}/>
            <Gallery images={galleryImages}/>
        </div>
    )
}

export default CharityPartner