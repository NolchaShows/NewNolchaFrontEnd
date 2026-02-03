"use client"
import React from 'react'
import ImageCard from './ImageCard';
import { useRouter } from 'next/navigation';
import SectionTitle from '../common/SectionTitle';

const DynamicGallery = ({ imagesGallery, title }) => {
    const router = useRouter();

    return (
        <div className="bg-black page-container mx-auto min-h-screen">
            <SectionTitle className="mb-[20px] lg:mb-[30px] 2xl:mb-[50px]">{title}</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-[30px]">
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