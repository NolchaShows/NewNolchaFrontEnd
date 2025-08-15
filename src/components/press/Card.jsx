import Link from 'next/link'
import React from 'react'

function Card({newsPaper,image,title,link}) {
  return (
    <div className='lg:py-[40px] py-[20px] lg:px-[26px] px-[16px] flex flex-col md:gap-[24px] gap-[20px] lg:max-w-[500px] xl:max-w-[660px] w-full lg:rounded-[8px] rounded-[17.04px] bg-[var(--surface-color2)] border border-[var(--surface-color)]'>
      <img
       src={newsPaper}
      className='max-w-[224px] object-cover'
      />
      <img
      src={image}
      className='max-h-[346px] rounded-[10px] object-cover'
      />
      <h1 className='font-medium text-[var(--secondary-text-color)] text-[20px] md:text-[24px] md:uppercase'>
        {title}
      </h1>
      <Link href={link} className='text-center bg-[var(--primary-color)] py-[12px] px-[24px] w-full'>
      View Article
      </Link>
    </div>
  )
}

export default Card
