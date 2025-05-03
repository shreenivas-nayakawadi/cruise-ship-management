import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { VoyagerProvider } from "./context/VoyagerContext.jsx";

createRoot(document.getElementById("root")).render(
      <StrictMode>
            <BrowserRouter>
                  <AuthProvider>
                        <VoyagerProvider>
                              <App />
                        </VoyagerProvider>
                  </AuthProvider>
            </BrowserRouter>
      </StrictMode>
);
