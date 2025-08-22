"use client"
import React from 'react'
import ImageCard from './ImageCard';
import { useRouter } from 'next/navigation';

const DynamicGallery = ({ imagesGallery }) => {
    const divideIntoColumns = (array) => {
        const columns = [[], [], []];
        array.forEach((item, index) => {
            columns[index % 3].push(item);
        });
        return columns;
    };
    const router = useRouter();

    const [leftColumn, middleColumn, rightColumn] = divideIntoColumns(imagesGallery);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="hidden md:grid md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                    {leftColumn.map((item, index) => (
                        <ImageCard
                            key={`left-${index}`}
                            image={item.image}
                            text={item.text}
                            onClick={() => router.push('/designers/jeremy')}
                        />
                    ))}
                </div>

                <div className="flex flex-col -mt-12">
                    {middleColumn.map((item, index) => (
                        <ImageCard
                            key={`middle-${index}`}
                            image={item.image}
                            text={item.text}
                            onClick={() => router.push('/designers/jeremy')}
                        />
                    ))}
                </div>

                <div className="flex flex-col">
                    {rightColumn.map((item, index) => (
                        <ImageCard
                            key={`right-${index}`}
                            image={item.image}
                            text={item.text}
                            onClick={() => router.push('/designers/jeremy')}
                        />
                    ))}
                </div>
            </div>

            <div className="md:hidden flex flex-col">
                {imagesGallery.map((item, index) => (
                    <ImageCard
                        key={`mobile-${index}`}
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