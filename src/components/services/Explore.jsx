import React from "react";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Strategy & Event Production",
      backgroundImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/903c119133fa831c0f81eced85d50816f8d68d5b?width=880",
    },
    {
      id: 2,
      title: "Creative & Immersive",
      backgroundImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/7d249f6bcdb4646ae24fcc6eee579f70b383d27f?width=880",
    },
    {
      id: 3,
      title: "Sponsorship Sales & Partner",
      backgroundImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/1574f7d58c3598db6b51067de8f701e8dbca5be2?width=880",
    },
    {
      id: 4,
      title: "Experience Technology",
      backgroundImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/8e2a36c7e0e028e942a2b5c0a8760d1add733d90?width=1344",
    },
    {
      id: 5,
      title: "Business Dev and fund raising",
      backgroundImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/85980f9cac61ea5d3cf303ba5d055af624279b71?width=1336",
    },
  ];

  return (
    <section className="flex w-full max-w-none py-16 px-6 sm:px-10 flex-col items-center gap-10 bg-white mx-auto">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-[#003233] font-sans text-3xl sm:text-4xl lg:text-5xl 2xl:text-7xl font-medium uppercase m-0 text-center">
            Explore our services
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-start gap-5 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-5 w-full">
          {services.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="flex h-[466px] lg:flex-1 rounded-xl overflow-hidden lg:flex-shrink-0 w-full"
            >
              <div
                className="flex w-full h-full p-4 justify-center items-end bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${service.backgroundImage})` }}
              >
                <div className="flex py-6 px-2.5 justify-center items-center gap-2.5 w-full rounded-xl bg-[#77777799] bg-opacity-60 backdrop-blur-sm">
                  <h3 className="text-white font-sans text-lg sm:text-xl lg:text-2xl font-medium uppercase text-center m-0">
                    {service.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-5 w-full">
          <div className="flex h-[466px] w-full lg:w-[668px] lg:flex-1/2 lg:flex-shrink-0 rounded-xl overflow-hidden">
            <div
              className="flex w-full h-full p-4 justify-center items-end bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${services[3].backgroundImage})`,
              }}
            >
              <div className="flex py-6 px-2.5 justify-center items-center gap-2.5 w-full rounded-xl bg-[#77777799] bg-opacity-60 backdrop-blur-sm">
                <h3 className="text-white font-sans text-lg sm:text-xl lg:text-2xl font-medium uppercase text-center m-0">
                  {services[3].title}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex h-[466px] w-full lg:w-[668px]  lg:flex-1/2 lg:flex-shrink-0 rounded-xl overflow-hidden">
            <div
              className="flex w-full h-full p-4 justify-center items-end bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${services[4].backgroundImage})` }}
            >
              <div className="flex py-6 px-2.5 justify-center items-center gap-2.5 w-full rounded-xl bg-[#77777799] bg-opacity-60 backdrop-blur-sm">
                <h3 className="text-white font-sans text-lg sm:text-xl lg:text-2xl font-medium uppercase text-center m-0">
                  {services[4].title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
