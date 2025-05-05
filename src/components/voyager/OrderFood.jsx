import { useState, useEffect } from "react";
import { FiCoffee, FiCheckCircle } from "react-icons/fi";
import { useVoyagerContext } from "../../context/VoyagerContext.jsx";
import VoyagerNavbar from "./VoyagerNavbar.jsx";

const OrderFood = () => {
      const [cart, setCart] = useState([]);
      const [orderPlaced, setOrderPlaced] = useState(false);
      const { placeFoodOrder, loading, foodItems, fetchFoodItems } =
            useVoyagerContext();
      const [menu, setMenu] = useState([]);

      const addToCart = (item) => {
            setCart([...cart, item]);
      };

      const handlePlaceOrder = async () => {
            if (cart.length === 0) return;

            const result = await placeFoodOrder(cart); // No special instructions for now
            if (result.success) {
                  console.log("Order ID:", result.orderId);
                  setOrderPlaced(true);
                  setCart([]);
                  setTimeout(() => setOrderPlaced(false), 1000);
            } else {
                  alert("Error placing order: " + result.error);
            }
      };

      useEffect(() => {
            setMenu([...foodItems]);
      }, [foodItems]);

      useEffect(() => {
            fetchFoodItems();
      }, []);

      return (
            <>
                  <VoyagerNavbar />
                  <div className="max-w-4xl mx-auto p-6">
                        <div className="flex items-center mb-6">
                              <FiCoffee className="text-2xl text-blue-600 mr-2" />
                              <h1 className="text-2xl font-bold text-gray-800">
                                    Food & Beverage Ordering
                              </h1>
                        </div>

                        {orderPlaced && (
                              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                                    <FiCheckCircle className="mr-2" />
                                    Your order has been placed! Delivery to your
                                    cabin within 30 minutes.
                              </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="md:col-span-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                          {menu.map((item) => (
                                                <div
                                                      key={item.id}
                                                      className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
                                                >
                                                      <h3 className="font-medium text-gray-800">
                                                            {item.name}
                                                      </h3>
                                                      <div className="flex justify-between items-center mt-2">
                                                            <span className="text-sm text-gray-600">
                                                                  {
                                                                        item.category
                                                                  }
                                                            </span>
                                                            <span className="font-medium">
                                                                  ₹
                                                                  {item.price.toFixed(
                                                                        2
                                                                  )}
                                                            </span>
                                                      </div>
                                                      <button
                                                            onClick={() =>
                                                                  addToCart(
                                                                        item
                                                                  )
                                                            }
                                                            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
                                                      >
                                                            Add to Order
                                                      </button>
                                                </div>
                                          ))}
                                    </div>
                              </div>

                              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                                    <h2 className="font-bold text-lg mb-4">
                                          Your Order
                                    </h2>
                                    {cart.length === 0 ? (
                                          <p className="text-gray-500">
                                                Your cart is empty
                                          </p>
                                    ) : (
                                          <>
                                                <div className="space-y-3 mb-4">
                                                      {cart.map(
                                                            (item, index) => (
                                                                  <div
                                                                        key={
                                                                              index
                                                                        }
                                                                        className="flex justify-between border-b pb-2"
                                                                  >
                                                                        <span>
                                                                              {
                                                                                    item.name
                                                                              }
                                                                        </span>
                                                                        <span>
                                                                              ₹
                                                                              {item.price.toFixed(
                                                                                    2
                                                                              )}
                                                                        </span>
                                                                  </div>
                                                            )
                                                      )}
                                                </div>
                                                <div className="font-bold border-t pt-3 flex justify-between">
                                                      <span>Total:</span>
                                                      <span>
                                                            ₹
                                                            {cart
                                                                  .reduce(
                                                                        (
                                                                              sum,
                                                                              item
                                                                        ) =>
                                                                              sum +
                                                                              item.price,
                                                                        0
                                                                  )
                                                                  .toFixed(2)}
                                                      </span>
                                                </div>
                                                <button
                                                      onClick={handlePlaceOrder}
                                                      disabled={loading}
                                                      className={`mt-4 w-full ${
                                                            loading
                                                                  ? "bg-gray-400"
                                                                  : "bg-green-600 hover:bg-green-700"
                                                      } text-white py-2 px-4 rounded text-sm`}
                                                >
                                                      Place Order
                                                </button>
                                          </>
                                    )}
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default OrderFood;
