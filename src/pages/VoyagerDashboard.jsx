import React from "react";
import VoyagerNavbar from "../components/auth/voyager/VoyagerNavbar";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiCalendar, FiShoppingBag, FiCoffee, FiGift, FiFilm, FiSmile, FiActivity, FiMusic } from 'react-icons/fi';

const VoyagerDashboard = () =>  {
  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [weather, setWeather] = useState(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setUpcomingActivities([
        { id: 1, name: 'Sunset Cocktail Party', time: '18:00', location: 'Deck 9 Poolside', date: 'Today' },
        { id: 2, name: 'Broadway Show', time: '20:30', location: 'Grand Theater', date: 'Tomorrow' },
        { id: 3, name: 'Island Excursion', time: '09:00', location: 'Portside', date: 'Day 3' }
      ]);

      setRecentOrders([
        { id: 1, type: 'Food', items: ['Seafood Platter', 'Champagne'], status: 'Delivered', time: '2 hours ago' },
        { id: 2, type: 'Gift', items: ['Souvenir T-shirt'], status: 'Processing', time: 'Yesterday' }
      ]);

      setWeather({
        temperature: 28,
        condition: 'Sunny',
        wind: '12 km/h',
        seaStatus: 'Calm'
      });
    }, 500);
  }, []);

  const quickActions = [
    { icon: <FiCoffee className="text-2xl" />, label: 'Order Food', link: '/voyager/order-food' },
    { icon: <FiGift className="text-2xl" />, label: 'Buy Gifts', link: '/voyager/gift-shop' },
    { icon: <FiFilm className="text-2xl" />, label: 'Book Movie', link: '/voyager/movies' },
    { icon: <FiSmile className="text-2xl" />, label: 'Spa Booking', link: '/voyager/spa' },
    { icon: <FiActivity className="text-2xl" />, label: 'Activities', link: '/voyager/activities' },
    { icon: <FiMusic className="text-2xl" />, label: 'Entertainment', link: '/voyager/entertainment' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <VoyagerNavbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
        <h1 className="text-3xl font-bold">Welcome Aboard!</h1>
        <p className="mt-2">Your cruise dashboard for a perfect voyage</p>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center justify-center text-center"
              >
                <div className="text-blue-600 mb-2">{action.icon}</div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Activities */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Activities</h2>
              <Link to="/voyager/activities" className="text-blue-600 text-sm hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingActivities.length > 0 ? (
                upcomingActivities.map((activity) => (
                  <div key={activity.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-800">{activity.name}</h3>
                      <span className="text-sm text-gray-500">{activity.date}</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <FiClock className="mr-1" />
                      <span>{activity.time}</span>
                      <span className="mx-2">•</span>
                      <span>{activity.location}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Loading activities...</p>
              )}
            </div>
          </div>

          {/* Weather and Ship Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Weather & Ship Status</h2>
            {weather ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="text-5xl font-light mr-4">28°</div>
                  <div>
                    <div className="font-medium">Sunny</div>
                    <div className="text-sm text-gray-600">Perfect cruise weather</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Wind</div>
                    <div className="font-medium">{weather.wind}</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Sea Status</div>
                    <div className="font-medium">{weather.seaStatus}</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-2">Current Location</h3>
                  <div className="text-sm text-gray-600">Caribbean Sea</div>
                  <div className="text-sm text-gray-600">Heading to: Nassau, Bahamas</div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Loading weather data...</p>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
            <Link to="/voyager/orders" className="text-blue-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.items.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.time}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      Loading order history...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoyagerDashboard;