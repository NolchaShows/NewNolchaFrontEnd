"use client";
import Partners from "@/components/home/Partners";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import React, { useState, useEffect } from "react";
import { getUpcomingPageData } from "@/lib/strapi";

const Page = () => {
  const [upcomingEventsData, setUpcomingEventsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingData = async () => {
      try {
        const data = await getUpcomingPageData();
        
        if (data?.data && data.data.length > 0) {
          console.log('Upcoming events section data:', data.data[0].upcoming_events_section);
          // Now upcoming_events_section is an array of events
          setUpcomingEventsData(data.data[0].upcoming_events_section);
        }
      } catch (error) {
        console.error("Failed to fetch upcoming page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingData();
  }, []);
  const press = [
    {
      id: 1,
      imageWhite: "/home/press/1w.png",
      imageBlack: "/home/press/1b.png",
      altText: "Partner 1",
      backgroundColor: "bg-black",
    },
    {
      id: 2,
      imageWhite: "/home/press/2w.png",
      imageBlack: "/home/press/2b.png",
      altText: "Partner 2",
      backgroundColor: "bg-black",
    },
    {
      id: 3,
      imageWhite: "/home/press/3w.png",
      imageBlack: "/home/press/3b.png",
      altText: "Partner 3",
      backgroundColor: "bg-black",
    },
    {
      id: 4,
      imageWhite: "/home/press/4w.png",
      imageBlack: "/home/press/4b.png",
      altText: "Partner 4",
      backgroundColor: "bg-black",
    },
    {
      id: 5,
      imageWhite: "/home/press/5w.png",
      imageBlack: "/home/press/5b.png",
      altText: "Partner 5",
      backgroundColor: "bg-black",
    },
    {
      id: 6,
      imageWhite: "/home/press/6w.png",
      imageBlack: "/home/press/6b.png",
      altText: "Partner 6",
      backgroundColor: "bg-black",
    },
    {
      id: 7,
      imageWhite: "/home/press/7w.png",
      imageBlack: "/home/press/7b.png",
      altText: "Partner 7",
      backgroundColor: "bg-black",
    },
    {
      id: 8,
      imageWhite: "/home/press/8w.png",
      imageBlack: "/home/press/8b.png",
      altText: "Partner 8",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 9,
      imageWhite: "/home/press/9w.png",
      imageBlack: "/home/press/9b.png",
      altText: "Partner 9",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 10,
      imageWhite: "/home/press/10w.png",
      imageBlack: "/home/press/10b.png",
      altText: "Partner 10",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 11,
      imageWhite: "/home/press/11w.png",
      imageBlack: "/home/press/11b.png",
      altText: "Partner 11",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 12,
      imageWhite: "/home/press/12w.png",
      imageBlack: "/home/press/12b.png",
      altText: "Partner 12",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 13,
      imageWhite: "/home/press/13w.png",
      imageBlack: "/home/press/13b.png",
      altText: "Partner 13",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 14,
      imageWhite: "/home/press/14w.png",
      imageBlack: "/home/press/14b.png",
      altText: "Partner 14",
      backgroundColor: "bg-[#E7F0D3]",
    },
    {
      id: 15,
      imageWhite: "/home/press/15w.png",
      imageBlack: "/home/press/15b.png",
      altText: "Partner 15",
      backgroundColor: "bg-black",
    },
    {
      id: 16,
      imageWhite: "/home/press/16w.png",
      imageBlack: "/home/press/16b.png",
      altText: "Partner 16",
      backgroundColor: "bg-black",
    },
    {
      id: 17,
      imageWhite: "/home/press/17w.png",
      imageBlack: "/home/press/17b.png",
      altText: "Partner 17",
      backgroundColor: "bg-black",
    },
  ];
  return (
    <div>
      <UpcomingEvents 
        upcomingEventsData={upcomingEventsData}
        loading={loading}
      />
      <div className="mt-5">
        <Partners
          title={"Press and Media Recognition"}
          partners={press}
          bg={"bg-[#F4F4F4]"}
        />
      </div>
      <img src="/landing/background.png" className="mx-auto w-full" />
    </div>
  );
};

export default Page;
