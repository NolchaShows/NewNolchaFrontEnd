import React from "react";

const HostCard = ({ hostName, hostDescription, buttonText, hostImage }) => {
  // Function to render text with line breaks
  const renderTextWithLineBreaks = (text) => {
    if (!text) return null;

    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="px-4 md:px-8 mt-10 mb-12">
      <div className="flex flex-col md:flex-row bg-[#EBE2D7a] rounded-2xl overflow-hidden">
        <div className="w-full md:w-2/3 px-20 pt-12 pb-48 flex flex-col justify-end items-end order-1 md:order-2 max-md:px-5 max-md:pb-24">
          <div className="max-w-full w-[686px]">
            <div className="flex flex-col w-full max-md:max-w-full">
              <div className="text-5xl font-bold text-black max-md:max-w-full max-md:text-4xl">
                {hostName}
              </div>
              <div className="mt-6 tracking-tight leading-8 text-black text-xl max-md:max-w-full">
                {renderTextWithLineBreaks(hostDescription)}
              </div>
              <div className="flex gap-2 justify-center items-center self-start px-6 py-3 mt-6 text-base font-medium leading-none bg-lime-100 rounded-xl border border-solid border-stone-400 text-black max-md:px-5">
                <div className="self-stretch my-auto">{buttonText}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 order-2 md:order-1">
          <img
            src={hostImage || "/api/placeholder/300/400"}
            alt="Host"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HostCard;