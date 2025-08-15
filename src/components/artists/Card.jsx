import Link from 'next/link'
import React from 'react'

function Card({image,title}) {
  return (
    <div className=' flex flex-col lg:max-w-[500px] xl:max-w-[660px] w-full lg:rounded-[8px] rounded-[12px] '>
      <img
      src={image}
      className='max-h-[510px] rounded-[10px] object-cover w-full'
      />
      <h1 className='font-medium text-[var(--secondary-text-color)] bg-[var(--surface-color2)] py-[16px] px-[10px] text-[20px] md:text-[24px] md:uppercase'>
        {title}
      </h1>
    </div>
  )
}

export default Card
