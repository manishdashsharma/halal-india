import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';


createRoot(document.getElementById('root')).render(
    <RecoilRoot>
    <BrowserRouter>
      <App />
      <Toaster position="top-center" />
    </BrowserRouter>
    </RecoilRoot>
)
