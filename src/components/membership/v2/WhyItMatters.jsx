"use client";
import * as React from "react";

function WhyItMatters() {
  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500&display=swap');

        .why-it-matters-section {
          max-width: none;
          display: flex;
          padding: 64px 40px;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          width: 100vw;
          box-sizing: border-box;
          background-color: #EBE2D7;
          margin: 0 auto;
        }

        .content-wrapper {
          display: flex;
          align-items: center;
          gap: 213px;
          width: 100%;
          max-width: 1360px;
          position: relative;
        }

        .text-content {
          display: flex;
          gap: 213px;
          width: 100%;
          align-items: flex-start;
        }

        .section-title {
          width: 497px;
          color: #003233;
          text-transform: uppercase;
          flex-shrink: 0;
          font: 500 40px 'Plus Jakarta Sans', sans-serif;
          margin: 0;
        }

        .section-description {
          width: 650px;
          color: #141414;
          flex-shrink: 0;
          font: 400 16px 'Plus Jakarta Sans', sans-serif;
          margin: 0;
          line-height: 1.5;
        }

        .main-image {
          display: flex;
          width: 1360px;
          height: 562px;
          align-items: center;
          gap: 10px;
          border-radius: 16px;
          object-fit: cover;
        }

        /* Tablet styles */
        @media (max-width: 991px) {
          .why-it-matters-section {
            max-width: 991px;
            padding: 40px 20px;
            gap: 30px;
          }

          .content-wrapper {
            flex-direction: column;
            gap: 30px;
            align-items: flex-start;
          }

          .text-content {
            flex-direction: column;
            gap: 30px;
            align-items: flex-start;
          }

          .section-title {
            width: 100%;
            font-size: 36px;
          }

          .section-description {
            width: 100%;
            font-size: 16px;
          }

          .main-image {
            width: 100%;
            max-width: 800px;
            height: auto;
            min-height: 400px;
          }
        }

        @media (max-width: 640px) {
          .why-it-matters-section {
            max-width: 640px;
            padding: 24px 16px;
            gap: 24px;
          }

          .section-title {
            font-size: 28px;
            line-height: 1.2;
          }

          .section-description {
            font-size: 14px;
            line-height: 1.4;
          }

          .main-image {
            min-height: 300px;
            border-radius: 12px;
          }
        }
      `}</style>
      
      <section className="why-it-matters-section">
        <div className="content-wrapper">
          <div className="text-content">
            <h2 className="section-title">Why It Matters</h2>
            <p className="section-description">
              Nolcha Inner Circle was born from a day of giving — and from that
              moment, it became something more. A brand project turned into a
              soul-level alliance. Presence, loyalty, integrity — these are not
              features. They are requirements. Our mission is to amplify the voices
              of those who move quietly but build boldly — and to offer them a
              circle worthy of their vision.
            </p>
          </div>
        </div>
        <img
          src="/membership/v2/5.png"
          alt=""
          className="main-image"
        />
      </section>
    </>
  );
}

export default WhyItMatters;