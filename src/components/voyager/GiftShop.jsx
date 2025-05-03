import { useState } from "react";
import { FiGift, FiShoppingCart } from "react-icons/fi";
import { useVoyagerContext } from "../../context/VoyagerContext";
import VoyagerNavbar from "./VoyagerNavbar";

export default function GiftShop() {
      const [products] = useState([
            {
                  id: 1,
                  name: "Cruise Logo T-Shirt",
                  price: 24.99,
                  image: "/tshirt.jpg",
            },
            {
                  id: 2,
                  name: "Ship Model",
                  price: 39.99,
                  image: "/ship-model.jpg",
            },
            { id: 3, name: "Photo Frame", price: 19.99, image: "/frame.jpg" },
            { id: 4, name: "Souvenir Mug", price: 12.99, image: "/mug.jpg" },
      ]);
      const [cart, setCart] = useState([]);
      const [orderPlaced, setOrderPlaced] = useState(false);
      const { placeGiftOrder, loading } = useVoyagerContext();

      const addToCart = (product) => {
            setCart([...cart, product]);
      };

      const placeOrder = async () => {
            const result = await placeGiftOrder(cart); // optionally add deliveryOption
            if (result.success) {
                  console.log("Gift order placed:", result.orderId);
                  setCart([]);
                  setOrderPlaced(true);
                  setTimeout(() => setOrderPlaced(false), 3000);
            } else {
                  alert("Order failed: " + result.error);
            }
      };

      return (
            <>
                  <VoyagerNavbar />
                  <div className="max-w-4xl mx-auto p-6">
                        <div className="flex items-center mb-6">
                              <FiGift className="text-2xl text-blue-600 mr-2" />
                              <h1 className="text-2xl font-bold text-gray-800">
                                    Gift Shop
                              </h1>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                              {products.map((product) => (
                                    <div
                                          key={product.id}
                                          className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
                                    >
                                          <div className="h-40 bg-gray-100 flex items-center justify-center">
                                                <img
                                                      src={product.image}
                                                      alt={product.name}
                                                      className="h-full object-cover"
                                                />
                                          </div>
                                          <div className="p-4">
                                                <h3 className="font-medium text-gray-800">
                                                      {product.name}
                                                </h3>
                                                <div className="flex flex-col justify-between items-start mt-2">
                                                      <span className="font-medium text-blue-600">
                                                            $
                                                            {product.price.toFixed(
                                                                  2
                                                            )}
                                                      </span>
                                                      <button
                                                            onClick={() =>
                                                                  addToCart(
                                                                        product
                                                                  )
                                                            }
                                                            className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded"
                                                      >
                                                            Add to Cart
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>

                        {cart.length > 0 && (
                              <div className="mt-8 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                                    <div className="flex items-center mb-4">
                                          <FiShoppingCart className="text-xl text-blue-600 mr-2" />
                                          <h2 className="font-bold text-lg">
                                                Your Shopping Cart (
                                                {cart.length})
                                          </h2>
                                    </div>
                                    <div className="space-y-3">
                                          {cart.map((item, index) => (
                                                <div
                                                      key={index}
                                                      className="flex justify-between border-b pb-2"
                                                >
                                                      <span>{item.name}</span>
                                                      <span>
                                                            $
                                                            {item.price.toFixed(
                                                                  2
                                                            )}
                                                      </span>
                                                </div>
                                          ))}
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                          <span className="font-bold">
                                                Total: $
                                                {cart
                                                      .reduce(
                                                            (sum, item) =>
                                                                  sum +
                                                                  item.price,
                                                            0
                                                      )
                                                      .toFixed(2)}
                                          </span>
                                          <button
                                                onClick={placeOrder}
                                                disabled={loading}
                                                className={`${
                                                      loading
                                                            ? "bg-gray-400 cursor-not-allowed"
                                                            : "bg-green-600 hover:bg-green-700"
                                                } text-white py-2 px-4 rounded text-sm`}
                                          >
                                                Proceed to Checkout
                                          </button>
                                    </div>
                              </div>
                        )}
                  </div>
            </>
      );
}
