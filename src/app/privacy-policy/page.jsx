import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="mx-auto p-5 md:py-20 md:px-30 bg-white font-['Neue Haas Grotesk Text Pro', sans-serif]">
      <div className="py-[60px] px-[30px] 2xl:px-[60px] bg-[#F4F4F4]">
        <h1 className="text-[36px] xl:text-[64px] 2xl:text-[70px] font-bold text-black mb-6">Privacy Policy</h1>
        
        <p className="text-[#000000B3] mb-8 text-[24px] 2xl:text-[38px]">
          At Nolcha, we are committed to protecting your privacy. This Privacy Policy explains how we 
          collect, use, disclose, and safeguard your information when you use our platform.
        </p>

        <section className="mb-8">
          <h2 className="text-[26px] 2xl:text-[40px] font-medium text-black mb-4">Information We Collect</h2>
          
          <div className="mb-4">
            <h3 className="text-[20px] 2xl:text-[30px] text-black mb-2">Information You Provide:</h3>
            <ul className="list-disc list-inside text-[#000000B3] text-[20px] 2xl:text-[30px] space-y-2 ml-4">
              <li>Name, email address, company details, or payment information when you register or subscribe.</li>
              <li>Messages and feedback submitted through our platform.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-[20px] 2xl:text-[30px] text-black mb-2">Automatically Collected Data:</h3>
            <ul className="list-disc list-inside text-[#000000B3] text-[20px] 2xl:text-[30px] space-y-2 ml-4">
              <li>Name, email address, company details, or payment information when you register or subscribe.</li>
              <li>Messages and feedback submitted through our platform.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-[26px] 2xl:text-[40px] font-medium  text-black mb-4">How We Use Your Information</h2>
          
          <div>
            <h3 className="text-[20px] 2xl:text-[30px] text-black mb-2">We Use The Information We Collect To:</h3>
            <ul className="list-disc list-inside text-[#000000B3] text-[20px] 2xl:text-[30px] space-y-2 ml-4">
              <li>Provide and improve Nolcha's services.</li>
              <li>Personalize your experience and support interactions.</li>
              <li>Process payments and manage subscriptions.</li>
              <li>Detect and prevent fraud or misuse.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-[26px] 2xl:text-[40px] font-medium  text-black mb-4">Data Sharing</h2>
          
          <p className="text-[#000000B3] text-[20px] 2xl:text-[30px] mb-4 font-medium">We do not sell your personal data.</p>
          
          <div>
            <h3 className="text-[20px] 2xl:text-[30px] text-black mb-2">We May Share Information With:</h3>
            <ul className="list-disc list-inside text-[#000000B3] text-[20px] 2xl:text-[30px] space-y-2 ml-4">
              <li>Service providers (for hosting, analytics, or payment processing).</li>
              <li>Legal authorities, if required by law or to protect rights and safety.</li>
              <li>Affiliates or partners, under strict confidentiality agreements.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-[26px] 2xl:text-[40px] font-medium  text-black mb-4">Data Retention</h2>
          <p className="text-[#000000B3] text-[20px] 2xl:text-[30px] leading-relaxed">
            We retain your data as long as needed to provide our services or as required by law. You may request deletion of your 
            data by contacting us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-[26px] 2xl:text-[40px] font-medium  text-black mb-4">Cookies</h2>
          <p className="text-[#000000B3] text-[20px] 2xl:text-[30px] leading-relaxed">
            We use cookies to enhance your experience. You can modify your browser settings to decline cookies, though this 
            may affect functionality.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-[26px] 2xl:text-[40px] font-medium  text-black mb-4">Data Security</h2>
          <p className="text-[#000000B3] text-[20px] 2xl:text-[30px] leading-relaxed">
            We use industry-standard security measures to protect your data, including encryption and secure storage. However, 
            no method is 100% secure, so we encourage caution with sensitive information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-[26px] 2xl:text-[40px] font-medium text-black mb-4">Third-Party Links</h2>
          <p className="text-[#000000B3] text-[20px] 2xl:text-[30px] leading-relaxed">
            Our site may contain links to third-party sites. We are not responsible for their privacy practices, so we recommend 
            reviewing their policies before sharing information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-[26px] 2xl:text-[40px] font-medium  text-black mb-4">Policy Updates</h2>
          <p className="text-[#000000B3] text-[20px] 2xl:text-[30px] leading-relaxed">
            We may update this Privacy Policy as our services evolve. The most recent version will always be available on this 
            page. Continued use of our services means you accept any changes.
          </p>
        </section>

        <section>
          <h2 className="text-[26px] 2xl:text-[40px] font-medium text-black mb-4">Contact Us</h2>
          <p className="text-[#000000B3] text-[20px] 2xl:text-[30px] leading-relaxed">
            If you have questions or concerns about this Privacy Policy, please reach out at: <span className="underline text-[#000000]">support@Nolcha.com</span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;