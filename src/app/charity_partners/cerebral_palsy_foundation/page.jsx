import CharityPartner from '@/components/common/CharityPartner'
import { charityPartnersData } from '@/data/charityPartnersData'
import React from 'react'

const Page = () => {
  console.log(charityPartnersData[0])
  return (
    <CharityPartner {...charityPartnersData[0]} />
  )
}

export default Page