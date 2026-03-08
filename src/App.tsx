import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoginPage from './features/auth/LoginPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <LoginPage />
      </main>
      <Footer />
    </div>
  )
}

export default App