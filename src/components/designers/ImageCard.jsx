import React from 'react';

const ImageCard = ({
    image, text, onClick = null
}) => {
    return (
        <div className="max-w-none bg-[#1A1A1A] p-5 xxl:p-8 3xl:p-12 cursor-pointer rounded-[17px] 3xl:rounded-[34px]" onClick={onClick}>
            <div className="space-y-5 xxl:space-y-8 3xl:space-y-12">
                <div
                    className="relative overflow-hidden rounded-[16px] 3xl:rounded-[32px] shadow-md 2xl:m-5 xxl:m-8 3xl:m-12"
                >
                    <img
                        src={image}
                        alt={`Image`}
                        className="w-full h-100 2xl:h-[500px] xxl:h-140 3xl:h-[1000px] object-cover"
                    />
                </div>
                <h2 className='text-center text-white text-[28px] 2xl:text-[36px] xxl:text-[44px] 3xl:text-[64px] font-bold'>{text}</h2>
            </div>
        </div>
    );
};

export default ImageCard;