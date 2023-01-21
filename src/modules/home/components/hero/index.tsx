import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="content-container">
      <div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
        <div className="md:w-4/12 lg:w-5/12 bg-amber-50 border border-amber-100 shadow-md py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative">
          <div className="flex flex-col justify-center">
            <h1 className="text-base lg:text-4xl font-semibold text-gray-800">No deposit needed.</h1>
            <p className="text-sm text-gray-800">Just pay the first month's rent and we'll ship your order. Cash on delivery available.</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-strech justify-between bg-amber-50 border border-amber-100 shadow-md py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12">
          <div className="flex flex-col justify-center md:w-1/2">
            <h1 className="text-base lg:text-4xl font-semibold text-gray-800">Flexible rental period</h1>
            <p className="text-sm text-gray-800 mt-2">Choose your rental tenure of <span className="font-bold">1, 3, 6, or 12 months</span>. Longer tenures have lower monthly rent.</p>
          </div>         
        </div>
        
      </div>
    </div>
  )
}

export default Hero
