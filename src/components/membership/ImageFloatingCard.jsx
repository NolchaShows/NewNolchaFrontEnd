export default function ImageFloatingCard({ imageUrl, title, description }) {
  return (
    <div className="bg-[#F4F4F4] mt-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center relative">
        <div className="md:w-2/3 w-full rounded-lg overflow-hidden shadow relative">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt="visual"
            className="md:mt-20 md:mb-16 w-full h-64 md:h-full object-cover"
          />
        </div>

        <div className="md:-ml-20 -mt-16 md:mt-0 mx-4 md:mx-0 md:w-1/2 bg-[#EBE2D7] rounded-lg shadow-lg p-6 relative z-10">
          <h2 className="text-xl md:text-2xl font-bold text-green-900 mb-3">{title}</h2>
          <p className="text-sm md:text-base text-gray-800 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}
