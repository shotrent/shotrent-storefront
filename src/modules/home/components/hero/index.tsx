import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="container mx-auto py-9 md:py-12 px-4 md:px-6">
      <div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
        <div className="md:w-4/12 lg:w-5/12 bg-amber-50 dark:bg-amber-800 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">Rent it! with Shotrent</h1>
            <p className="text-base text-gray-800 dark:text-white mt-2">It&apos;s all about renting tech—no strings attached.</p>
            <p className="text-base text-gray-800 dark:text-white">Or, pay for the remaining months anytime and buy it immediately.</p>
          </div>
          <div className="flex justify-end md:absolute md:bottom-4 md:right-4 lg:bottom-0 lg:right-0">
            <img src="/Rectangle-59-1.png" alt="" className="md:w-20 md:h-20 lg:w-full lg:h-full" />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-strech justify-between bg-amber-50 dark:bg-amber-800 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12">
          <div className="flex flex-col justify-center md:w-1/2">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">How it works?</h1>
            <p className="text-base text-gray-800 dark:text-white mt-2">Choose your minimum rental period of <span className="font-bold">1, 3, 6, or 12 months</span>. You can switch to a longer term at any time and save.</p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
            <img src="/Rectangle-56-1.png" alt="" className="" />
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Hero
