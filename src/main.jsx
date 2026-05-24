import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "sonner";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-right"
      richColors
      expand={false}
      closeButton
      toastOptions={{
        style: {
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "14px",
        },
      }}
    />
    <App />
  </StrictMode>,
);
