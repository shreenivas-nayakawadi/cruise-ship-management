import React, { use } from "react";
import VoyagerNavbar from "../components/voyager/VoyagerNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
      FiClock,
      FiCalendar,
      FiShoppingBag,
      FiCoffee,
      FiGift,
      FiFilm,
      FiSmile,
      FiActivity,
      FiMusic,
} from "react-icons/fi";

const AdminDashboard = () => {
      const quickActions = [
            {
                  icon: <FiCoffee className="text-2xl" />,
                  label: "Foods",
                  link: "/admin/food",
            },
            {
                  icon: <FiGift className="text-2xl" />,
                  label: "Gifts",
                  link: "/admin/gift-shop",
            },
            {
                  icon: <FiFilm className="text-2xl" />,
                  label: "Movies",
                  link: "/admin/movies",
            },
            {
                  icon: <FiSmile className="text-2xl" />,
                  label: "Spa",
                  link: "/admin/spa",
            },
            {
                  icon: <FiActivity className="text-2xl" />,
                  label: "Activities",
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
                  <VoyagerNavbar />
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                        <h1 className="text-3xl font-bold">Welcome Aboard!</h1>
                        <p className="mt-2">
                              Your cruise dashboard for a perfect voyage
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
