'use client'
import { useState } from 'react'

const NAV_LINKS = ['Home', 'Search', 'Help', 'Contact', 'Sign In']

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* Logo */}
        <div className="flex flex-col items-start">
          <span
            className="font-bold text-xl sm:text-2xl tracking-wide"
            style={{
              color: '#4a5a9a',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.05em'
            }}
          >
            DreamHorse.com
          </span>

          <div className="hidden sm:flex items-center gap-1 mt-1">
            {[0, 1, 2, 3].map((i) => (
              <HorseSilhouette key={i} index={i} />
            ))}
          </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
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

function HorseSilhouette({ index }: { index: number }) {
  const sizes = [36, 38, 40, 36]
  const size = sizes[index]

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <g fill="#1a1a2e" opacity={0.75 + index * 0.05}>
        <ellipse cx="20" cy="26" rx="12" ry="10" />
        <rect x="16" y="14" width="8" height="12" rx="3" />
        <ellipse cx="20" cy="12" rx="6" ry="7" />
        <polygon points="17,6 19,1 22,6" />
        <ellipse cx="17" cy="10" rx="2" ry="5" />
      </g>
    </svg>
  )
}