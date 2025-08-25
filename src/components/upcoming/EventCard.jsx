import { Share2 } from "lucide-react"

const EventCard = ({
  name = "Concensus 2025",
  date = "June 24TH, 2025",
  venue = "Movie studio spanning 40,000 square feet featuring one of the largest curved LED walls in the world. Movies filmed here include The Mandaleron and Top Gun.",
  whatToExpected = "Uniting BTC pioneers, artists, and leaders for a compelling conference, vibrant networking, and an unforgettable after party.",
  images = [
    "/upcoming/1.png",
    "/upcoming/2.png",
    "/upcoming/3.png",
  ],
}) => {
  return (
    <>
      <div className="relative max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <div>
          <div className="absolute -top-3 left-8 px-3 z-20">
            <button className="bg-[#E7F0D3] text-[#0d3d2d] px-6 py-2 text-sm font-medium rounded-md w-full md:w-fit">
              {name}
            </button>
          </div>

          <div className="absolute top-2 right-3 z-10 flex gap-2">
            <button className="h-8 w-8 bg-[#E7F0D3] hover:bg-gray-50 rounded-full shadow-sm flex items-center justify-center border border-gray-300">
              <Share2 className="h-4 w-4 text-gray-600"/>
            </button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex h-[480px]">
            <div className="flex-1 p-8 pr-4 flex flex-col pt-16">
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">DATES</h3>
                  <p className="text-gray-900">{date}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">VENUE</h3>
                  <p className="text-gray-900 text-sm leading-relaxed">{venue}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">WHAT TO EXPECT</h3>
                  <p className="text-gray-900 text-sm leading-relaxed">{whatToExpected}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Get Tickets</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                    Interested in Co-hosting learn more here
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-[#E7F0D3] text-[#0d3d2d] px-6 py-2 text-sm font-medium rounded-md w-full md:w-fit">
                    Request Prospectus
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 pl-0 mt-4 mr-3">
              <div className="h-full flex flex-col gap-4">
                <div className="flex-1 relative rounded-lg overflow-hidden">
                  <img src={images[0] || "/placeholder.svg"} alt="Main event" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden p-4 pt-12">
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">DATES: {date}</h3> 
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">VENUE</h3>
                <p className="text-gray-900 text-sm leading-relaxed">{venue}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">WHAT TO EXPECT</h3>
                <p className="text-gray-900 text-sm leading-relaxed">{whatToExpected}</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                <span className="text-sm font-medium underline text-black">Get Tickets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                <span className="text-sm text-black underline cursor-pointer">
                  Interested in Co-hosting learn more here
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-[#E7F0D3] text-[#0d3d2d] px-6 py-2 text-sm font-medium rounded-md w-full">
                  Request Prospectus
                </button>
              </div>
            </div>

            {/* Mobile Image Stack */}
            <div className="flex flex-col gap-4">
              <div className="h-48 relative rounded-lg overflow-hidden">
                <img src={images[0] || "/placeholder.svg"} alt="Main event" className="w-full h-full object-cover" />
              </div>
              <div className="h-48 relative rounded-lg overflow-hidden">
                <img src={images[1] || "/placeholder.svg"} alt="Event scene 1" className="w-full h-full object-cover" />
              </div>
              <div className="h-48 relative rounded-lg overflow-hidden">
                <img src={images[2] || "/placeholder.svg"} alt="Event scene 2" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Bottom Images */}
        <div className="hidden md:flex gap-4 h-80 p-3">
          <div className="flex-1 relative rounded-lg overflow-hidden">
            <img src={images[1] || "/placeholder.svg"} alt="Event scene 1" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 relative rounded-lg overflow-hidden">
            <img src={images[2] || "/placeholder.svg"} alt="Event scene 2" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </>
  )
}

export default EventCard