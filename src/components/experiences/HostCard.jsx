import React from "react";

const HostCard = ({ hostName, hostDescription, buttonText, hostImage }) => {
  // Function to render text with line breaks
  const renderTextWithLineBreaks = (text) => {
    if (!text) return null;

    return text.split("\n").map((line, index) => (
      <div key={index} className={"mb-6"}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </div>
    ));
  };

  return (
    <div className="px-4 md:px-8 mt-10 mb-12 ">
      <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-[#EBE2D7]">
        <div className="w-full md:w-2/3 px-20 pt-12 pb-10 md:pb-48 flex flex-col justify-start items-end order-2 md:order-2 max-md:px-5">
          <div className="max-w-full">
            <div className="flex flex-col w-full max-md:max-w-full">
              <div className="text-[30px] lg:text-[52px] 2xl:text-[64px] font-bold text-black max-md:max-w-full max-md:text-4xl">
                {hostName}
              </div>
              <div className="mt-6 2xl:mt-10 font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] tracking-tight leading-8 2xl:leading-10 text-black text-[20px] 2xl:text-[30px] max-md:max-w-full">
                {renderTextWithLineBreaks(hostDescription)}
              </div>
              <div className="flex gap-2 w-full md:w-fit justify-center items-center self-start  px-6 py-3 2xl:py-6 2xl:px-10 mt-6 text-base 2xl:text-3xl font-medium leading-none bg-[#E7F0D3] rounded-xl border border-solid border-[#B5BF9E] text-[#000000] max-md:px-5">
                <div className="self-stretch my-auto cursor-pointer" onClick={()=>window.open("https://calendly.com/nolcha", "_blank")}>{buttonText}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 order-1 md:order-1">
          <img
            src={hostImage}
            alt="Host"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HostCard;
