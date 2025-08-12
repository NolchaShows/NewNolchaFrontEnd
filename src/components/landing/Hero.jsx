import React from 'react'

function Hero() {
  return (
    <div className='md:p-[40px] py-[20px] px-[16px] max-w-[1440px] mx-auto'>
      <img
      src='/landing/hero.jpg'
      className='md:block hidden max-w-[1360px] max-h-[771px] w-full object-cover rounded-[12px]'
      />
      <img
      src='/landing/hero-mobile.jpg'
      className='md:hidden  max-h-[230px] w-full object-cover rounded-[3.58px]'
      />
    </div>
  )
}

export default Hero
