import React, { useEffect, useState } from "react";
import { useManagerContext } from "../../context/ManagerContext";
import ManagerNavbar from "./ManagerNavbar";
import { FiFilm, FiCheckCircle, FiXCircle } from "react-icons/fi";

const ManagerMovies = () => {
      const { bookings, loading, fetchBookingsByType, updateBookingStatus } =
            useManagerContext();

      const [activeTab, setActiveTab] = useState("all");

      useEffect(() => {
            fetchBookingsByType("movies");
      }, []);

      const filteredBookings =
            activeTab === "all"
                  ? bookings.movies
                  : bookings.movies.filter(
                          (booking) => booking.status === activeTab
                    );

      const stats = {
            total: bookings.movies.length,
            confirmed: bookings.movies.filter((b) => b.status === "confirmed")
                  .length,
            completed: bookings.movies.filter((b) => b.status === "completed")
                  .length,
            cancelled: bookings.movies.filter((b) => b.status === "cancelled")
                  .length,
            revenue: bookings.movies
                  .filter(
                        (b) =>
                              b.status === "completed" ||
                              b.status === "confirmed"
                  )
                  .reduce((sum, booking) => sum + (booking.price || 0), 0),
      };

      const getStatusIcon = (status) => {
            switch (status) {
                  case "confirmed":
                        return <FiCheckCircle className="text-yellow-500" />;
                  case "completed":
                        return <FiCheckCircle className="text-green-500" />;
                  case "cancelled":
                        return <FiXCircle className="text-red-500" />;
                  default:
                        return <FiFilm className="text-gray-500" />;
            }
      };

      return (
            <div className="min-h-screen bg-gray-50">
                  <ManagerNavbar />

                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                        <h1 className="text-3xl font-bold">
                              Movie Bookings Dashboard
                        </h1>
                        <p className="mt-2">
                              Manage all movie theater bookings
                        </p>
                  </div>

                  <div className="container mx-auto px-4 py-6">
                        {/* Status Tabs */}
                        <div className="mb-6 flex space-x-2 overflow-x-auto pb-2">
                              {[
                                    "all",
                                    "confirmed",
                                    "completed",
                                    "cancelled",
                              ].map((tab) => (
                                    <button
                                          key={tab}
                                          onClick={() => setActiveTab(tab)}
                                          className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${
                                                activeTab === tab
                                                      ? "bg-blue-600 text-white"
                                                      : "bg-white text-gray-700 hover:bg-gray-100"
                                          }`}
                                    >
                                          {tab}
                                    </button>
                              ))}
                        </div>

                        {/* Stats Overview */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                              <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500">
                                          Total Bookings
                                    </h3>
                                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                                          {stats.total}
                                    </p>
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500">
                                          Confirmed
                                    </h3>
                                    <p className="mt-1 text-2xl font-semibold text-yellow-600">
                                          {stats.confirmed}
                                    </p>
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500">
                                          Completed
                                    </h3>
                                    <p className="mt-1 text-2xl font-semibold text-green-600">
                                          {stats.completed}
                                    </p>
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500">
                                          Cancelled
                                    </h3>
                                    <p className="mt-1 text-2xl font-semibold text-red-600">
                                          {stats.cancelled}
                                    </p>
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500">
                                          Revenue
                                    </h3>
                                    <p className="mt-1 text-2xl font-semibold text-blue-600">
                                          ₹{stats.revenue.toFixed(2)}
                                    </p>
                              </div>
                        </div>
                        {/* Bookings Table */}
                        <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
                              {loading ? (
                                    <div className="p-8 text-center">
                                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                                          <p className="mt-4 text-gray-600">
                                                Loading bookings...
                                          </p>
                                    </div>
                              ) : filteredBookings.length === 0 ? (
                                    <div className="p-8 text-center">
                                          <FiFilm className="mx-auto h-12 w-12 text-gray-400" />
                                          <h3 className="mt-2 text-sm font-medium text-gray-900">
                                                No{" "}
                                                {activeTab === "all"
                                                      ? ""
                                                      : activeTab}{" "}
                                                bookings found
                                          </h3>
                                    </div>
                              ) : (
                                    <div className="overflow-x-auto">
                                          <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                      <tr>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Movie
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Showtime
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Seats
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Status
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Actions
                                                            </th>
                                                      </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                      {filteredBookings.map(
                                                            (booking) => (
                                                                  <tr
                                                                        key={
                                                                              booking.id
                                                                        }
                                                                        className="hover:bg-gray-50"
                                                                  >
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <div className="text-sm font-medium text-gray-900">
                                                                                    {
                                                                                          booking.movieTitle
                                                                                    }
                                                                              </div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              {
                                                                                    booking.showtime
                                                                              }
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              {booking.seats.join(
                                                                                    ", "
                                                                              )}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <div className="flex items-center">
                                                                                    {getStatusIcon(
                                                                                          booking.status
                                                                                    )}
                                                                                    <span
                                                                                          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                                                booking.status ===
                                                                                                "confirmed"
                                                                                                      ? "bg-yellow-100 text-yellow-800"
                                                                                                      : booking.status ===
                                                                                                        "completed"
                                                                                                      ? "bg-green-100 text-green-800"
                                                                                                      : "bg-red-100 text-red-800"
                                                                                          }`}
                                                                                    >
                                                                                          {
                                                                                                booking.status
                                                                                          }
                                                                                    </span>
                                                                              </div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                              {booking.status ===
                                                                                    "confirmed" && (
                                                                                    <>
                                                                                          <button
                                                                                                onClick={() =>
                                                                                                      updateBookingStatus(
                                                                                                            "movies",
                                                                                                            booking.id,
                                                                                                            "completed"
                                                                                                      )
                                                                                                }
                                                                                                className="text-green-600 hover:text-green-900 mr-3"
                                                                                          >
                                                                                                Complete
                                                                                          </button>
                                                                                          <button
                                                                                                onClick={() =>
                                                                                                      updateBookingStatus(
                                                                                                            "movies",
                                                                                                            booking.id,
                                                                                                            "cancelled"
                                                                                                      )
                                                                                                }
                                                                                                className="text-red-600 hover:text-red-900"
                                                                                          >
                                                                                                Cancel
                                                                                          </button>
                                                                                    </>
                                                                              )}
                                                                        </td>
                                                                  </tr>
                                                            )
                                                      )}
                                                </tbody>
                                          </table>
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default ManagerMovies;
