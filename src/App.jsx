import React from 'react'
import { Header, HomePage, Search, Footer } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  )
}

export default App