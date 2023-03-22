import clsx from "clsx"
import { useCollections } from "medusa-react"
import Link from "next/link"
import CountrySelect from "../country-select"

const FooterNav = () => {
  const { collections } = useCollections()

  return (
    <div className="content-container flex flex-col gap-y-8 pt-16 pb-8">
      <div className="flex flex-col xsmall:flex-row items-start justify-between">
        <div>
          <Link href="/">
            <a className="text-xl-semi uppercase">Shotrent</a>
          </Link>
        </div>
        <div className="text-small-regular grid md:grid-cols-3 grid-cols-2 gap-x-16">
          <div className="flex flex-col gap-y-2 mt-8">
            <span className="text-base-semi">Categories</span>
            <ul
              className={clsx("grid grid-cols-1 gap-y-2", {
                "grid-cols-2": (collections?.length || 0) > 4,
              })}
            >
              {collections?.map((c) => (
                <li key={c.id}>
                  <Link href={`/collections/${c.id}`}>
                    <a>{c.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-y-2 mt-8">
            <span className="text-base-semi">Connect</span>
            <ul className="grid grid-cols-1 gap-y-2">
              <li>
                <a
                  href="https://instagram.com/shotrent.in"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto://info@shotrent.in"
                  target="_blank"
                  rel="noreferrer"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917738713191?text=Hello%2C%20I%20am%20looking%20for%20gadgets%20on%20rent"
                  target="_blank"
                  rel="noreferrer"
                >
                  Whatsapp
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-2 mt-8">
            <span className="text-base-semi">Shotrent</span>
            <ul className="grid grid-cols-1 gap-y-2">
              <li>
                <Link
                  href="/support" >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                >
                  Terms & conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation"
                >
                 Cancellation & Return
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy-for-owners"
                >
                  Protection for owners
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-y-4 justify-center xsmall:items-center xsmall:flex-row xsmall:items-end xsmall:justify-between">
        <span className="text-xsmall-regular text-gray-500">
          © Copyright 2022 SHOTRENT
        </span>
        <div className="min-w-[316px] flex xsmall:justify-end">
          <CountrySelect />
        </div>
      </div>
    </div>
  )
}

export default FooterNav
