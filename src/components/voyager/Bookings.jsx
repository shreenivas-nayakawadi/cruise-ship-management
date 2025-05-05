import React, { useState, useEffect } from "react";
import { useVoyagerContext } from "../../context/VoyagerContext";
import VoyagerNavbar from "./VoyagerNavbar";
import {
      FiCalendar,
      FiActivity,
      FiSmile,
      FiMusic,
      FiFilm,
} from "react-icons/fi";

const Bookings = () => {
      const [allBookings, setAllBookings] = useState([]);
      const [loading, setLoading] = useState(true);
      const { getUserBookings } = useVoyagerContext();

      useEffect(() => {
            const loadBookings = async () => {
                  try {
                        setLoading(true);
                        const booking = await getUserBookings();
                        setAllBookings(booking.bookings);
                  } catch (error) {
                        console.error("Error loading orders:", error);
                  } finally {
                        setLoading(false);
                  }
            };

            loadBookings();
      }, []);

      const getBookingIcon = (type) => {
            switch (type.toLowerCase()) {
                  case "movie":
                        return <FiFilm className="text-purple-500" />;
                  case "entertainment":
                        return <FiMusic className="text-blue-500" />;
                  case "spa":
                        return <FiSmile className="text-pink-500" />;
                  case "activities":
                        return <FiActivity className="text-green-500" />;
                  default:
                        return <FiCalendar className="text-gray-500" />;
            }
      };

      const formatDate = (date) => {
            if (!date) return "Unknown";
            return new Date(date).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
            });
      };

      return (
            <>
                  <VoyagerNavbar />
                  <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                              <h2 className="text-xl font-semibold text-gray-800">
                                    Bookings History
                              </h2>
                        </div>
                        {loading ? (
                              <div className="text-center py-8">
                                    <div className="animate-pulse flex justify-center">
                                          <div className="h-8 w-8 bg-blue-200 rounded-full"></div>
                                    </div>
                                    <p className="mt-2 text-gray-500">
                                          Loading your bookings...
                                    </p>
                              </div>
                        ) : allBookings.length > 0 ? (
                              <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                          <thead className="bg-gray-50">
                                                <tr>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Booking
                                                      </th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Type
                                                      </th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Date & Time
                                                      </th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Event time
                                                      </th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Guests
                                                      </th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                      </th>
                                                </tr>
                                          </thead>
                                          <tbody className="bg-white divide-y divide-gray-200">
                                                {allBookings.map((booking) => (
                                                      <tr
                                                            key={booking.id}
                                                            className="hover:bg-gray-50"
                                                      >
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                  <div className="flex items-center">
                                                                        <div className="flex-shrink-0">
                                                                              {getBookingIcon(
                                                                                    booking.type
                                                                              )}
                                                                        </div>
                                                                        <div className="ml-4">
                                                                              <div className="text-sm font-medium text-gray-900">
                                                                                    {booking.name ||
                                                                                          "Booking"}
                                                                              </div>
                                                                              <div className="text-sm text-gray-500">
                                                                                    #
                                                                                    {booking.bookingId.substring(
                                                                                          0,
                                                                                          8
                                                                                    )}
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                  <div className="text-sm text-gray-900">
                                                                        {booking.type ||
                                                                              "N/A"}
                                                                  </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                  <div className="text-sm text-gray-900">
                                                                        {formatDate(
                                                                              booking.createdAt
                                                                        )}
                                                                  </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                  {booking.time ||
                                                                        "N/A"}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                  {booking.seats
                                                                        ? booking.type ==
                                                                          "movie"
                                                                              ? booking
                                                                                      .seats
                                                                                      .length
                                                                              : booking.seats
                                                                        : 1}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                  <div className="flex items-center">
                                                                        <span
                                                                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                          booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                    }`}
                                                                        >
                                                                              {
                                                                                    booking.status
                                                                              }
                                                                        </span>
                                                                  </div>
                                                            </td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        ) : (
                              <div className="p-6 text-center">
                                    <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                                          No bookings found
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                          Your booking history will appear here
                                          once you make a reservation.
                                    </p>
                              </div>
                        )}
                  </div>
            </>
      );
};

export default Bookings;
