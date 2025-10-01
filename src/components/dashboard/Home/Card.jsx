"use client"

import { ArrowRight } from "lucide-react"

export function DeckCard({ title, image, date, onAction }) {
  return (
    <div className="flex justify-center md:justify-start">
      <div
        className="relative bg-no-repeat bg-contain"
        style={{ 
          backgroundImage: "url('/dashboard/home/border.png')",
          width: 'clamp(280px, 25vw, 480px)',
          height: 'clamp(250px, 22vw, 420px)'
        }}
      >
        <h3 className="absolute text-gray-900 font-medium"
            style={{
              top: 'clamp(16px, 1.5vw, 32px)',
              left: 'clamp(16px, 1.5vw, 32px)',
              fontSize: 'clamp(16px, 1.4vw, 28px)'
            }}>
          {title}
        </h3>

        {date && (
          <p className="absolute text-gray-600"
             style={{
               top: 'clamp(40px, 3.5vw, 70px)',
               left: 'clamp(16px, 1.5vw, 32px)',
               fontSize: 'clamp(12px, 1vw, 20px)',
               marginTop: 'clamp(2px, 0.2vw, 6px)'
             }}>
            {date}
          </p>
        )}

        <div className={`absolute rounded-xl overflow-hidden`}
             style={{
               left: 'clamp(16px, 1.5vw, 32px)',
               right: 'clamp(16px, 1.5vw, 32px)',
               top: date ? 'clamp(64px, 5.5vw, 100px)' : 'clamp(48px, 4vw, 80px)',
               height: 'clamp(140px, 12vw, 240px)'
             }}>
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-[75%] object-fill rounded-xl"
          />
        </div>

        <button
          onClick={() => onAction(title)}
          className="absolute cursor-pointer flex items-center justify-center rounded-full bg-black hover:bg-gray-800 text-white shadow-lg transition-all duration-200"
          style={{
            bottom: 'calc(clamp(24px, 2vw, 48px) + 25px)',
            right: 'clamp(8px, 0.8vw, 16px)',
            width: 'clamp(40px, 3vw, 64px)',
            height: 'clamp(40px, 3vw, 64px)'
          }}
        >
          <ArrowRight 
            style={{
              width: 'clamp(16px, 1.2vw, 28px)',
              height: 'clamp(16px, 1.2vw, 28px)'
            }}
          />
        </button>
      </div>
    </div>
  )
}