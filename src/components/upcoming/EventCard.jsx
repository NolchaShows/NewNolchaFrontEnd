import { Share2 } from "lucide-react";

const EventCard = ({
  name = "Concensus 2025",
  date = "June 24th,2025",
  venue = "square feet featuring one of the largest curved LED walls in the world. Movies filmed here include The Mandaleron and Top Gun.",
  whatToExpected = "artists, and leaders for a compelling conference, vibrant networking, and an unforgettable after party.",
  images = ["/upcoming/1.png", "/upcoming/2.png", "/upcoming/3.png"],
}) => {
  return (
    <>
      <div className="font-neue relative w-full max-w-none mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Header with Name and Share Button */}
        <div className="flex items-center justify-between p-4 md:p-6 border-gray-100">
          <div className="bg-black text-white px-4 py-2">
            <h1 className="text-lg md:text-xl font-semibold">{name}</h1>
          </div>
          <button className="bg-[#E7F0D3] p-3 rounded-full hover:bg-[#d9e8c4] transition-colors">
            <Share2 className="w-5 h-5 text-[#0d3d2d]" />
          </button>
        </div>

        <div>
          <div className="hidden md:flex h-[480px]">
            <div className="flex-1 p-8 pr-4 flex flex-col pt-0 max-w-[50%]">
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-[26px] 2xl:text-xl font-bold whitespace-pre text-[#000000] mb-1">
                    Dates: {date}
                  </h3>
                </div>

                <div>
                  <h3 className="text-[26px] 2xl:text-xl font-bold whitespace-pre text-[#000000] mb-1">
                    VENUE: Movie Studio Spanning 40,000
                  </h3>
                  <p className="text-gray-900 2xl:text-[30px] text-[16px] leading-relaxed">
                    {venue}
                  </p>
                </div>

                <div>
                  <h3 className="text-[26px] 2xl:text-xl font-bold whitespace-pre text-[#000000] mb-1">
                    What To Expect: Uniting BTC pioneers
                  </h3>
                  <p className="text-gray-900 2xl:text-lg text-sm leading-relaxed">
                    {whatToExpected}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                  <span className="text-[20px] font-bold 2xl:text-[30px] text-[#000000]">
                    Get Tickets
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                  <span className="text-[20px] font-bold 2xl:text-[30px] text-[#000000]">
                    Interested in Co-hosting learn more here
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <button className="bg-[#E7F0D3] 2xl:text-lg border border-[#B5BF9E] text-[#0d3d2d] px-6 py-2 text-sm font-medium rounded-md w-full md:w-fit">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 pl-0 pt-0 mr-3">
              <div className="h-full flex flex-col gap-4">
                <div className="flex-1 relative rounded-lg overflow-hidden">
                  <img
                    src={images[0] || "/placeholder.svg"}
                    alt="Main event"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden p-4">
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-[20px] 2xl:text-xl font-bold whitespace-pre text-[#000000] mb-1">
                  Dates: {date}
                </h3>
              </div>

              <div>
                <h3 className="text-[20px] 2xl:text-xl font-bold whitespace-pre text-[#000000] mb-1">
                  VENUE: Movie Studio Spanning
                </h3>
                <p className="text-gray-900 text-[16px] leading-relaxed">
                  40,000 {venue}
                </p>
              </div>

              <div>
                <h3 className="text-[20px] 2xl:text-xl font-bold whitespace-pre text-[#000000] mb-1">
                  What To Expect: Uniting
                </h3>
                <p className="text-gray-900 text-[16px] leading-relaxed">
                  BTC pioneers {whatToExpected}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                <span className="text-[14px] font-bold 2xl:text-[30px] text-[#000000]">
                  Get Tickets
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                <span className="text-[14px] font-bold 2xl:text-[30px] text-[#000000]">
                  Interested in Co-hosting learn more here
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-[#E7F0D3] text-[#0d3d2d] px-6 py-2 text-sm font-medium rounded-md w-full">
                  Learn More
                </button>
              </div>
            </div>

            {/* Mobile Image Stack */}
            <div className="flex flex-col gap-4">
              <div className="h-48 relative rounded-lg overflow-hidden">
                <img
                  src={images[0] || "/placeholder.svg"}
                  alt="Main event"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-48 relative rounded-lg overflow-hidden">
                <img
                  src={images[1] || "/placeholder.svg"}
                  alt="Event scene 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-48 relative rounded-lg overflow-hidden">
                <img
                  src={images[2] || "/placeholder.svg"}
                  alt="Event scene 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Bottom Images */}
        <div className="hidden md:flex gap-4 h-80 2xl:h-120 p-3">
          <div className="flex-1 relative rounded-lg overflow-hidden">
            <img
              src={images[1] || "/placeholder.svg"}
              alt="Event scene 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 relative rounded-lg overflow-hidden">
            <img
              src={images[2] || "/placeholder.svg"}
              alt="Event scene 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
