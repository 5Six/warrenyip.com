import React, { useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import NotFound from './pages/NotFound';
import Statify from './pages/Statify';
import Contact from './components/Contact';

function App() {
  const contactRef = useRef(null);

  return (
    <div>
      <Router>
        <Navbar contactRef={contactRef}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/Statify" element={<Statify></Statify>}/>
        </Routes>
      </Router>
      <div ref={contactRef}>
        <Contact/>
      </div>
    </div>
  )
}

export default App
