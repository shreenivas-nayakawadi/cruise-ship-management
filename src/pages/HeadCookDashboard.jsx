import React, { useEffect, useState } from "react";
import { useHeadCookContext } from "../context/HeadCookContext";
import HeadCookNavbar from "../components/headCook/HeadCookNavbar";
import {
      FiClock,
      FiCheckCircle,
      FiTruck,
      FiCoffee,
      FiAlertCircle,
} from "react-icons/fi";

const HeadCookDashboard = () => {
      const {
            foodOrders,
            loading,
            fetchFoodOrders,
            updateOrderStatus,
            setupFoodOrdersListener,
      } = useHeadCookContext();
      const [activeTab, setActiveTab] = useState("preparing");

      useEffect(() => {
            const unsubscribe = setupFoodOrdersListener();
            return () => unsubscribe();
      }, []);

      const filteredOrders = foodOrders.filter((order) =>
            activeTab === "all" ? true : order.status === activeTab
      );

      const getStatusIcon = (status) => {
            switch (status) {
                  case "preparing":
                        return <FiClock className="text-yellow-500" />;
                  case "ready":
                        return <FiCheckCircle className="text-green-500" />;
                  case "delivered":
                        return <FiTruck className="text-blue-500" />;
                  default:
                        return <FiCoffee className="text-gray-500" />;
            }
      };

      const handleStatusUpdate = async (orderId, newStatus) => {
            const { success } = await updateOrderStatus(orderId, newStatus);
            if (success) {
                  // Status updated successfully
            }
      };

      const formatTime = (timestamp) => {
            if (!timestamp) return "N/A";
            const date = timestamp.toDate
                  ? timestamp.toDate()
                  : new Date(timestamp);
            return date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
            });
      };

      return (
            <div className="min-h-screen bg-gray-50">
                  <HeadCookNavbar />

                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                        <h1 className="text-3xl font-bold">
                              Head Cook Dashboard
                        </h1>
                        <p className="mt-2">
                              Manage and track all food orders in real-time
                        </p>
                  </div>

                  <div className="container mx-auto px-4 py-6">
                        {/* Status Tabs */}
                        <div className="mb-6 flex space-x-2 overflow-x-auto pb-2">
                              {["all", "preparing", "ready", "delivered"].map(
                                    (tab) => (
                                          <button
                                                key={tab}
                                                onClick={() =>
                                                      setActiveTab(tab)
                                                }
                                                className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${
                                                      activeTab === tab
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                                }`}
                                          >
                                                {tab}
                                          </button>
                                    )
                              )}
                        </div>

                        {/* Orders Table */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                              {loading ? (
                                    <div className="p-8 text-center">
                                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                                          <p className="mt-4 text-gray-600">
                                                Loading orders...
                                          </p>
                                    </div>
                              ) : filteredOrders.length === 0 ? (
                                    <div className="p-8 text-center">
                                          <FiCoffee className="mx-auto h-12 w-12 text-gray-400" />
                                          <h3 className="mt-2 text-sm font-medium text-gray-900">
                                                No{" "}
                                                {activeTab === "all"
                                                      ? ""
                                                      : activeTab}{" "}
                                                orders found
                                          </h3>
                                          <p className="mt-1 text-sm text-gray-500">
                                                {activeTab === "all"
                                                      ? "There are currently no food orders."
                                                      : `There are currently no ${activeTab} orders.`}
                                          </p>
                                    </div>
                              ) : (
                                    <div className="overflow-x-auto">
                                          <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                      <tr>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Order ID
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Items
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Cabin
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Time
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
                                                      {filteredOrders.map(
                                                            (order) => (
                                                                  <tr
                                                                        key={
                                                                              order.id
                                                                        }
                                                                        className="hover:bg-gray-50"
                                                                  >
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <div className="text-sm font-medium text-gray-900">
                                                                                    #
                                                                                    {order.orderId.substring(
                                                                                          0,
                                                                                          8
                                                                                    )}
                                                                              </div>
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                              <div className="text-sm text-gray-900 max-w-xs">
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
                                                                                    items
                                                                              </div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              {
                                                                                    order.deliveryLocation
                                                                              }
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              {formatTime(
                                                                                    order.createdAt
                                                                              )}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <div className="flex items-center">
                                                                                    {getStatusIcon(
                                                                                          order.status
                                                                                    )}
                                                                                    <span
                                                                                          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                                                order.status ===
                                                                                                "preparing"
                                                                                                      ? "bg-yellow-100 text-yellow-800"
                                                                                                      : order.status ===
                                                                                                        "ready"
                                                                                                      ? "bg-green-100 text-green-800"
                                                                                                      : order.status ===
                                                                                                        "delivered"
                                                                                                      ? "bg-blue-100 text-blue-800"
                                                                                                      : "bg-gray-100 text-gray-800"
                                                                                          }`}
                                                                                    >
                                                                                          {
                                                                                                order.status
                                                                                          }
                                                                                    </span>
                                                                              </div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                              {order.status ===
                                                                                    "preparing" && (
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                handleStatusUpdate(
                                                                                                      order.id,
                                                                                                      "ready"
                                                                                                )
                                                                                          }
                                                                                          className="text-blue-600 hover:text-indigo-900 mr-3"
                                                                                    >
                                                                                          Mark
                                                                                          as
                                                                                          Ready
                                                                                    </button>
                                                                              )}
                                                                              {order.status ===
                                                                                    "ready" && (
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                handleStatusUpdate(
                                                                                                      order.id,
                                                                                                      "delivered"
                                                                                                )
                                                                                          }
                                                                                          className="text-green-600 hover:text-green-900"
                                                                                    >
                                                                                          Mark
                                                                                          as
                                                                                          Delivered
                                                                                    </button>
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

                        {/* Stats Overview */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                              <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500">
                                          Total Orders
                                    </h3>
                                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                                          {foodOrders.length}
                                    </p>
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500">
                                          Preparing
                                    </h3>
                                    <p className="mt-1 text-2xl font-semibold text-yellow-600">
                                          {
                                                foodOrders.filter(
                                                      (o) =>
                                                            o.status ===
                                                            "preparing"
                                                ).length
                                          }
                                    </p>
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500">
                                          Ready
                                    </h3>
                                    <p className="mt-1 text-2xl font-semibold text-green-600">
                                          {
                                                foodOrders.filter(
                                                      (o) =>
                                                            o.status === "ready"
                                                ).length
                                          }
                                    </p>
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500">
                                          Delivered
                                    </h3>
                                    <p className="mt-1 text-2xl font-semibold text-blue-600">
                                          {
                                                foodOrders.filter(
                                                      (o) =>
                                                            o.status ===
                                                            "delivered"
                                                ).length
                                          }
                                    </p>
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500">
                                          Total Earned
                                    </h3>
                                    <p className="mt-1 text-2xl font-semibold text-purple-600">
                                          ₹
                                          {foodOrders
                                                .filter(
                                                      (o) =>
                                                            o.status ===
                                                                  "ready" ||
                                                            o.status ===
                                                                  "delivered"
                                                )
                                                .reduce(
                                                      (sum, order) =>
                                                            sum +
                                                            (order.price || 0),
                                                      0
                                                )
                                                .toFixed(2)}
                                    </p>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default HeadCookDashboard;
