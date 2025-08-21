"use client"
import React, { useState } from 'react'
import Hero from '../press/Hero'
import Gallery from '../experiences/Gallery'
import TextHero from '../charity_partners/TextHero'
import ContentCard from '../charity_partners/ContentCard'
import ImageTextCard from '../charity_partners/ImageTextCard'

const CharityPartner = ({
    mainHeading,
    subHeading,
    conferenceImages,
    contentCard,
    textCards,
    textImages,
    galleryImages
}) => {
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

            <Hero images={conferenceImages} />
            <ContentCard {...contentCard} />
            {textCards.map((card, index) => (
                <ImageTextCard key={index} image={card.image} text={card.text} imagePosition={index % 2 === 0 ? "left" : "right"} />
            ))}
            <TextHero images={textImages} />
            <Gallery images={galleryImages} />
        </div>
    )
}

export default CharityPartner