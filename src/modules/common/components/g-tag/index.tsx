import Script from "next/script"
import React from "react"


const Gtag: React.FC = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <>
      {isProduction && (
        <>
          {/* <!-- Google tag (gtag.js) --> */}
          <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-957359900"></Script>
          <Script id="gtag-script">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-957359900');
          `}
          </Script>
        </>)}
    </>
  )
}

export default Gtag;
