import React from 'react'
import { Header, HomePage, Search, Footer, Song, Artist } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/song/:id" element={<Song />} />
          <Route path="/artist/:id" element={<Artist />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  )
}

export default App