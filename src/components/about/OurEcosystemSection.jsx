export default function OurEcosystemSection() {
  return (
    <section className="w-full bg-[#f1f1f1] px-5 pt-16 lg:px-11 lg:pt-24">
      <div className="mx-auto w-full max-w-[1800px]">
        <p className="text-center text-[10px] uppercase tracking-[0.08em] text-[#3A3A3A] lg:text-[14px]">
          [ OUR ECOSYSTEM ]
        </p>

        <h2 className="mt-4 text-center text-[36px] uppercase leading-[1] tracking-[-0.02em] text-[#1D1D1D] lg:mt-6 lg:text-[50px]">
          MATTE'S UNIQUE ECOSYSTEM
        </h2>

        <div className="mx-auto mt-10 w-full max-w-[1200px] lg:mt-12">
          <img
            src="/about/ecosystem.webp"
            alt="Our ecosystem placeholder"
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
