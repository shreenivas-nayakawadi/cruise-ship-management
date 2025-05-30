import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import {
      FiHome,
      FiUser,
      FiLogOut,
      FiMenu,
      FiX,
      FiCoffee,
      FiGift,
      FiFilm,
      FiSmile,
      FiActivity,
      FiMusic,
} from "react-icons/fi";

const ManagerNavbar = () => {
      const { currentUser, logout } = useAuth();
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const navigate = useNavigate();
      const location = useLocation();

      const handleLogout = async () => {
            try {
                  await logout();
                  navigate("/login");
            } catch (error) {
                  console.error("Logout error:", error);
            }
      };

      const navItems = [
            {
                  name: "Dashboard",
                  path: "/manager/dashboard", // Updated to consistent path structure
                  icon: <FiHome className="mr-2" />,
            },
            {
                  name: "Movie Bookings",
                  path: "/manager/movie",
                  icon: <FiFilm className="mr-2" />, // Movie-specific icon
            },
            {
                  name: "Spa Bookings",
                  path: "/manager/spa",
                  icon: <FiSmile className="mr-2" />, // Spa-related icon
            },
            {
                  name: "Activities",
                  path: "/manager/activities",
                  icon: <FiActivity className="mr-2" />, // Activities icon
            },
            {
                  name: "Entertainment",
                  path: "/manager/entertainment",
                  icon: <FiMusic className="mr-2" />, // Entertainment icon
            },
      ];

      return (
            <nav className="bg-white shadow-lg">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                              {/* Logo and desktop menu */}
                              <div className="flex items-center justify-between">
                                    <Link
                                          to="/manager/dashboard"
                                          className="flex-shrink-0 flex items-center"
                                    >
                                          <img
                                                className="h-8 w-auto"
                                                src="/logo.png"
                                          />
                                          <span className="ml-2 text-xl font-bold text-blue-600 hidden md:block">
                                                Cruise Manager
                                          </span>
                                    </Link>
                              </div>

                              {/* User profile and mobile menu button */}
                              <div className="flex items-center gap-10">
                                    <div className="hidden md:ml-6 md:flex md:space-x-8">
                                          {navItems.map((item) => (
                                                <Link
                                                      key={item.name}
                                                      to={item.path}
                                                      className={`${
                                                            location.pathname ===
                                                            item.path
                                                                  ? "border-blue-500 text-blue-600"
                                                                  : "border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700"
                                                      } inline-flex items-center px-1 py-1 border-b-2 text-xs font-medium`}
                                                >
                                                      {item.icon}
                                                      {item.name}
                                                </Link>
                                          ))}
                                    </div>
                                    <div className=" hidden md:flex md:items-center relative">
                                          <button
                                                onClick={() =>
                                                      setMobileMenuOpen(
                                                            !mobileMenuOpen
                                                      )
                                                }
                                                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                                          >
                                                <FiUser className="text-xl" />
                                          </button>
                                          {mobileMenuOpen && (
                                                <div className="absolute right-10 top-10 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg z-50 p-4 text-sm">
                                                      <div className="mb-2 overflow-clip">
                                                            <strong>
                                                                  Email:
                                                            </strong>{" "}
                                                            {currentUser?.email}
                                                      </div>

                                                      <button
                                                            onClick={
                                                                  handleLogout
                                                            }
                                                            className="mt-2 w-full text-center bg-red-500 hover:bg-red-600 text-white py-1 rounded"
                                                      >
                                                            Logout
                                                      </button>
                                                </div>
                                          )}
                                    </div>
                                    {/* Mobile menu button */}
                                    <div className="-mr-2 flex items-center md:hidden">
                                          <button
                                                onClick={() =>
                                                      setMobileMenuOpen(
                                                            !mobileMenuOpen
                                                      )
                                                }
                                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                                          >
                                                {mobileMenuOpen ? (
                                                      <FiX className="h-6 w-6" />
                                                ) : (
                                                      <FiMenu className="h-6 w-6" />
                                                )}
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Mobile menu */}
                  <div
                        className={`md:hidden ${
                              mobileMenuOpen ? "block" : "hidden"
                        }`}
                  >
                        <div className="pt-2 pb-3 space-y-1">
                              {navItems.map((item) => (
                                    <Link
                                          key={item.name}
                                          to={item.path}
                                          className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-blue-500 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                                          onClick={() =>
                                                setMobileMenuOpen(false)
                                          }
                                    >
                                          <div className="flex items-center">
                                                {item.icon}
                                                {item.name}
                                          </div>
                                    </Link>
                              ))}
                              <div className="pt-4 border-t border-gray-200">
                                    <div className="flex items-center px-4">
                                          <div className="flex-shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                      <FiUser className="h-6 w-6 text-blue-600" />
                                                </div>
                                          </div>
                                          <div className="ml-3">
                                                <div className="text-base font-medium text-gray-800">
                                                      {currentUser?.email}
                                                </div>
                                          </div>
                                    </div>
                                    <div className="mt-3 px-2">
                                          <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                          >
                                                <FiLogOut className="mr-2" />
                                                Sign out
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </nav>
      );
};
export default ManagerNavbar;
