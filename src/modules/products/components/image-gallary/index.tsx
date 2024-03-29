import { Image as MedusaImage } from "@medusajs/medusa"
import Image from "next/image"
import { CSSProperties, useMemo, useRef } from "react"

type ImageGalleryProps = {
  images: MedusaImage[],
  isRentedOut: boolean
}

const ImageGallery = ({ images, isRentedOut }: ImageGalleryProps) => {
  const style:CSSProperties = useMemo(() => {
    if(isRentedOut) {
      return ({
        filter: 'grayscale(100%)',
        opacity: '.3'
      })
    }
    return {};
  }, [isRentedOut]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }

  return (
    <div className="flex items-start relative">
      <div className="hidden small:flex flex-col gap-y-4 sticky top-20">
        {images.map((image, index) => {
          return (
            <button
              key={image.id}
              className="h-14 w-12 relative border border-white"
              onClick={() => {
                handleScrollTo(image.id)
              }}
            >
              <span className="sr-only">Go to image {index + 1}</span>
              <Image
                src={image.url}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
                alt="Thumbnail"
              />
              
            </button>
          )
        })}
      </div>
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => {
          return (
            <div
              ref={(image) => imageRefs.current.push(image)}
              key={image.id}
              className="relative aspect-[29/29] w-full"
              id={image.id}
            >
              <Image
                src={image.url}
                layout="fill"
                objectFit="cover"
                priority={index <= 2 ? true : false}
                className="absolute inset-0"
                alt={`Product image ${index + 1}`}
                style={style}
              />
              {isRentedOut?(<div className="p-2 text-xs md:p-5 md:text-xl font-bold text-center text-gray-600 bg-gray-200 opacity-75 absolute top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-50%] w-full">All rented out</div>):""}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
