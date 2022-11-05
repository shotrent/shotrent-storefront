import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const FooterCTA = () => {
  return (
    <div className="py-9 md:py-12">
      <div className="bg-amber-100 w-full">
        <div className="content-container flex flex-col-reverse gap-y-8 small:flex-row small:items-center justify-between py-16 relative">
          <div>
            <h3 className="text-2xl-semi">Have fun with tech, minus the usual commitment.</h3>
            <div className="mt-6">
              <UnderlineLink href="/store">Explore products</UnderlineLink>
            </div>
          </div>

          <div className="relative w-full aspect-square small:w-[35%] small:aspect-[28/36]">
            <Image
              src="/smart-watch-gc32524a5e_1280.jpg"
              alt=""
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterCTA
