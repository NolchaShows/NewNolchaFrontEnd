import React from 'react';

const ImageCard = ({
    image, text, onClick = null
}) => {
    return (
        <div className="max-w-none bg-[#eceaea] p-4 cursor-pointer rounded-lg mt-10" onClick={onClick}>
            <div className="space-y-4">
                <div
                    className="relative overflow-hidden rounded-lg shadow-md 2xl:m-5"
                >
                    <img
                        src={image}
                        alt={`Image`}
                        className="w-full h-100 2xl:h-140 object-cover"
                    />
                </div>
                <h2 className='text-center text-black text-[26px] 2xl:text-[44px] font-bold'>{text}</h2>
            </div>
        </div>
    );
};

export default ImageCard;