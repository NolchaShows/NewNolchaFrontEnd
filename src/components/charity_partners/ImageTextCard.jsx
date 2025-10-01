"use client"

import { useRef } from "react"

function ImageTextCard({ image, text, subtext, imagePosition = "left", className = "py-8 px-0 md:px-8" }) {
  const ref = useRef(null)

  const wrapInQuotes = (p) => {
    if (!p || typeof p !== "string") return p
    const trimmed = p.trim()
    return `“${trimmed}”`
  }

  return (
    <div ref={ref} className="flex items-start justify-center sticky top-0">
      <div className="bg-gray-100 border border-gray-200 rounded-2xl shadow-2xl p-6 md:p-10 mx-8 w-full max-w-none overflow-hidden">
        <div className={`w-full mx-auto ${className}`}>
          <div
            className={`hidden md:flex gap-8 lg:gap-16 items-center ${
              imagePosition === "right" ? "flex-row-reverse" : ""
            }`}
          >
            <div className="w-1/2 flex-shrink-0">
              <img
                src={image}
                alt="Card image"
                className="w-full h-auto object-cover rounded-3xl shadow-lg"
              />
            </div>

            <div className="pl-6 pr-6 w-1/2 flex-shrink-0">
              <div className="text-[#000000] text-[20px] 2xl:text-[30px]">
                {text.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className={`mb-6 2xl:mb-10 last:mb-0 ${
                      index === 0 && "font-bold text-[26px] 2xl:text-[34px] capitalize"
                    }`}
                  >
                    {wrapInQuotes(paragraph)}
                  </p>
                ))}
                {subtext && (
                  <p className="text-[#666666] text-[16px] 2xl:text-[24px] mt-4 italic">
                    {subtext}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden flex flex-col gap-6">
            <div className="w-full">
              <img
                src={image}
                alt="Card image"
                className="w-full h-auto object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="w-full">
              <div className="text-[#000000] text-[16px]">
                {text.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className={`mb-4 last:mb-0 ${index === 0 && "font-bold text-[20px] capitalize"}`}
                  >
                    {wrapInQuotes(paragraph)}
                  </p>
                ))}
                {subtext && (
                  <p className="text-[#666666] text-[14px] mt-3 italic">
                    {subtext}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageTextCard
