export default function MemberBenefits() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide">MEMBER BENEFITS</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div className="bg-gray-100 rounded-2xl p-6 min-h-[125px] flex items-center justify-center md:col-span-1">
          <h3 className="text-lg md:text-xl font-medium text-gray-800 text-center">Event Discounts</h3>
        </div>

        <div className="bg-gray-100 rounded-2xl p-6 min-h-[125px] flex items-center justify-center md:col-span-1">
          <h3 className="text-lg md:text-xl font-medium text-gray-800 text-center">Curated Digital Library</h3>
        </div>

        <div className="bg-gray-100 rounded-2xl p-8 min-h-[200px] flex items-center justify-center md:col-span-2 lg:col-span-3 lg:row-span-2">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center">
            Unlock exclusive access to a curated suite of experiences designed to elevate your influence and expand your network — all within a trusted, high-caliber community.
          </p>
        </div>

        <div className="bg-gray-100 rounded-2xl p-6 min-h-[125px] flex items-center justify-center md:col-span-1">
          <h3 className="text-lg md:text-xl font-medium text-gray-800 text-center">Member Lounge</h3>
        </div>

        <div className="bg-gray-100 rounded-2xl p-6 min-h-[125px] flex items-center justify-center md:col-span-1">
          <h3 className="text-lg md:text-xl font-medium text-gray-800 text-center">Private Collaborations</h3>
        </div>
      </div>
    </div>
  )
}