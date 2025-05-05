import React from "react";
import { Link } from "react-router-dom";
import { FiFilm, FiSmile, FiActivity, FiMusic } from "react-icons/fi";
import ManagerNavbar from "../components/manager/ManagerNavbar";

const ManagerDashboard = () => {
      const quickActions = [
            {
                  icon: <FiFilm className="text-2xl" />,
                  label: "Movie Bookings",
                  link: "/manager/movie",
            },
            {
                  icon: <FiSmile className="text-2xl" />,
                  label: "Spa Bookings",
                  link: "/manager/spa",
            },
            {
                  icon: <FiActivity className="text-2xl" />,
                  label: "Activities Bookings",
                  link: "/manager/activities",
            },
            {
                  icon: <FiMusic className="text-2xl" />,
                  label: "Entertainment Bookings",
                  link: "/manager/entertainment",
            },
      ];

      return (
            <div className="min-h-screen bg-gray-50">
                  <ManagerNavbar />
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                        <h1 className="text-3xl font-bold">
                              Manager Control Panel
                        </h1>
                        <p className="mt-2">
                              Manage cruise services, monitor booking
                              operations, and oversee onboard experiences
                              including movies, spa, events, and activities to
                              ensure smooth execution and customer satisfaction.
                        </p>
                  </div>

                  <div className="container mx-auto px-4 py-6">
                        {/* Quick Actions */}
                        <div className="mb-8">
                              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                    Quick Actions
                              </h2>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {quickActions.map((action, index) => (
                                          <Link
                                                key={index}
                                                to={action.link}
                                                className="bg-white p-4 rounded-lg  shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center justify-center text-center"
                                          >
                                                <div className="text-blue-600 mb-2">
                                                      {action.icon}
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">
                                                      {action.label}
                                                </span>
                                          </Link>
                                    ))}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default ManagerDashboard;
