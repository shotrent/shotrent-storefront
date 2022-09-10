import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="flex flex-col items-center text-center mt-16 bg-amber-100 w-full py-12 px-4">

      <p className="text-lg font-bold text-gray-900 max-w-lg mb-2">
        Don&rsquo;t have a camera? Rent from us.
      </p>
      <p className="text-sm text-gray-700 mb-8">
        Now rent Full Frame DSLR and lenses the Hassle-free way with delivery across Mumbai and Thane areas.
      </p>
      <UnderlineLink href="/store">Explore products</UnderlineLink>
    </div>
  )
}

export default Hero
