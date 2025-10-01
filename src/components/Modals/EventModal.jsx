"use client";
import React, { useEffect } from "react";
import EventCard from "../upcoming/EventCard";
import MediaCarousel from "../experiences/MediaCarousel";
import ImageCarousel from "../experiences/ImageCarousel";
import ImageStack from "../upcoming/ImageStack";
import { RxCross2 } from "react-icons/rx";

const EventModal = ({ setIsUpcomingModalOpen, eventModalData }) => {
  // Use dynamic data from Strapi if available, otherwise fallback to hardcoded data
  const eventCardData = eventModalData?.event_card;
  const mediaCarouselData = eventModalData?.media_carousal || [];
  const imageCarouselData = eventModalData?.image_carousal || [];
  const imageStackData = eventModalData?.image_stack || [];

  const posts = imageCarouselData.length > 0 
    ? imageCarouselData.flatMap(carousel => 
        carousel.carousal_item?.map(item => 
          item.image?.url 
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${item.image.url}`
            : item
        ) || []
      )
    : [
        "/experiences/jack/posts/1.png",
        "/experiences/jack/posts/2.png",
        "/experiences/jack/posts/3.png",
        "/experiences/jack/posts/4.png",
        "/experiences/jack/posts/5.png",
      ];

  const media = mediaCarouselData.length > 0
    ? mediaCarouselData.flatMap(mediaItem => mediaItem.url?.map(urlItem => urlItem.text) || [])
    : ["/experiences/jack/videos/2.mp4"];

  const images = imageStackData.length > 0
    ? imageStackData.map(img => 
        img.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${img.url}` : img
      )
    : [
        "/upcoming/4.png",
        "/upcoming/5.png",
        "/upcoming/6.png",
        "/upcoming/7.png",
      ];

  console.log('EventModal - eventModalData:', eventModalData);
  console.log('EventModal - posts:', posts);
  console.log('EventModal - media:', media);
  console.log('EventModal - images:', images);

  // 🔒 Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // restore on unmount
    };
  }, []);

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 py-4">
      <div className="bg-[#EBE2D7] rounded-2xl w-full max-w-none max-h-[90vh] my-10 mx-3 md:mx-10 shadow-lg overflow-hidden flex flex-col relative">
        <div className="p-8 overflow-y-auto overflow-x-hidden flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 relative">
          <button
            className="absolute top-3 right-7 z-10 text-[#000000] hover:text-gray-800 text-xl 2xl:text-4xl cursor-pointer w-8 h-8 2xl:w-16 2xl:h-16 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors duration-200"
            onClick={() => setIsUpcomingModalOpen(false)}
          >
            <RxCross2 />
          </button>
          <div className="py-10 md:py-6 2xl:py-14">
            <EventCard eventCardData={eventCardData} />
          </div>
          <div className="mt-[20px] md:mt-[42px]">
            <MediaCarousel items={media} />
          </div>
          <div className="mt-[20px] md:mt-[42px] bg-[#F4F4F4] mx-auto">
            <ImageCarousel
              posts={posts}
              title={imageCarouselData[0]?.title || "Trusted By"}
              padding="py-[40px] px-[30px] md:py-[80px] md:px-[60px] 2xl:py-[100px] 2xl:px-[80px]"
            />
          </div>
          <div className="mt-[20px] md:mt-[42px] py-[12px] px-[16px] lg:py-[70px] lg:px-[50px] 2xl:py-[90px] 2xl:px-[70px] bg-white rounded-[28px] mx-auto">
            <ImageStack images={images} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
