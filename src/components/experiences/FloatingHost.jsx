import React from "react";

const FloatingHost = ({ hostName, hostDescription, buttonText, hostImage }) => {
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
    <div className="flex overflow-hidden relative gap-2.5 items-start px-10 pt-16 pb-60 text-xl text-black bg-white max-md:px-5 max-md:pb-24">
      <div className="flex overflow-hidden z-0 flex-col justify-end items-end px-20 pt-12 pb-48 rounded-2xl bg-stone-200 min-w-60 w-[1360px] max-md:px-5 max-md:pb-24 max-md:max-w-full">
        <div className="max-w-full w-[686px]">
          <div className="flex flex-col w-full max-md:max-w-full">
            <div className="text-5xl font-bold tracking-tighter leading-tight max-md:max-w-full max-md:text-4xl">
              {hostName}
            </div>
            <div className="mt-6 tracking-tight leading-8 max-md:max-w-full">
              {renderTextWithLineBreaks(hostDescription)}
            </div>
            <div className="flex gap-2 justify-center items-center self-start px-6 py-3 mt-6 text-base font-medium leading-none bg-lime-100 rounded-xl border border-solid border-stone-400 max-md:px-5">
              <div className="self-stretch my-auto">{buttonText}</div>
            </div>
          </div>
        </div>
      </div>
      <img
        src={hostImage || "/api/placeholder/494/570"}
        className="object-contain absolute top-28 z-0 rounded-lg aspect-[0.87] h-[570px] left-[88px] min-w-60 w-[494px] max-md:max-w-full"
        alt="Host event"
      />
    </div>
  );
};

export default FloatingHost;
