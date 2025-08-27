export default function EntryProtocol() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-wide">ENTRY PROTOCOL</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
          We're not exclusive for the sake of status. We're exclusive because clarity requires curation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative bg-[#EBE2D7] rounded-3xl p-8 md:p-12 overflow-hidden min-h-[300px]">
          <div className="absolute bottom-0 left-1/3 transform -translate-x-1/2 w-full h-1/2 flex items-center justify-center">
            <img 
              src="/membership/v2/01.png" 
              alt="Application process illustration"
              className="max-w-full max-h-full object-contain opacity-60"
            />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">APPLICATION</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Applications are reviewed by the membership committee.
            </p>
          </div>
        </div>

        {/* Section 02 - Committee Review */}
        <div className="relative bg-[#EBE2D7] rounded-3xl p-8 md:p-12 overflow-hidden min-h-[300px]">
          <div className="absolute bottom-0 left-2/5 transform -translate-x-1/2 w-full h-1/2 flex items-center justify-center">
            <img 
              src="/membership/v2/02.png" 
              alt="Committee review illustration"
              className="max-w-full max-h-full object-contain opacity-60"
            />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">COMMITTEE REVIEW</h3>
            <p className="text-gray-700 text-lg leading-relaxed">The process is done with a structured waiting list.</p>
          </div>
        </div>

        {/* Section 03 - Tiered Approval */}
        <div className="relative bg-[#EBE2D7] rounded-3xl p-8 md:p-12 overflow-hidden min-h-[300px]">
          <div className="absolute bottom-0 left-2/5 transform -translate-x-1/2 w-full h-1/2 flex items-center justify-center">
            <img 
              src="/membership/v2/03.png" 
              alt="Tiered approval illustration"
              className="max-w-full max-h-full object-contain opacity-60"
            />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">TIERED APPROVAL</h3>
            <p className="text-gray-700 text-lg leading-relaxed">Tiered approval process is implemented.</p>
          </div>
        </div>

        {/* Section 04 - Referral Boost */}
        <div className="relative bg-[#EBE2D7] rounded-3xl p-8 md:p-12 overflow-hidden min-h-[300px]">
          <div className="absolute bottom-0 left-2/5 transform -translate-x-1/2 w-full h-1/2 flex items-center justify-center">
            <img 
              src="/membership/v2/04.png" 
              alt="Referral boost illustration"
              className="max-w-full max-h-full object-contain opacity-60"
            />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">REFERRAL BOOST</h3>
            <p className="text-gray-700 text-lg leading-relaxed">Most applicants are referred by existing members.</p>
          </div>
        </div>
      </div>
    </div>
  )
}