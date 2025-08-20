import { experienceData } from '@/app/data/experienceData'
import Experience from '@/components/common/Experience'
import React from 'react'

const Page = () => {
  return (
    <div><Experience {...experienceData[1]} /></div>
  )
}

export default Page