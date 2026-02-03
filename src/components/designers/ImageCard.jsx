import React from 'react';

const ImageCard = ({
    image, text, onClick = null
}) => {
    return (
        <div className="max-w-none bg-[#1A1A1A] p-5 cursor-pointer rounded-[17px] mb-10" onClick={onClick}>
            <div className="space-y-5">
                <div
                    className="relative overflow-hidden rounded-[16px] shadow-md 2xl:m-5"
                >
                    <img
                        src={image}
                        alt={`Image`}
                        className="w-full h-100 2xl:h-140 object-cover"
                    />
                </div>
                <h2 className='text-center text-white text-left text-[28px] 2xl:text-[44px] font-bold'>{text}</h2>
            </div>
        </div>
    );
};

export default ImageCard;