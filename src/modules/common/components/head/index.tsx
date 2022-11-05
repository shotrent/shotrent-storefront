import NextHead from "next/head"
import Script from "next/script"
import React from "react"
import Clarity from "../clarity"
import Gtag from "../g-tag"

type HeadProps = {
  title?: string
  description?: string | null
  image?: string | null
}

const Head: React.FC<HeadProps> = ({ title, description, image }) => {
  const isProduction = true;//process.env.NODE_ENV === "production";

  return (
    <>
      <NextHead>
        <title>{title} | Shotrent</title>
        <meta itemProp="name" content={title} />
        {description && <meta itemProp="description" content={description} />}
        {image && <meta itemProp="image" content={image} />}
        <link rel="icon" href="/favicon.ico" />
      </NextHead>
      <Gtag />
      <Clarity />
    </>
  )
}

export default Head
