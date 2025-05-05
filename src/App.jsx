import { Route, Routes, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./App.css";

// Context Providers
import { VoyagerProvider } from "./context/VoyagerContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import { ManagerProvider } from "./context/ManagerContext.jsx";
import { HeadCookProvider } from "./context/HeadCookContext.jsx";
import { SupervisorProvider } from "./context/SupervisorContext.jsx";

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
import Bookings from "./components/voyager/Bookings";

// Admin Components
import AdminDashboard from "./pages/AdminDashboard";
import AdminFood from "./components/admin/AdminFood";
import AdminMovies from "./components/admin/AdminMovies";
import AdminSpa from "./components/admin/AdminSpa";
import AdminActivity from "./components/admin/AdminActivity";
import AdminEntertainment from "./components/admin/AdminEntertainment";
import AdminGifts from "./components/admin/AdminGifts";

// Manager Components
import ManagerDashboard from "./pages/ManagerDashboard";
import ManagerSpa from "./components/manager/ManagerSpa";
import ManagerMovies from "./components/manager/ManagerMovies";
import ManagerActivity from "./components/manager/ManagerActivity";
import ManagerEntertainment from "./components/manager/ManagerEntertainment";

// Head Cook & Supervisor
import HeadCookDashboard from "./pages/HeadCookDashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";

// Common
import Unauthorized from "./components/common/Unauthorized";
import NotFound from "./components/common/NotFound";

const RoleGuard = ({ allowedRoles }) => {
      const { currentUser } = useAuth();
      const location = useLocation();

      if (!currentUser) {
            return <Navigate to="/login" state={{ from: location }} replace />;
      }

      if (!allowedRoles.includes(currentUser.role)) {
            return <Navigate to="/unauthorized" replace />;
      }

      return <Outlet />;
};

function App() {
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

                  {/* Voyager Routes */}
                  <Route
                        element={
                              <VoyagerProvider>
                                    <RoleGuard allowedRoles={["voyager"]} />
                              </VoyagerProvider>
                        }
                  >
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
                        <Route
                              path="/voyager/bookings"
                              element={<Bookings />}
                        />
                  </Route>

                  {/* Admin Routes */}
                  <Route
                        element={
                              <AdminProvider>
                                    <RoleGuard allowedRoles={["admin"]} />
                              </AdminProvider>
                        }
                  >
                        <Route
                              path="/admin/dashboard"
                              element={<AdminDashboard />}
                        />
                        <Route path="/admin/food" element={<AdminFood />} />
                        <Route path="/admin/gifts" element={<AdminGifts />} />
                        <Route path="/admin/spa" element={<AdminSpa />} />
                        <Route path="/admin/movies" element={<AdminMovies />} />
                        <Route
                              path="/admin/activities"
                              element={<AdminActivity />}
                        />
                        <Route
                              path="/admin/entertainment"
                              element={<AdminEntertainment />}
                        />
                  </Route>

                  {/* Manager Routes with ManagerProvider only here */}
                  <Route
                        element={
                              <ManagerProvider>
                                    <RoleGuard allowedRoles={["manager"]} />
                              </ManagerProvider>
                        }
                  >
                        <Route
                              path="/manager/dashboard"
                              element={<ManagerDashboard />}
                        />
                        <Route path="/manager/spa" element={<ManagerSpa />} />
                        <Route
                              path="/manager/movie"
                              element={<ManagerMovies />}
                        />
                        <Route
                              path="/manager/activities"
                              element={<ManagerActivity />}
                        />
                        <Route
                              path="/manager/entertainment"
                              element={<ManagerEntertainment />}
                        />
                  </Route>

                  {/* Head Cook Routes */}
                  <Route
                        element={
                              <HeadCookProvider>
                                    <RoleGuard allowedRoles={["head-cook"]} />
                              </HeadCookProvider>
                        }
                  >
                        <Route
                              path="/head-cook/dashboard"
                              element={<HeadCookDashboard />}
                        />
                  </Route>

                  {/* Supervisor Routes */}
                  <Route
                        element={
                              <SupervisorProvider>
                                    <RoleGuard allowedRoles={["supervisor"]} />
                              </SupervisorProvider>
                        }
                  >
                        <Route
                              path="/supervisor/dashboard"
                              element={<SupervisorDashboard />}
                        />
                  </Route>

                  {/* 404 */}
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
      );
}

export default App;
