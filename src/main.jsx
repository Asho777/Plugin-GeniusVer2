import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from './components/ui/toaster'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { HomePage } from './pages/home'
import { CreatePage } from './pages/create'
import { TemplatesPage } from './pages/templates'
import { LoginPage } from './pages/login'
import { SignupPage } from './pages/signup'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        <Footer />
      </div>
      <Toaster />
    </Router>
  </React.StrictMode>,
)
