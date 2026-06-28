import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import VerifyEmail from './pages/VerifyEmail';
import Auth from './pages/Auth';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<Auth />} />
          <Route path="/auth/login" element={<Auth />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />

          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App
