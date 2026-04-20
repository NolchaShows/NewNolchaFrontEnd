export default function AboutStatementSection() {
    const differentiators = [
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
    ];
  
    return (
      <section className="w-full bg-[#F4F4F4] px-5 py-16 lg:px-11 lg:py-32 text-[#1A1A1A]">
        <div className="mx-auto w-full max-w-[1800px]">
          <p className="text-[10px] lg:text-[12px] uppercase tracking-[0.08em] text-[#3A3A3A] mb-2 lg:mb-5">
            [ OUR DIFFERENTIATORS ]
          </p>
  
          <div className="flex flex-col gap-8 lg:gap-10">
            {differentiators.map((item) => (
              <article key={item.title}>
                <h2 className="text-[34px] lg:text-[50px] text-[#1D1D1D] ">
                  {item.title}
                </h2>
                <p className="text-[18px] text-[#1D1D1D] lg:text-[28px]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  