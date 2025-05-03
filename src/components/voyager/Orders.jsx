import React, { useState, useEffect } from "react";
import { useVoyagerContext } from "../../context/VoyagerContext";
import VoyagerNavbar from "./VoyagerNavbar";

const Orders = () => {
      const [allOrders, setAllOrders] = useState([]);
      const { getUserOrders } = useVoyagerContext();

      useEffect(() => {
            const loadDashboardData = async () => {
                  // Simulate loading delay (optional)
                  setTimeout(async () => {
                        try {
                              const orders = await getUserOrders();

                              setAllOrders(orders);
                        } catch (error) {
                              console.error("Error loading orders:", error);
                        }
                  }, 500);
            };

            loadDashboardData();
      }, []);

      return (
            <>
                  <VoyagerNavbar />
                  <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                              <h2 className="text-xl font-semibold text-gray-800">
                                    Recent Orders
                              </h2>
                        </div>
                        <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                          <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                      Type
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                      Items
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                      Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                      Time
                                                </th>
                                          </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                          {allOrders.length > 0 ? (
                                                allOrders.map((order) => (
                                                      <tr key={order.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                  {order.type}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                  {order.items.join(
                                                                        ", "
                                                                  )}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                  <span
                                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                                order.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                          }`}
                                                                  >
                                                                        {
                                                                              order.status
                                                                        }
                                                                  </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                  {order.time}
                                                            </td>
                                                      </tr>
                                                ))
                                          ) : (
                                                <tr>
                                                      <td
                                                            colSpan="4"
                                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                                      >
                                                            Loading order
                                                            history...
                                                      </td>
                                                </tr>
                                          )}
                                    </tbody>
                              </table>
                        </div>
                  </div>{" "}
            </>
      );
};

export default Orders;
