"use client";
import React from 'react';
import Experience from '@/components/common/Experience';
import { useExperiencePageData } from '@/utils/experiencePageUtils';

const Page = () => {
  const { experienceData, loading, error } = useExperiencePageData('vv_raching_with_jack_butcher');

  if (error) {
    console.error('Error loading experience page:', error);
  }

  return (
    <div>
      <Experience 
        {...experienceData} 
        loading={loading}
      />
    </div>
  );
};

export default Page;