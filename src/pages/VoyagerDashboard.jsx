import React, { useEffect, useState } from "react";
import VoyagerNavbar from "../components/voyager/VoyagerNavbar";
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
      FiPackage,
      FiCheckCircle,
      FiTruck,
} from "react-icons/fi";
import { useVoyagerContext } from "../context/VoyagerContext";

const VoyagerDashboard = () => {
      const [upcomingActivities, setUpcomingActivities] = useState([]);
      const [recentOrders, setRecentOrders] = useState([]);
      const [recentBookings, setRecentBookings] = useState([]);
      const [loading, setLoading] = useState(true);
      const { getUserOrders, getUserBookings, fetchActivities, activities } =
            useVoyagerContext();

      const [weather] = useState({
            temperature: 28,
            condition: "Sunny",
            wind: "12 km/h",
            seaStatus: "Calm",
      });

      const getStatusIcon = (status) => {
            switch (status.toLowerCase()) {
                  case "preparing":
                        return <FiClock className="text-yellow-500" />;
                  case "processing":
                        return <FiPackage className="text-blue-500" />;
                  case "shipped":
                        return <FiTruck className="text-blue-500" />;
                  case "ready":
                        return <FiCheckCircle className="text-green-500" />;
                  case "delivered":
                        return <FiTruck className="text-blue-500" />;
                  default:
                        return <FiPackage className="text-gray-500" />;
            }
      };

      const getTypeIcon = (type) => {
            switch (type.toLowerCase()) {
                  case "food":
                        return <FiShoppingBag className="text-red-500" />;
                  case "gift":
                        return <FiPackage className="text-blue-500" />;
                  default:
                        return <FiPackage className="text-gray-500" />;
            }
      };

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
                  hour: "2-digit",
                  minute: "2-digit",
            });
      };

      useEffect(() => {
            const loadDashboardData = async () => {
                  try {
                        setLoading(true);

                        // Load actual orders and bookings via context
                        const ordersResponse = await getUserOrders();
                        const bookingsResponse = await getUserBookings();

                        // Access the orders array from the response
                        const orders = ordersResponse?.orders || [];
                        const bookings = bookingsResponse?.bookings || [];
                        console.log(bookings);

                        const sortedOrders = orders
                              .sort(
                                    (a, b) =>
                                          new Date(b.createdAt) -
                                          new Date(a.createdAt)
                              )
                              .slice(0, 3);
                        const sortedBookings = bookings
                              .sort(
                                    (a, b) =>
                                          new Date(b.createdAt) -
                                          new Date(a.createdAt)
                              )
                              .slice(0, 3);

                        setRecentBookings(sortedBookings);
                        setRecentOrders(sortedOrders);
                  } catch (error) {
                        console.error("Error loading dashboard data:", error);
                  } finally {
                        setLoading(false);
                  }
            };

            loadDashboardData();
      }, []);

      // const transformActivities = (activities) => {
      //       const simplified = activities.map((activity, index) => ({
      //             id: index + 1,
      //             name: activity.name,
      //             time: activity.time.split(" - ")[0],
      //             location: activity.location,
      //             date: activity.date,
      //       }));
      //       setUpcomingActivities(simplified);
      // };

      const transformActivities = (activities) => {
            const simplified = activities
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
              .slice(0, 3) // only 3
              .map((activity, index) => ({
                id: index + 1, // or activity.id if you want Firestore ID
                name: activity.name,
                time: activity.time?.split(" - ")[0] || "Unknown",
                location: activity.location,
                date: activity.date,
              }));
          
            setUpcomingActivities(simplified);
          };
          

      useEffect(() => {
            fetchActivities(); // triggers context to fetch data and update `activities`
      }, []);

      useEffect(() => {
            if (activities && activities.length > 0) {
                  transformActivities(activities); // only when activities are available
            }
      }, [activities]);

      const quickActions = [
            {
                  icon: <FiCoffee className="text-2xl" />,
                  label: "Order Food",
                  link: "/voyager/order-food",
            },
            {
                  icon: <FiGift className="text-2xl" />,
                  label: "Buy Gifts",
                  link: "/voyager/gift-shop",
            },
            {
                  icon: <FiFilm className="text-2xl" />,
                  label: "Book Movie",
                  link: "/voyager/movies",
            },
            {
                  icon: <FiSmile className="text-2xl" />,
                  label: "Spa Booking",
                  link: "/voyager/spa",
            },
            {
                  icon: <FiActivity className="text-2xl" />,
                  label: "Activities",
                  link: "/voyager/activities",
            },
            {
                  icon: <FiMusic className="text-2xl" />,
                  label: "Entertainment",
                  link: "/voyager/entertainment",
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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              {/* Upcoming Activities */}
                              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                                    <div className="flex justify-between items-center mb-4">
                                          <h2 className="text-xl font-semibold text-gray-800">
                                                Upcoming Activities
                                          </h2>
                                          <Link
                                                to="/voyager/upcomingActivites"
                                                className="text-blue-600 text-sm hover:underline"
                                          >
                                                View All
                                          </Link>
                                    </div>
                                    <div className="space-y-4">
                                          {upcomingActivities.map(
                                                (activity) => (
                                                      <div
                                                            key={activity.id}
                                                            className="border-l-4 border-blue-500 pl-4 py-2"
                                                      >
                                                            <div className="flex justify-between">
                                                                  <h3 className="font-medium text-gray-800">
                                                                        {
                                                                              activity.name
                                                                        }
                                                                  </h3>
                                                                  <span className="text-sm text-gray-500">
                                                                        {
                                                                              activity.date
                                                                        }
                                                                  </span>
                                                            </div>
                                                            <div className="flex items-center mt-1 text-sm text-gray-600">
                                                                  <FiClock className="mr-1" />
                                                                  <span>
                                                                        {
                                                                              activity.time
                                                                        }
                                                                  </span>
                                                                  <span className="mx-2">
                                                                        •
                                                                  </span>
                                                                  <span>
                                                                        {
                                                                              activity.location
                                                                        }
                                                                  </span>
                                                            </div>
                                                      </div>
                                                )
                                          )}
                                    </div>
                                    {upcomingActivities.length === 0 && (
                                          <div className="p-6 text-center">
                                                <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
                                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                                      No upcoming activities
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                      Your activity schedule
                                                      will appear here once you
                                                      book an activity.
                                                </p>
                                          </div>
                                    )}
                              </div>

                              {/* Weather and Ship Status */}
                              <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                          Weather & Ship Status
                                    </h2>
                                    <div className="space-y-4">
                                          <div className="flex items-center">
                                                <div className="text-5xl font-light mr-4">
                                                      {weather.temperature}°
                                                </div>
                                                <div>
                                                      <div className="font-medium">
                                                            {weather.condition}
                                                      </div>
                                                      <div className="text-sm text-gray-600">
                                                            Perfect cruise
                                                            weather
                                                      </div>
                                                </div>
                                          </div>
                                          <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-blue-50 p-3 rounded-lg">
                                                      <div className="text-sm text-gray-500">
                                                            Wind
                                                      </div>
                                                      <div className="font-medium">
                                                            {weather.wind}
                                                      </div>
                                                </div>
                                                <div className="bg-blue-50 p-3 rounded-lg">
                                                      <div className="text-sm text-gray-500">
                                                            Sea Status
                                                      </div>
                                                      <div className="font-medium">
                                                            {weather.seaStatus}
                                                      </div>
                                                </div>
                                          </div>
                                          <div className="pt-4 border-t border-gray-200">
                                                <h3 className="font-medium mb-2">
                                                      Current Location
                                                </h3>
                                                <div className="text-sm text-gray-600">
                                                      Caribbean Sea
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                      Heading to: Nassau,
                                                      Bahamas
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        {/* Recent Orders */}
                        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                              <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                          Recent Orders
                                    </h2>
                                    <Link
                                          to="/voyager/orders"
                                          className="text-blue-600 text-sm hover:underline"
                                    >
                                          View All
                                    </Link>
                              </div>
                              {loading ? (
                                    <div className="text-center py-8">
                                          <div className="animate-pulse flex justify-center">
                                                <div className="h-8 w-8 bg-blue-200 rounded-full"></div>
                                          </div>
                                          <p className="mt-2 text-gray-500">
                                                Loading your orders...
                                          </p>
                                    </div>
                              ) : recentOrders.length > 0 ? (
                                    <div className="overflow-x-auto">
                                          <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                      <tr>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Order
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Items
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Total
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Delivery To
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Status
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Date
                                                            </th>
                                                      </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                      {recentOrders.map(
                                                            (order) => (
                                                                  <tr
                                                                        key={
                                                                              order.id
                                                                        }
                                                                        className="hover:bg-gray-50"
                                                                  >
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <div className="flex items-center">
                                                                                    <div className="flex-shrink-0">
                                                                                          {getTypeIcon(
                                                                                                order.type
                                                                                          )}
                                                                                    </div>
                                                                                    <div className="ml-4">
                                                                                          <div className="text-sm font-medium text-gray-900">
                                                                                                {
                                                                                                      order.type
                                                                                                }{" "}
                                                                                                Order
                                                                                          </div>
                                                                                          <div className="text-sm text-gray-500">
                                                                                                #
                                                                                                {order.orderId.substring(
                                                                                                      0,
                                                                                                      8
                                                                                                )}
                                                                                          </div>
                                                                                    </div>
                                                                              </div>
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                              <div className="text-sm text-gray-900 max-w-xs truncate">
                                                                                    {order.items
                                                                                          .map(
                                                                                                (
                                                                                                      item
                                                                                                ) =>
                                                                                                      item.name
                                                                                          )
                                                                                          .join(
                                                                                                ", "
                                                                                          )}
                                                                              </div>
                                                                              <div className="text-xs text-gray-500">
                                                                                    {
                                                                                          order
                                                                                                .items
                                                                                                .length
                                                                                    }{" "}
                                                                                    {order
                                                                                          .items
                                                                                          .length ===
                                                                                    1
                                                                                          ? "item"
                                                                                          : "items"}
                                                                              </div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              ₹
                                                                              {order.totalPrice?.toFixed(
                                                                                    2
                                                                              ) ||
                                                                                    "0.00"}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              {order.deliveryLocation ||
                                                                                    "N/A"}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <div className="flex items-center">
                                                                                    {getStatusIcon(
                                                                                          order.status
                                                                                    )}
                                                                                    <span
                                                                                          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
              ${
                    order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "preparing" ||
                            order.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
              }`}
                                                                                    >
                                                                                          {
                                                                                                order.status
                                                                                          }
                                                                                    </span>
                                                                              </div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              {formatDate(
                                                                                    order.createdAt
                                                                              )}
                                                                        </td>
                                                                  </tr>
                                                            )
                                                      )}
                                                </tbody>
                                          </table>
                                    </div>
                              ) : (
                                    <div className="p-6 text-center">
                                          <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                                          <h3 className="mt-2 text-sm font-medium text-gray-900">
                                                No orders found
                                          </h3>
                                          <p className="mt-1 text-sm text-gray-500">
                                                Your order history will appear
                                                here once you make a purchase.
                                          </p>
                                    </div>
                              )}
                        </div>
                        {/*Recent Bookings*/}

                        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                              <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                          Upcoming Bookings
                                    </h2>
                                    <Link
                                          to="/voyager/bookings"
                                          className="text-blue-600 text-sm hover:underline"
                                    >
                                          View All
                                    </Link>
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
                              ) : recentBookings.length > 0 ? (
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
                                                      {recentBookings.map(
                                                            (booking) => (
                                                                  <tr
                                                                        key={
                                                                              booking.id
                                                                        }
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
                                                            )
                                                      )}
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
                                                Your booking history will appear
                                                here once you make a
                                                reservation.
                                          </p>
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default VoyagerDashboard;
