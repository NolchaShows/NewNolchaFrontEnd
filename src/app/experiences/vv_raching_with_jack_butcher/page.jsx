import { experienceData } from '@/data/experienceData'
import Experience from '@/components/common/Experience'
import React from 'react'

const Page = () => {
  return (
    <div><Experience {...experienceData[0]} /></div>
  )
}

export default Page