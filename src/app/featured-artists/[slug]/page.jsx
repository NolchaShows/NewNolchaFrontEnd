"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import Designer from '@/components/designers/Designer';
import { useFeaturedArtistDetail } from '@/utils/featuredArtistUtils';

const Page = () => {
  const params = useParams();
  const slug = params.slug;

  const { featuredArtistDetail, loading, error } = useFeaturedArtistDetail(slug);

  if (error) {
    console.error('Error loading featured artist page:', error);
  }

  return (
    <div>
      <Designer
        {...featuredArtistDetail}
        loading={loading}
      />
    </div>
  );
};

export default Page;
