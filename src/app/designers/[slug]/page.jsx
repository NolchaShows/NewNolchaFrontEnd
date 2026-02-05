"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import Designer from '@/components/designers/Designer';
import { useDesignerDetail } from '@/utils/designerPageUtils';

const Page = () => {
  const params = useParams();
  const slug = params.slug;

  const { designerDetail, loading, error } = useDesignerDetail(slug);

  if (error) {
    console.error('Error loading designer page:', error);
  }

  return (
    <div>
      <Designer
        {...designerDetail}
        loading={loading}
      />
    </div>
  );
};

export default Page;
