import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { VoyagerProvider } from "./context/VoyagerContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
      <StrictMode>
            <BrowserRouter>
                  <AuthProvider>
                        <VoyagerProvider>
                              <AdminProvider>
                                    <App />
                              </AdminProvider>
                        </VoyagerProvider>
                  </AuthProvider>
            </BrowserRouter>
      </StrictMode>
);
