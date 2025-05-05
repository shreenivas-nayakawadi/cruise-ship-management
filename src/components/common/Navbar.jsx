import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
      return (
            <nav className="bg-white shadow-lg ">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                              <div className="flex">
                                    <div className="flex items-center justify-between">
                                          <Link
                                                to="/"
                                                className="flex-shrink-0 flex items-center"
                                          >
                                                <img
                                                      className="h-8 w-auto"
                                                      src="/logo.png"
                                                />
                                                <span className="ml-2 text-xl font-bold text-blue-600 hidden md:block">
                                                      Cruise Ship Management
                                                </span>
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </div>
            </nav>
      );
};

export default Navbar;
