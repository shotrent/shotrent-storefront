import { Image as MedusaImage } from "@medusajs/medusa"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import clsx from "clsx"
import Image from "next/image"
import React, { CSSProperties, useMemo } from "react"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: MedusaImage[] | null
  size?: "small" | "medium" | "large" | "full",
  isRentedOut:boolean,
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isRentedOut
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <div
      className={clsx("relative aspect-[29/34]", {
        "w-[180px]": size === "small",
        "w-[290px]": size === "medium",
        "w-[440px]": size === "large",
        "w-full": size === "full",
      })}
    >
      <ImageOrPlaceholder image={initialImage} size={size} isRentedOut={isRentedOut} />
      {isRentedOut?(<div className="p-1 text-xs md:p-2 md:text-xl font-bold text-center text-gray-600 bg-gray-200 opacity-75 absolute top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-50%] w-full">All rented out</div>):""}
    </div>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
  isRentedOut
}: Pick<ThumbnailProps, "size"> & { image?: string } & Pick<ThumbnailProps, "isRentedOut">) => {
  const style:CSSProperties = useMemo(() => {
    if(isRentedOut) {
      return ({
        filter: 'grayscale(100%)',
        opacity: '.3'
      })
    }
    return {};
  }, [isRentedOut]);
  return image ? (
    <Image
      src={image}
      alt="Thumbnail"
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      className="absolute inset-0"
      draggable={false}
      style={style}
    />
  ) : (
    <div className="w-full h-full absolute inset-0 bg-gray-100 flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default Thumbnail
