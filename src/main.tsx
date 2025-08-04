// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import App from './App'
// import { AuthProvider } from './context/AuthContext'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// )
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from './context/AuthContext' // <-- IMPORTANTE

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* <-- Aquí envolvemos la App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
    