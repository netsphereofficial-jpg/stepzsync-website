import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import DeleteAccount from './pages/DeleteAccount.jsx'
import OpenInApp from './pages/OpenInApp.jsx'
import { initReveal } from './reveal.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        {/* Deep-link fallbacks: when the app isn't installed, these render the
            "Open in App" page. When it is installed + links are verified, the OS
            intercepts the https URL before the browser loads it. */}
        <Route path="/invite/:code" element={<OpenInApp type="invite" />} />
        <Route path="/race/:raceId" element={<OpenInApp type="race" />} />
        <Route path="/profile/:username" element={<OpenInApp type="profile" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

// Start the global scroll-reveal net after the first paint so initial nodes
// exist; its MutationObserver then catches everything React renders later.
requestAnimationFrame(() => initReveal())
