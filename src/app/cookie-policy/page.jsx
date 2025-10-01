import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="mx-auto p-5 md:py-20 md:px-30 bg-white font-['Neue Haas Grotesk Text Pro', sans-serif]">
      <div className="py-[60px] px-[30px] 2xl:px-[60px] bg-[#F4F4F4]">
        <h1 className="text-[36px] xl:text-[64px] 2xl:text-[70px] font-bold text-black mb-6">Cookie Policy</h1>
        
        <p className="text-[#000000B3] mb-8 text-[24px] 2xl:text-[38px]">
          At Nolcha, we're committed to enhancing your experience as you explore the intersection of 
          art, technology, Web3, crypto, and innovation. This Cookie Policy explains how we use cookies 
          and similar technologies on our website (www.nolcha.com) to improve your experience, 
          personalise content, analyse traffic, and support our mission of curating outstanding events, 
          experiences, and thought leadership.
        </p>

        <section className="mb-8">
          <h2 className="text-[26px] 2xl:text-[40px] font-medium text-black mb-4">What Are Cookies</h2>
          <p className="text-[#000000B3] text-[20px] 2xl:text-[30px] leading-relaxed">
            Cookies are small text files placed on your device (computer, tablet, mobile) when you visit a site. They store 
            information that can be read by the website the next time you visit. Cookies help make web experiences faster, more 
            secure, and more tailored to your preferences.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-[26px] 2xl:text-[40px] font-medium text-black mb-4">Third-Party Cookies</h2>
          
          <p className="text-[#000000B3] text-[20px] 2xl:text-[30px] mb-4 leading-relaxed">
            We May Also Allow Certain Third-Party Services To Place Cookies Via Our Site. These May Include:
          </p>
          
          <ul className="list-disc list-inside text-[#000000B3] text-[20px] 2xl:text-[30px] space-y-2 ml-4 mb-4">
            <li>Analytics providers (e.g. Google Analytics)</li>
            <li>Social media / sharing tools</li>
            <li>Advertising / remarketing networks</li>
            <li>Content embedding (e.g. video, media)</li>
          </ul>

          <p className="text-[#000000B3] text-[20px] 2xl:text-[30px] leading-relaxed">
            These third parties have their own policies; we encourage you to review their terms for more details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-[26px] 2xl:text-[40px] font-medium text-black mb-4">Your Choices & Managing Cookies</h2>
          
          <p className="text-[#000000B3] text-[20px] 2xl:text-[30px] mb-4 leading-relaxed">
            You Have Control Over Cookies. Here Are Some Options:
          </p>
          
          <ul className="list-disc list-inside text-[#000000B3] text-[20px] 2xl:text-[30px] space-y-2 ml-4">
            <li>You can accept or decline non-essential cookies (e.g. performance, functionality, marketing) via a cookie consent banner (if implemented).</li>
            <li>You can also manage or disable cookies in your browser settings. Please note that disabling certain cookies may affect functionality or your experience on the site.</li>
            <li>Some browser tools or extensions allow you to block third-party cookies generally.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-[26px] 2xl:text-[40px] font-medium text-black mb-4">Cookie Duration</h2>
          
          <p className="text-[#000000B3] text-[20px] 2xl:text-[30px] mb-4 leading-relaxed">
            Cookies May Be:
          </p>
          
          <ul className="list-disc list-inside text-[#000000B3] text-[20px] 2xl:text-[30px] space-y-2 ml-4">
            <li>Session Cookies — they expire once you close your browser.</li>
            <li>Persistent Cookies — they remain on your device for a longer period (from days up to several months), depending on the purpose.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-[26px] 2xl:text-[40px] font-medium text-black mb-4">Changes To This Policy</h2>
          <p className="text-[#000000B3] text-[20px] 2xl:text-[30px] leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in law, technology, or how Nolcha operates. We 
            will post the updated version on our site and update the "Last Updated" date. Your continued use of the site after 
            changes constitutes acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-[26px] 2xl:text-[40px] font-medium text-black mb-4">Contact Us</h2>
          
          <p className="text-[#000000B3] text-[20px] 2xl:text-[30px] mb-4 leading-relaxed">
            If You Have Any Questions About Our Use Of Cookies, Or About This Policy, Please Get In Touch:
          </p>
          
          <ul className="list-disc list-inside text-[#000000B3] text-[20px] 2xl:text-[30px] space-y-2 ml-4">
            <li><span className="text-black">Email:</span> pr@nolcha.com</li>
            <li><span className="text-black">Address:</span> 1345 Ave of the Americas, 2nd Floor, New York, NY 10105</li>
            <li><span className="text-black">Website:</span> www.nolcha.com</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;