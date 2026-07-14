import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.tsx'
import { getDeviceId } from './utils/fingerprint'

import { useResumeStore } from './store/useResumeStore'

// Intercept all Axios requests to attach Device Fingerprint
axios.interceptors.request.use(async (config) => {
  if (config.url?.includes('/api/ai')) {
    const deviceId = await getDeviceId();
    config.headers['X-Device-ID'] = deviceId;
  }
  return config;
});

// Intercept all Axios responses to catch 429 globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      useResumeStore.getState().setShowAILimitPopup(true);
    }
    return Promise.reject(error);
  }
);

// Intercept all native fetch requests to attach Device Fingerprint
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  let [resource, config] = args;
  
  if (typeof resource === 'string' && resource.includes('/api/ai')) {
    const deviceId = await getDeviceId();
    config = config || {};
    config.headers = {
      ...config.headers,
      'X-Device-ID': deviceId,
    };
  }
  
  const response = await originalFetch(resource, config);
  
  if (response.status === 429) {
    useResumeStore.getState().setShowAILimitPopup(true);
  }
  
  return response;
};

import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
