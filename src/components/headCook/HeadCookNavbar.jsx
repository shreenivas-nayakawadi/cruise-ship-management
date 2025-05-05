import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiUser } from "react-icons/fi";

const HeadCookNavbar = () => {
      const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
      const { currentUser, logout } = useAuth();
      const navigate = useNavigate();
      const handleLogout = async () => {
            try {
                  await logout();
                navigate("/login", { replace: true });  
                } catch (error) {
                  console.error("Error logging out:", error);
            }
      };
      return (
            <nav className="bg-white shadow-lg ">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                              <div className="flex">
                                    <div className="flex items-center justify-between">
                                          <Link
                                                to="/head-cook/dashboard"
                                                className="flex-shrink-0 flex items-center"
                                          >
                                                <img
                                                      className="h-8 w-auto"
                                                      src="/logo.png"
                                                />
                                                <span className="ml-2 text-xl font-bold text-blue-600 hidden md:block">
                                                      CruiseChef
                                                </span>
                                          </Link>
                                    </div>
                              </div>
                              <div className=" flex items-center relative">
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
                                                      <strong>Email:</strong>{" "}
                                                      {currentUser?.email}
                                                </div>

                                                <button
                                                      onClick={handleLogout}
                                                      className="mt-2 w-full text-center bg-red-500 hover:bg-red-600 text-white py-1 rounded"
                                                >
                                                      Logout
                                                </button>
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
            </nav>
      );
};

export default HeadCookNavbar;
