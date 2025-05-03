import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import VoyagerDashboard from "./pages/VoyagerDashboard";
import OrderFood from "./components/voyager/OrderFood";
import GiftShop from "./components/voyager/GiftShop";
import MovieBooking from "./components/voyager/MovieBooking";
import SpaBooking from "./components/voyager/SpaBooking";
import Activities from "./components/voyager/Activities";
import Entertainment from "./components/voyager/Entertainment";
import Orders from "./components/voyager/Orders";

function App() {
      return (
            <Routes>
                  <Route path="/login" element={<LoginForm />} />
                  <Route
                        path="/"
                        element={<h1>Welcome to the Cruise App</h1>}
                  />
                  <Route
                        path="/voyagerDashboard"
                        element={<VoyagerDashboard />}
                  />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/voyager/order-food" element={<OrderFood />} />
                  <Route path="/voyager/gift-shop" element={<GiftShop />} />
                  <Route path="/voyager/movies" element={<MovieBooking />} />
                  <Route path="/voyager/spa" element={<SpaBooking />} />
                  <Route path="/voyager/activities" element={<Activities />} />
                  <Route path="/voyager/orders" element={<Orders />} />
                  <Route
                        path="/voyager/entertainment"
                        element={<Entertainment />}
                  />
                  {/* Other routes */}
            </Routes>
      );
}

export default App;
