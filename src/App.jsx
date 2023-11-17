import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import NotFound from './pages/NotFound';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />}/>
            {/* <Route path="home" element={<Home/>} /> */}
            <Route path="about" element={<About />}/>
            <Route path="contact" element={<Contact />}/>
            <Route path="services" element={<Services />}/>
          </Route>
          <Route path='*' element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
