import Link from "next/link";

export default function OurServicesSection() {
  return (
    <section className="w-full bg-[#F4F4F4] px-5 pt-16 pt-8 lg:px-11 lg:pt-32 lg:pb-14 text-[#1D1D1D]">
      <div className="mx-auto w-full max-w-[1800px]">
        <p className="mb-3 text-[10px] uppercase tracking-[0.08em] text-[#3A3A3A] lg:mb-5 lg:text-[12px]">
          [ OUR SERVICES ]
        </p>

        <h2 className="max-w-[500px] text-[42px] leading-[1] tracking-[-0.02em] uppercase lg:text-[50px]">
          MATTE HAS A MULTIDISCIPLINARY STUDIO THAT WORKS WITH TALENT AND BRANDS
        </h2>

        <Link
          href="/projects"
          className="mt-8 inline-flex items-center gap-2 text-[14px] uppercase tracking-[0.08em] text-[#1D1D1D] transition-opacity hover:opacity-70 lg:mt-12 lg:text-[16px]"
        >
          <span>SEE ALL PROJECTS</span>
          <span aria-hidden>↗</span>
        </Link>
      </div>
    </section>
  );
}
