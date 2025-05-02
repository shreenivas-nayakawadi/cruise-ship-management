import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import VoyagerDashboard from "./pages/VoyagerDashboard";

function App() {
      return (
            <Routes>
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/" element={ <h1>Welcome to the Cruise App</h1> } />
                  <Route path="/voyagerDashboard" element={ <VoyagerDashboard/> } />
                  <Route path="/register" element={<RegisterForm />} />
                  {/* Other routes */}
            </Routes>
      );
}

export default App;
