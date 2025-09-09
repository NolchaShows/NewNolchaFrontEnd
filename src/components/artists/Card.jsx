import React from 'react'

function Card({image, title}) {
  return (
    <div className='flex flex-col w-full lg:w-[calc(50%-20px)] xl:w-[calc(50%-25px)] 2xl:w-[calc(50%-30px)] lg:rounded-[8px] xl:rounded-[10px] 2xl:rounded-[12px] rounded-[12px]'>
      <img
        src={image}
        className='max-h-[510px] xl:max-h-[580px] 2xl:max-h-[800px] rounded-[10px] xl:rounded-[11px] 2xl:rounded-[12px] object-cover w-full'
      />
      <h1 className='font-medium text-[var(--secondary-text-color)] bg-[var(--surface-color2)] py-[16px] xl:py-[18px] 2xl:py-[20px] px-[10px] xl:px-[12px] 2xl:px-[15px] text-[20px] md:text-[18px] xl:text-[20px] 2xl:text-[28px] md:uppercase xl:leading-[1.3] 2xl:leading-[1.4]'>
        {title}
      </h1>
    </div>
  )
}

export default Card
