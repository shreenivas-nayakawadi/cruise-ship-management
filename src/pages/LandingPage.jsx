import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
      const { currentUser } = useAuth();
      return (
            <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll overflow-x-hidden">
                  {/* Hero Section - Full Screen */}
                  <section className="snap-start h-screen w-screen bg-blue-600 text-white flex items-center justify-center">
                        <div className="text-center px-4 max-w-4xl">
                              {/* Logo Container */}
                              <div className="flex justify-center mb-6">
                                    <div className="bg-white p-2 rounded-full w-32 h-32 flex items-center justify-center shadow-lg">
                                          {/* Replace with your actual logo path */}
                                          <img
                                                src="/logo.png"
                                                alt="Ocean Vista Cruises Logo"
                                                className="h-24 w-24 object-cover"
                                          />
                                    </div>
                              </div>

                              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                                    Cruise Ship Management
                              </h1>

                              <p className="text-xl md:text-2xl mb-8">
                                    Premium cruise ship management at your
                                    fingertips
                              </p>

                              <Link
                                    to={
                                          currentUser
                                                ? `/${currentUser.role}/dashboard`
                                                : "/login"
                                    }
                                    className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg"
                              >
                                    Get Started
                              </Link>
                        </div>
                  </section>

                  {/* Features Section - Full Screen */}
                  <section className="snap-start h-screen w-screen bg-white flex items-center justify-center">
                        <div className="container mx-auto px-4">
                              <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
                                    Our Management Features
                              </h2>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {[
                                          {
                                                icon: "🍽️",
                                                title: "Food & Beverage",
                                                desc: "Manage menus, orders, and kitchen operations efficiently",
                                          },
                                          {
                                                icon: "🎬",
                                                title: "Entertainment",
                                                desc: "Schedule and manage movies, shows, and onboard events",
                                          },
                                          {
                                                icon: "💆",
                                                title: "Spa Services",
                                                desc: "Handle spa bookings, services, and staff coordination",
                                          },
                                          {
                                                icon: "🏊",
                                                title: "Activities",
                                                desc: "Organize and track participation in onboard activities",
                                          },
                                          {
                                                icon: "🛍️",
                                                title: "Gift Shop",
                                                desc: "Manage inventory and sales of gift shop products",
                                          },
                                          {
                                                icon: "📊",
                                                title: "Reporting",
                                                desc: "Generate comprehensive reports on all operations",
                                          },
                                    ].map((feature, index) => (
                                          <div
                                                key={index}
                                                className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                                          >
                                                <div className="text-blue-600 text-4xl mb-4">
                                                      {feature.icon}
                                                </div>
                                                <h3 className="text-xl font-bold text-blue-600 mb-2">
                                                      {feature.title}
                                                </h3>
                                                <p className="text-gray-700">
                                                      {feature.desc}
                                                </p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Stats Section - Full Screen */}
                  <section className="snap-start h-screen w-screen bg-blue-600 text-white flex items-center justify-center">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-3xl font-bold mb-12">
                                    Why Choose Our System?
                              </h2>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[
                                          {
                                                number: "100%",
                                                label: "Operational Efficiency",
                                          },
                                          {
                                                number: "24/7",
                                                label: "Real-time Updates",
                                          },
                                          {
                                                number: "99.9%",
                                                label: "Uptime Reliability",
                                          },
                                    ].map((stat, index) => (
                                          <div key={index} className="p-6">
                                                <div className="text-5xl font-bold mb-2">
                                                      {stat.number}
                                                </div>
                                                <div className="text-xl">
                                                      {stat.label}
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA Section - Full Screen */}
                  <section className="snap-start h-screen w-screen bg-white flex items-center justify-center">
                        <div className="text-center px-4 max-w-2xl">
                              <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                                    Ready to Transform Your Cruise Operations?
                              </h2>
                              <p className="text-xl mb-8">
                                    Join hundreds of cruise operators who trust
                                    our management system
                              </p>
                              <Link
                                    to={
                                          currentUser
                                                ? `/${currentUser.role}/dashboard`
                                                : "/login"
                                    }
                                    className="inline-block bg-blue-600 text-white hover:bg-blue-700 font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
                              >
                                    Get Started
                              </Link>
                        </div>
                  </section>

                  {/* Footer - Not Full Screen */}
                  <footer className="bg-blue-600 text-white py-12">
                        <div className="container mx-auto px-4">
                              <div className="flex flex-col md:flex-row justify-between items-center">
                                    <div className="text-xl font-bold mb-4 md:mb-0">
                                          Ocean Vista Cruises
                                    </div>
                                    <div className="flex space-x-6">
                                          <Link
                                                to="/privacy"
                                                className="hover:text-blue-200 transition duration-300"
                                          >
                                                Privacy
                                          </Link>
                                          <Link
                                                to="/terms"
                                                className="hover:text-blue-200 transition duration-300"
                                          >
                                                Terms
                                          </Link>
                                          <Link
                                                to="/contact"
                                                className="hover:text-blue-200 transition duration-300"
                                          >
                                                Contact
                                          </Link>
                                    </div>
                              </div>
                              <div className="mt-6 text-center text-sm">
                                    &copy; {new Date().getFullYear()} Ocean
                                    Vista Cruises. All rights reserved.
                              </div>
                        </div>
                  </footer>
            </div>
      );
};

export default LandingPage;
