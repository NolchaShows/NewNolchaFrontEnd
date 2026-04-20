"use client";

import { motion } from "framer-motion";

export default function AboutStatementSection({
  label = "[ OUR DIFFERENTIATORS ]",
  differentiators = [
    {
      title: "BORN IN ENTERTAINMENT",
      description:
        "Creative for the sake of it. A collective desire to put new creative products into the world. Experiences, stories, MATTE-owned IP.",
    },
    {
      title: "BUILT A CULTURE AND A FOLLOWING",
      description:
        "Amassing fans of the work. Fostering a community. Building a global network taste-makers. Attracting the attention brands.",
    },
    {
      title: "CREATING BRAND WORLDS",
      description:
        "Providing strategic and creative expertise-as well as good taste-to category-leading brands. Shaping the mark they make on culture at large.",
    },
  ],
}) {

  const typeIn = {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    visible: (delay = 0) => ({
      opacity: 1,
      clipPath: "inset(0 0% 0 0)",
      transition: { duration: 0.7, delay, ease: "easeOut" },
    }),
  };

  return (
    <section className="w-full bg-[#F4F4F4] px-5 py-16 text-[#1A1A1A] lg:px-11 lg:py-32">
      <div className="mx-auto w-full max-w-[1800px]">
        <p className="mb-2 text-[10px] uppercase tracking-[0.08em] text-[#3A3A3A] lg:mb-5 lg:text-[14px]">
          {label}
        </p>

        <motion.div
          className="flex flex-col gap-8 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {differentiators.map((item, index) => {
            const baseDelay = index * 1.25;
            return (
              <article key={item.title}>
                <motion.h2
                  className="text-[34px] text-[#1D1D1D] lg:text-[50px]"
                  variants={typeIn}
                  custom={baseDelay}
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  className="text-[18px] text-[#1D1D1D] lg:text-[28px]"
                  variants={typeIn}
                  custom={baseDelay + 0.55}
                >
                  {item.description}
                </motion.p>
              </article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
  