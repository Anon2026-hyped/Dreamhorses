'use client'
import { useState } from 'react'

const NAV_LINKS = ['Home', 'Search', 'Help', 'Contact', 'Sign In']

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const logoUrl = 'https://i.postimg.cc/rw2NkzCX/Dreamhorse-svg.png'

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* Logo Image */}
        <div className="flex items-center">
          <img
            src={logoUrl}
            alt="Logo"
            className="h-24 w-auto"
          />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-200 px-4 pb-4">
          <nav className="flex flex-col gap-3 pt-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-700 hover:text-gray-900 text-sm"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}