import Link from "next/link"
import React from "react"

const Help = () => {
  return (
    <div>
      <h2 className="text-base-semi">Need help?</h2>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <Link href="/support">
              <a>Contact</a>
            </Link>
          </li>
          <li>
            <Link href="/support">
              <a>Returns & Exchanges</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
