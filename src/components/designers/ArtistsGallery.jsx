import React from "react";

const featuredArtists = [
  "FVCKRENDER",
  "JENNI PASANEN",
  "RON ENGLISH",
  "PARKER DAY",
  "JACK BUTCHER",
  "BEEPLE",
];

const allArtists = [
  "ONCHAINMONKEY",
  "WORLD OF WOMEN",
  "RON ENGLISH",
  "JEREMY COWART",
  "LINDSAY KOKOSKA",
  "PATRICK AMADON",
  "NODEMONKES",
  "KIRA BURSKY",
  "VINCENT D'ONOFRIO",
  "LATASHA",
  "VAKSEEN",
  "TALIA ZOREF",
  "ROB PRIOR",
  "LAURENCE FULLER",
  "JANEDAO",
  "IZZY WEISSGERBER",
  "GNETTA KRUESI",
  "JANEDAO",
  "YIYANG LU",
  "SKYE NICOLAS",
  "AEFORIA",
  "ARNO CARSTENS",
  "MOHSEN HAZRATI",
  "RAGZY X",
  "MUSKETON",
  "TILLAVISION",
  "MADE BY OONA",
  "STACIE ANT",
  "YOUNG & SICK",
];

const galleryImages = [
  {
    id: 1,
    src: "/designers/2.png",
    alt: "Warrior with sword in desert landscape",
    className: "aspect-[2/3]",
  },
  {
    id: 2,
    src: "/designers/3.png",
    alt: "Cyberpunk digital art with neon colors",
    className: "aspect-[2/3]",
  },
  {
    id: 3,
    src: "/designers/4.png",
    alt: "Vintage portrait with ornate frame",
    className: "aspect-[2/3]",
  },
  {
    id: 4,
    src: "/designers/5.png",
    alt: "Portrait with crystalline effects",
    className: "aspect-[2/3]",
  },
];

const ArtistGallery = () => {
  return (
    <section className="ml-6 mr-8 bg-[#F4F4F4] py-16 rounded-xl px-4">
      <div className="max-w-7xl mx-auto">
        {/* Featured Artists Header */}
        <div className="text-center mb-12">
          <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-60 flex flex-wrap justify-center items-center gap-2 sm:gap-4 mb-8">
            <span className="text-[#141414] text-lg sm:text-xl 2xl:text-2xl">✦</span>
            {featuredArtists.map((artist, index) => (
              <React.Fragment key={artist}>
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold 2xl:text-2xl text-[#141414] tracking-wide text-center">
                  {artist}
                </span>
                {index < featuredArtists.length - 1 && (
                  <span className="text-[#141414] text-lg sm:text-xl 2xl:text-2xl">✦</span>
                )}
              </React.Fragment>
            ))}
            <span className="text-[#141414] text-lg sm:text-xl 2xl:text-2xl">✦</span>
          </div>

          {/* All Artists List */}
          <div className="max-w-5xl mx-auto px-4">
            <p className="text-sm md:text-base 2xl:text-xl text-[#141414] leading-relaxed font-medium">
              {allArtists.join(" - ")}
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 2xl:gap-20 mt-30">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`${image.className
                } overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 
      ${index % 2 === 0 ? "-mt-4 md:-mt-8" : "mt-4 md:mt-8"}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistGallery;