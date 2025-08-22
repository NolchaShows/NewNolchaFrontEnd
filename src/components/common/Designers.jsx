import React from 'react'
import Hero from '../press/Hero'
import ArtistGallery from '../designers/ArtistsGallery'
import DynamicGallery from '../designers/DynamicGallery'
import PressMediaRecognition from '../designers/PressMediaRecognition'

const Designer = () => {
    const images = ["/designers/1.png"]
    const imagesGallery = [
        { image: "/designers/6.png", text: "YUE MINJUN" },
        { image: "/designers/7.png", text: "YUE MINJUN" },
        { image: "/designers/8.png", text: "YUE MINJUN" },
        { image: "/designers/9.png", text: "YUE MINJUN" },
        { image: "/designers/10.png", text: "YUE MINJUN" },
        { image: "/designers/11.png", text: "YUE MINJUN" },
        { image: "/designers/12.png", text: "YUE MINJUN" },
        { image: "/designers/13.png", text: "YUE MINJUN" },
        { image: "/designers/14.png", text: "YUE MINJUN" },
        { image: "/designers/15.png", text: "YUE MINJUN" },
        { image: "/designers/16.png", text: "YUE MINJUN" },
        { image: "/designers/17.png", text: "YUE MINJUN" },
    ]
    const sponsors = [
        "/designers/icons/1.png",
        "/designers/icons/2.png",
        "/designers/icons/3.png",
        "/designers/icons/4.png",
        "/designers/icons/5.png",
    ]


    return (
        <div>
            <Hero heading='Designers' images={images} />
            <ArtistGallery />
            <DynamicGallery imagesGallery={imagesGallery} />
            <PressMediaRecognition logos={sponsors} />
            <img
                src={"/designers/18.png"}
                alt={`Designers`}
                className="mt-10 mb-10 w-full object-contain"
            />
        </div>
    )
}

export default Designer