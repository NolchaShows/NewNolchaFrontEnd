"use client"

import { ArrowRight } from "lucide-react"

export function DeckCard({ title, image, onAction }) {
  return (
    <div className="flex justify-center md:justify-start">
      <div
        className="relative w-80 h-[280px] bg-no-repeat bg-contain"
        style={{ backgroundImage: "url('/dashboard/home/border.png')" }}
      >
        {/* Title */}
        <h3 className="absolute top-6 left-6 text-lg font-medium text-gray-900">
          {title}
        </h3>

        <div className="absolute top-16 left-6 right-6 h-40">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-[75%] object-fill rounded-xl"
          />
        </div>

        <button
          onClick={onAction}
          className="absolute bottom-10 cursor-pointer right-3 w-12 h-12 flex items-center justify-center rounded-full bg-black hover:bg-gray-800 text-white shadow-lg"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}