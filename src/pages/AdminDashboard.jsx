import React from "react";
import { Link } from "react-router-dom";
import {
      FiCoffee,
      FiGift,
      FiFilm,
      FiSmile,
      FiActivity,
      FiMusic,
} from "react-icons/fi";
import AdminNavbar from "../components/admin/AdminNavbar";

const AdminDashboard = () => {
      const quickActions = [
            {
                  icon: <FiCoffee className="text-2xl" />,
                  label: "Food Management",
                  link: "/admin/food",
            },
            {
                  icon: <FiGift className="text-2xl" />,
                  label: "Gift Shop Admin",
                  link: "/admin/gifts",
            },
            {
                  icon: <FiFilm className="text-2xl" />,
                  label: "Movie Management",
                  link: "/admin/movies",
            },
            {
                  icon: <FiSmile className="text-2xl" />,
                  label: "Spa Services",
                  link: "/admin/spa",
            },
            {
                  icon: <FiActivity className="text-2xl" />,
                  label: "Activities Control",
                  link: "/admin/activities",
            },
            {
                  icon: <FiMusic className="text-2xl" />,
                  label: "Entertainment",
                  link: "/admin/entertainment",
            },
      ];

      return (
            <div className="min-h-screen bg-gray-50">
                  <AdminNavbar />
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                        <h1 className="text-3xl font-bold">
                              Admin Control Panel
                        </h1>
                        <p className="mt-2">
                              Manage cruise services, track operations, and
                              oversee onboard experiences.
                        </p>
                  </div>

                  <div className="container mx-auto px-4 py-6">
                        {/* Quick Actions */}
                        <div className="mb-8">
                              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                    Quick Actions
                              </h2>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                    {quickActions.map((action, index) => (
                                          <Link
                                                key={index}
                                                to={action.link}
                                                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center justify-center text-center"
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

export default AdminDashboard;
