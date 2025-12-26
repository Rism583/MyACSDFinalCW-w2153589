import Header from './Components/Header.jsx';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import PropertyGallery from './Components/PropertyGallery.jsx';
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Header />
      <Navbar />

      <main>
        <PropertyGallery />
      </main>

      <Footer />
    </div>
  )
}

export default App
