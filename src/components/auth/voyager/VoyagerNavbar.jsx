import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import {
      FiHome,
      FiCalendar,
      FiShoppingCart,
      FiUser,
      FiLogOut,
      FiMenu,
      FiX,
} from "react-icons/fi";

export default function VoyagerNavbar() {
      const { currentUser, logout } = useAuth();
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const navigate = useNavigate();

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
                  path: "/voyager/dashboard",
                  icon: <FiHome className="mr-2" />,
            },
            {
                  name: "Bookings",
                  path: "/voyager/bookings",
                  icon: <FiCalendar className="mr-2" />,
            },
            {
                  name: "Orders",
                  path: "/voyager/orders",
                  icon: <FiShoppingCart className="mr-2" />,
            },
            {
                  name: "Profile",
                  path: "/voyager/profile",
                  icon: <FiUser className="mr-2" />,
            },
      ];

      return (
            <nav className="bg-white shadow-lg">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                              {/* Logo and desktop menu */}
                              <div className="flex items-center">
                                    <Link
                                          to="/voyager/dashboard"
                                          className="flex-shrink-0 flex items-center"
                                    >
                                          {/* <img
                                                className="h-8 w-auto"
                                                src="/logo.png" // Replace with your cruise logo
                                                alt="Cruise Ship Management"
                                          /> */}
                                          <span className="ml-2 text-xl font-bold text-blue-600 hidden md:block">
                                                Cruise Voyager
                                          </span>
                                    </Link>
                                    <div className="hidden md:ml-6 md:flex md:space-x-8">
                                          {navItems.map((item) => (
                                                <Link
                                                      key={item.name}
                                                      to={item.path}
                                                      className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                                >
                                                      {item.icon}
                                                      {item.name}
                                                </Link>
                                          ))}
                                    </div>
                              </div>

                              {/* User profile and mobile menu button */}
                              <div className="flex items-center">
                                    <div className="hidden md:ml-4 md:flex md:items-center">
                                          <div className="ml-3 relative">
                                                <div className="flex items-center space-x-4">
                                                      <span className="text-gray-600 text-sm">
                                                            Welcome,{" "}
                                                            {
                                                                  currentUser?.email?.split(
                                                                        "@"
                                                                  )[0]
                                                            }
                                                      </span>
                                                      <button
                                                            onClick={
                                                                  handleLogout
                                                            }
                                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                                                      >
                                                            <FiLogOut className="mr-2" />
                                                            Logout
                                                      </button>
                                                </div>
                                          </div>
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
}
