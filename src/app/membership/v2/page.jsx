import ImageWithQuote from '@/components/membership/ImageWithQuote'
import InfoCard from '@/components/membership/InfoCard'
import ApplyToJoin from '@/components/membership/v2/ApplyToJoin'
import EntryProtocol from '@/components/membership/v2/EntryProtocol'
import FlagshipEvents from '@/components/membership/v2/FlagshipEvents'
import MemberBenefits from '@/components/membership/v2/MemberBenefits'
import MembershipTiers from '@/components/membership/v2/MembershipTiers'
import WhyItMatters from '@/components/membership/v2/WhyItMatters'
import React from 'react'

const Page = () => {
    return (
        <div>
            <div className="py-8 px-4 ml-5">
                <h1 className="text-2xl md:text-3xl font-medium text-[#003233] mb-2 tracking-wide">
                    NOLCHA INNER CIRCLE
                </h1>
                <p className="text-[#003233] text-sm md:text-base font-medium">
                    WHERE INFLUENCE BECOME LEGACY
                </p>
            </div>
            <InfoCard imageUrl={"/membership/1.png"} description={"Nolcha Inner Circle is a private membership community for founders, investors, creatives, and cultural leaders who don’t follow trends — they set them. Entry is application-based. Access is limited. For those inside, it’s more than a club — it’s a strategic ecosystem."} />
            <div className='mt-10'>
                <WhyItMatters />
            </div>
            <MembershipTiers />
            <EntryProtocol />
            <MemberBenefits />
            <ApplyToJoin />
            <FlagshipEvents />
            <ImageWithQuote imageUrl={"/membership/3.png"} title={"Now you’re crafting a private influence network, not a social club."} description={"We don’t need a traditional ‘club.’ We need a living concept. A curated, rotating space in that feels like a cultural moment — not a building. Nolcha’s strength is not bricks. It’s energy."} />
        </div>
    )
}

export default Page