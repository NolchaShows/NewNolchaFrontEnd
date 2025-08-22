import CharityPartner from '@/components/common/CharityPartner'
import { charityPartnersData } from '@/data/charityPartnersData'
import React from 'react'

const Page = () => {
  return (
    <CharityPartner {...charityPartnersData[0]} />
  )
}

export default Page