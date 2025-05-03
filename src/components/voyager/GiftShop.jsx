import { useState, useEffect } from "react";
import { FiCheckCircle, FiGift, FiShoppingCart, FiX } from "react-icons/fi";
import { useVoyagerContext } from "../../context/VoyagerContext";
import VoyagerNavbar from "./VoyagerNavbar";

const GiftShop=()=> {
      const [cart, setCart] = useState([]);
      const [orderPlaced, setOrderPlaced] = useState(false);
      const { products, fetchProducts, placeGiftOrder, loading } =
            useVoyagerContext();

      useEffect(() => {
            fetchProducts();
      }, []);

      const addToCart = (product) => {
            setCart([...cart, product]);
      };

      const removeFromCart = (productId) => {
            setCart(cart.filter((item) => item.id !== productId));
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
                  <div className="max-w-6xl mx-auto p-6">
                        <div className="flex items-center mb-6">
                              <FiGift className="text-2xl text-blue-600 mr-2" />
                              <h1 className="text-2xl font-bold text-gray-800">
                                    Gift Shop
                              </h1>
                        </div>
                        {orderPlaced && (
                              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                                    <FiCheckCircle className="mr-2" /> Order
                                    placed successfully!
                              </div>
                        )}

                        {loading && !products.length ? (
                              <div className="text-center py-8">
                                    Loading products...
                              </div>
                        ) : (
                              <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                          {products.map((product) => (
                                                <div
                                                      key={product.id}
                                                      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                                                >
                                                      <div className="p-4">
                                                            <div className="flex justify-between items-start">
                                                                  <h3 className="font-medium text-gray-800">
                                                                        {
                                                                              product.name
                                                                        }
                                                                  </h3>
                                                                  <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                                                                        {product.category ||
                                                                              "General"}
                                                                  </span>
                                                            </div>
                                                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                                                  {product.description ||
                                                                        "No description available"}
                                                            </p>
                                                            <div className="flex justify-between items-center mt-4">
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
                                                                        Add to
                                                                        Cart
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
                                                      {cart.map(
                                                            (item, index) => (
                                                                  <div
                                                                        key={
                                                                              index
                                                                        }
                                                                        className="flex justify-between items-center border-b pb-2"
                                                                  >
                                                                        <div className="flex-1">
                                                                              <span>
                                                                                    {
                                                                                          item.name
                                                                                    }
                                                                              </span>
                                                                              {item.description && (
                                                                                    <p className="text-xs text-gray-500 line-clamp-1">
                                                                                          {
                                                                                                item.description
                                                                                          }
                                                                                    </p>
                                                                              )}
                                                                        </div>
                                                                        <div className="flex items-center">
                                                                              <span className="font-medium mr-4">
                                                                                    $
                                                                                    {item.price.toFixed(
                                                                                          2
                                                                                    )}
                                                                              </span>
                                                                              <button
                                                                                    onClick={() =>
                                                                                          removeFromCart(
                                                                                                item.id
                                                                                          )
                                                                                    }
                                                                                    className="text-gray-500 hover:text-red-500"
                                                                              >
                                                                                    <FiX />
                                                                              </button>
                                                                        </div>
                                                                  </div>
                                                            )
                                                      )}
                                                </div>
                                                <div className="mt-4 flex justify-between items-center">
                                                      <span className="font-bold">
                                                            Total: $
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
                                                      <button
                                                            onClick={placeOrder}
                                                            disabled={loading}
                                                            className={`${
                                                                  loading
                                                                        ? "bg-gray-400 cursor-not-allowed"
                                                                        : "bg-green-600 hover:bg-green-700"
                                                            } text-white py-2 px-4 rounded text-sm`}
                                                      >
                                                            {loading
                                                                  ? "Processing..."
                                                                  : "Proceed to Checkout"}
                                                      </button>
                                                </div>
                                          </div>
                                    )}
                              </>
                        )}
                  </div>
            </>
      );
}

export default GiftShop; 