const NAV_LINKS = ['Home', 'Search', 'Help', 'Contact', 'Sign In']

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Top footer nav */}
        <nav className="flex justify-center gap-3 sm:gap-6 flex-wrap mb-4">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm">
              {link}
            </a>
          ))}
        </nav>

        {/* Bottom row: BBB badge | copyright | thawte */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          {/* BBB Badge */}
          <div
            className="flex items-center gap-2 border-2 border-blue-700 rounded p-2 w-full sm:w-auto"
            style={{ minWidth: 'auto' }}
          >
            <div className="bg-blue-700 text-white font-bold text-xs px-2 py-1 rounded">BBB</div>
            <div>
              <div className="text-blue-900 font-bold text-xs leading-tight">ACCREDITED</div>
              <div className="text-blue-900 font-bold text-xs leading-tight">BUSINESS</div>
              <div className="text-gray-600 text-xs">Rating: A+</div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-600 text-sm order-first sm:order-none">
            <div>Dream Horse Classifieds, LLC</div>
            <div>Copyright 1998-2026</div>
          </div>

          {/* Thawte badge */}
          <div className="flex items-center gap-2 border border-gray-300 rounded p-2 w-full sm:w-auto">
            <div
              className="rounded-full flex items-center justify-center font-bold text-white text-lg"
              style={{ width: 40, height: 40, background: '#cc2200' }}
            >
              t
            </div>
            <div>
              <div className="text-gray-800 font-semibold text-sm">thawte</div>
              <div className="text-gray-500 text-xs">SECURED</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}