import React from 'react';

const ImageCard = ({
    image, text
}) => {
    return (
        <div className="max-w-3xl mx-auto bg-[#F4F4F4] p-4 rounded-lg mt-10">
            <div className="space-y-4">
                <div
                    className="relative overflow-hidden rounded-lg shadow-md"
                >
                    <img
                        src={image}
                        alt={`Image`}
                        className="w-full h-80 object-cover"
                    />
                </div>
                <h2 className='text-center text-black font-semibold'>{text}</h2>
            </div>
        </div>
    );
};

export default ImageCard;