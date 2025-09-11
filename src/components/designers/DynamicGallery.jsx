"use client"
import React from 'react'
import ImageCard from './ImageCard';
import { useRouter } from 'next/navigation';

const DynamicGallery = ({ imagesGallery }) => {
    const router = useRouter();

    return (
        <div className="mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-10">
                {imagesGallery.map((item, index) => (
                    <ImageCard
                        key={index}
                        image={item.image}
                        text={item.text}
                        onClick={() => router.push('/designers/jeremy')}
                    />
                ))}
            </div>
        </div>
    );
}

export default DynamicGallery