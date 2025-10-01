export default function ApplyToJoin() {
  return (
    <div className="w-full bg-[#E8DDD4] py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img 
              src="/membership/v2/1.png" 
              alt="Member profiles"
              className="w-24 h-16 md:w-32 md:h-20 object-contain"
            />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2C5530] mb-8 tracking-wide">
          APPLY TO JOIN
        </h2>

        <div className="space-y-3 mb-10">
          <p className="text-gray-800 text-lg md:text-xl">
            • Membership by Invitation or Application Only
          </p>
          <p className="text-gray-800 text-lg md:text-xl">
            • Waitlist and screening required.
          </p>
        </div>

        <button className="bg-[#E7F0D3] hover:bg-[#96B496] transition-colors duration-200 text-gray-800 px-8 py-3 text-base font-medium">
          Apply now
        </button>
      </div>
    </div>
  )
}