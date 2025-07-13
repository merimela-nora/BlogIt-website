import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


function App() {
  return (

    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp/>} />
      </Routes>
      <Footer/>
    </Router>

  )
}

export default App
