import Link from "next/link";
import React from "react";

function About({ title, paragraphs = [], image, link, linkText, imageStyle }) {
  return (
    <div className="md:py-[75px] md:px-[45px] w-full max-w-none mx-auto py-[20px] px-[16px] flex xl:flex-row flex-col gap-[20px] md:justify-between" 
         style={{
           gap: 'clamp(20px, 2.5vw, 80px)',
           padding: 'clamp(20px, 3vw, 75px) clamp(16px, 2.5vw, 45px)'
         }}>
      
      {/* Text Section */}
      <div className="flex flex-col gap-[32px] text-[var(--secondary-text-color)] mt-20 2xl:mt-30 2xl:ml-20" 
           style={{
             maxWidth: 'clamp(300px, 35vw, 1000px)',
             gap: 'clamp(24px, 2vw, 48px)'
           }}>
        <div className="flex flex-col md:gap-[20px] gap-[16px]"
             style={{
               gap: 'clamp(16px, 1.5vw, 36px)'
             }}>
          {title && (
            <h1 className="md:text-[48px] uppercase text-[24px] font-medium text-[var(--primary-text-color)]"
                style={{
                  fontSize: 'clamp(24px, 3vw, 80px)'
                }}>
              {title}
            </h1>
          )}

          {/* Paragraphs */}
          <div className="flex flex-col gap-[12px] md:gap-[4px]"
               style={{
                 gap: 'clamp(4px, 0.8vw, 16px)'
               }}>
            {paragraphs.map((text, i) => (
              <p key={i} 
                 className="leading-relaxed"
                 style={{
                   fontSize: 'clamp(14px, 1.2vw, 28px)',
                   lineHeight: 'clamp(1.5, 0.1vw + 1.4, 1.8)'
                 }}>
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Desktop Button */}
        {link && (
          <Link
            href={link}
            className="bg-[var(--primary-color)] rounded-[4px] w-fit hidden md:block hover:opacity-90 transition-opacity"
            style={{
              fontSize: 'clamp(14px, 1.1vw, 24px)',
              padding: 'clamp(12px, 1vw, 24px) clamp(24px, 2vw, 48px)'
            }}
          >
            {linkText}
          </Link>
        )}
      </div>

      {/* Image */}
      {image && (
        <div className="flex-shrink-0 xl:flex-1"
             style={{
               maxWidth: 'clamp(300px, 45vw, 1400px)'
             }}>
          <img
            src={image}
            className={`${imageStyle} w-full rounded-[8px] object-cover mx-auto`}
            style={{
              maxHeight: 'clamp(300px, 35vw, 900px)'
            }}
            alt="About section"
          />
        </div>
      )}

      {/* Mobile Button */}
      {link && (
        <Link
          href={link}
          className="bg-[var(--primary-color)] text-center py-[12px] px-[24px] rounded-[4px] w-full md:hidden hover:opacity-90 transition-opacity"
          style={{
            fontSize: 'clamp(14px, 3vw, 18px)'
          }}
        >
         {linkText}
        </Link>
      )}
    </div>
  );
}

export default About;