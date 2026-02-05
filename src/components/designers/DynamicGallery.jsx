"use client"
import React from 'react'
import ImageCard from './ImageCard';
import { useRouter } from 'next/navigation';
import SectionTitle from '../common/SectionTitle';

const DynamicGallery = ({ imagesGallery, title, loading }) => {
    const router = useRouter();

    const handleClick = (item) => {
        // Use slug if available, otherwise fallback to a default
        const slug = item.slug || 'jeremy';
        router.push(`/designers/${slug}`);
    };

    if (loading) {
        return (
            <div className="bg-black page-container mx-auto min-h-screen">
                <SectionTitle className="mb-[20px] lg:mb-[30px] 2xl:mb-[50px]">{title}</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-[30px]">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="aspect-[3/4] bg-gray-800 animate-pulse rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black page-container mx-auto min-h-screen">
            <SectionTitle className="mb-[20px] lg:mb-[30px] 2xl:mb-[50px]">{title}</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-[30px]">
                {imagesGallery.map((item, index) => (
                    <ImageCard
                        key={item.slug || index}
                        image={item.image}
                        text={item.text}
                        onClick={() => handleClick(item)}
                    />
                ))}
            </div>
        </div>
    );
}

export default DynamicGallery