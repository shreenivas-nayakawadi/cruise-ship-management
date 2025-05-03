import React, { useState, useEffect } from "react";
import { useVoyagerContext } from "../../context/VoyagerContext";
import VoyagerNavbar from "./VoyagerNavbar";
import {
      FiPackage,
      FiClock,
      FiCheckCircle,
      FiTruck,
      FiShoppingBag,
} from "react-icons/fi";

const Orders = () => {
      const [allOrders, setAllOrders] = useState([]);
      const [loading, setLoading] = useState(true);
      const { getUserOrders } = useVoyagerContext();

      useEffect(() => {
            const loadOrders = async () => {
                  try {
                        setLoading(true);
                        const orders = await getUserOrders();
                        setAllOrders(orders);
                  } catch (error) {
                        console.error("Error loading orders:", error);
                  } finally {
                        setLoading(false);
                  }
            };

            loadOrders();
      }, []);

      const getStatusIcon = (status) => {
            switch (status.toLowerCase()) {
                  case "delivered":
                        return <FiCheckCircle className="text-green-500" />;
                  case "processing":
                        return <FiClock className="text-yellow-500" />;
                  case "shipped":
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
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                          <FiPackage className="mr-2" /> Order
                                          History
                                    </h2>
                                    <div className="text-sm text-gray-500">
                                          {allOrders.length}{" "}
                                          {allOrders.length === 1
                                                ? "order"
                                                : "orders"}{" "}
                                          found
                                    </div>
                              </div>

                              {loading ? (
                                    <div className="p-6 text-center">
                                          <div className="animate-pulse flex justify-center">
                                                <div className="h-8 w-8 bg-blue-200 rounded-full"></div>
                                          </div>
                                          <p className="mt-2 text-gray-500">
                                                Loading your orders...
                                          </p>
                                    </div>
                              ) : allOrders.length > 0 ? (
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
                                                                  Status
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                  Date
                                                            </th>
                                                      </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                      {allOrders.map(
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
                                                                                                {order.id.substring(
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
                                                                              $
                                                                              {order.total.toFixed(
                                                                                    2
                                                                              )}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <div className="flex items-center">
                                                                                    {getStatusIcon(
                                                                                          order.status
                                                                                    )}
                                                                                    <span
                                                                                          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                                  order.status === "Delivered"
                                        ? "bg-green-100 text-green-800"
                                        : order.status === "Processing"
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
                  </div>
            </>
      );
};

export default Orders;
