"use client"

function ImageTextCard({ image, text, imagePosition = "left", className = "py-8" }) {
  return (
    <div className="bg-gray-100 border border-gray-200 rounded-2xl p-6 md:p-8 ml-8 mr-8 mb-10">
      <div className={`max-w-[1200px] mx-auto ${className}`}>
        <div
          className={`hidden md:flex gap-8 lg:gap-16 items-center ${imagePosition === "right" ? "flex-row-reverse" : ""}`}
        >
          <div className="w-1/2 flex-shrink-0">
            <img
              src={image || "/placeholder.svg?height=400&width=500"}
              alt="Card image"
              className="w-full h-auto object-cover rounded-3xl shadow-lg"
            />
          </div>

          <div className="pl-10 pr-10 w-1/2 flex-shrink-0">
            <div className="text-gray-700 text-base lg:text-lg leading-relaxed">
              {text.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout - Always image top, text bottom */}
        <div className="md:hidden flex flex-col gap-6">
          <div className="w-full">
            <img
              src={image || "/placeholder.svg?height=300&width=400"}
              alt="Card image"
              className="w-full h-auto object-cover rounded-3xl shadow-lg"
            />
          </div>

          <div className="w-full">
            <div className="text-gray-700 text-sm leading-relaxed">
              {text.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageTextCard
