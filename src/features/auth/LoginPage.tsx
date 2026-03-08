import LoginForm from './components/LoginForm'
import LoginLinks from './components/LoginLinks'
import SupportButton from './components/SupportButton'

export default function LoginPage() {
  return (
    <div className="w-full">
      {/* Blue header banner */}
      <div
        className="w-full py-2 sm:py-3 text-center text-white font-semibold text-base sm:text-lg tracking-wide"
        style={{
          background: 'linear-gradient(to bottom, #7a8fbf 0%, #5a6faa 100%)',
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.08em',
        }}
      >
        My DreamHorse Account Login
      </div>

      {/* Form card */}
      <div className="max-w-xl mx-auto mt-4 sm:mt-8 px-4 sm:px-6 pb-8">
        <LoginForm />
        <LoginLinks />
        <SupportButton />
      </div>
    </div>
  )
}