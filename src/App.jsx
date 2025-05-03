import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./App.css";

// Auth Components
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";

// Voyager Components
import VoyagerDashboard from "./pages/VoyagerDashboard";
import OrderFood from "./components/voyager/OrderFood";
import GiftShop from "./components/voyager/GiftShop";
import MovieBooking from "./components/voyager/MovieBooking";
import SpaBooking from "./components/voyager/SpaBooking";
import Activities from "./components/voyager/Activities";
import Entertainment from "./components/voyager/Entertainment";
import Orders from "./components/voyager/Orders";

// Admin Components
import AdminDashboard from "./pages/AdminDashboard";
import AdminFood from "./components/admin/AdminFood";
import AdminMovies from "./components/admin/AdminMovies";
import AdminSpa from "./components/admin/AdminSpa";
import AdminActivity from "./components/admin/AdminActivity";
import AdminEntertainment from "./components/admin/AdminEntertainment";
import AdminGifts from "./components/admin/AdminGifts";

// Common Components
import Unauthorized from "./components/common/Unauthorized";
import NotFound from "./components/common/NotFound";

const RoleGuard = ({ allowedRoles }) => {
      const { currentUser } = useAuth();

      if (!currentUser) {
            return <Navigate to="/login" state={{ from: location }} replace />;
      }

      if (!allowedRoles.includes(currentUser.role)) {
            return <Navigate to="/unauthorized" replace />;
      }

      return <Outlet />;
};

function App() {
      const { currentUser } = useAuth();
      console.log(currentUser);
      return (
            <Routes>
                  {/* Public Routes */}
                  <Route
                        path="/"
                        element={<h1>Welcome to Cruise Management System</h1>}
                  />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />

                  {/* Voyager Routes - Strictly for voyagers only */}
                  <Route element={<RoleGuard allowedRoles={["voyager"]} />}>
                        <Route
                              path="/voyager/dashboard"
                              element={<VoyagerDashboard />}
                        />
                        <Route
                              path="/voyager/order-food"
                              element={<OrderFood />}
                        />
                        <Route
                              path="/voyager/gift-shop"
                              element={<GiftShop />}
                        />
                        <Route
                              path="/voyager/movies"
                              element={<MovieBooking />}
                        />
                        <Route path="/voyager/spa" element={<SpaBooking />} />
                        <Route
                              path="/voyager/activities"
                              element={<Activities />}
                        />
                        <Route
                              path="/voyager/entertainment"
                              element={<Entertainment />}
                        />
                        <Route path="/voyager/orders" element={<Orders />} />
                  </Route>

                  {/* Admin Dashboard - Strictly for admins only */}
                  <Route element={<RoleGuard allowedRoles={["admin"]} />}>
                        <Route
                              path="/admin/dashboard"
                              element={<AdminDashboard />}
                        />
                  </Route>

                  {/* Food Management - Admin and Head Chef */}
                  <Route
                        element={
                              <RoleGuard
                                    allowedRoles={["admin", "head-cook"]}
                              />
                        }
                  >
                        <Route path="/admin/food" element={<AdminFood />} />
                  </Route>

                  {/* Gift Shop Management - Admin and Manager */}
                  <Route
                        element={
                              <RoleGuard allowedRoles={["admin", "manager"]} />
                        }
                  >
                        <Route path="/admin/gifts" element={<AdminGifts />} />
                  </Route>

                  {/* Spa Management - Admin and Manager */}
                  <Route
                        element={
                              <RoleGuard allowedRoles={["admin", "manager"]} />
                        }
                  >
                        <Route path="/admin/spa" element={<AdminSpa />} />
                  </Route>

                  {/* Activities Management - Admin and Supervisor */}
                  <Route
                        element={
                              <RoleGuard
                                    allowedRoles={["admin", "supervisor"]}
                              />
                        }
                  >
                        <Route
                              path="/admin/activities"
                              element={<AdminActivity />}
                        />
                  </Route>

                  {/* Entertainment Management - Admin and Supervisor */}
                  <Route
                        element={
                              <RoleGuard
                                    allowedRoles={["admin", "supervisor"]}
                              />
                        }
                  >
                        <Route path="/admin/movies" element={<AdminMovies />} />
                        <Route
                              path="/admin/entertainment"
                              element={<AdminEntertainment />}
                        />
                  </Route>

                  {/* Error Handling */}
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
      );
}

export default App;
