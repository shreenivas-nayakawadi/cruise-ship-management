import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiSave, FiX } from "react-icons/fi";
import { useAdminContext } from "../../context/AdminContext";
import AdminNavbar from "./AdminNavbar";

const AdminFood = () => {
      const {
            foodItems,
            loading,
            addFoodItem,
            updateFoodItem,
            deleteFoodItem,
      } = useAdminContext();
      const [isAdding, setIsAdding] = useState(false);
      const [editingId, setEditingId] = useState(null);
      const [formData, setFormData] = useState({
            name: "",
            category: "Dinner",
            price: "",
      });

      const categories = [
            "Breakfast",
            "Lunch",
            "Dinner",
            "Dessert",
            "Beverage",
      ];

     

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                  ...prev,
                  [name]: name === "price" ? parseFloat(value) || 0 : value,
            }));
      };

      const handleAddItem = async () => {
            const { success } = await addFoodItem(formData);
            if (success) {
                  setIsAdding(false);
                  setFormData({ name: "", category: "Dinner", price: "" });
            }
      };

      const handleUpdateItem = async (id) => {
            const { success } = await updateFoodItem(id, formData);
            if (success) {
                  setEditingId(null);
                  setFormData({ name: "", category: "Dinner", price: "" });
            }
      };

      const handleEditClick = (item) => {
            setEditingId(item.id);
            setFormData({
                  name: item.name,
                  category: item.category,
                  price: item.price,
            });
      };

      const handleCancel = () => {
            setIsAdding(false);
            setEditingId(null);
            setFormData({ name: "", category: "Dinner", price: "" });
      };

      return (
            <>
                  <AdminNavbar />
                  <div className="container mx-auto px-4 py-6">
                        <div className="flex justify-between items-center mb-6">
                              <h1 className="text-2xl font-bold text-gray-800">
                                    Food Menu Management
                              </h1>
                              <button
                                    onClick={() => setIsAdding(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
                              >
                                    <FiPlus className="mr-2" />
                                    Add Food Item
                              </button>
                        </div>

                        {/* Add New Item Form */}
                        {isAdding && (
                              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                                    <h2 className="text-lg font-semibold mb-4">
                                          Add New Food Item
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                          <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Name
                                                </label>
                                                <input
                                                      type="text"
                                                      name="name"
                                                      value={formData.name}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                      placeholder="Item name"
                                                />
                                          </div>
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Category
                                                </label>
                                                <select
                                                      name="category"
                                                      value={formData.category}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                >
                                                      {categories.map(
                                                            (category) => (
                                                                  <option
                                                                        key={
                                                                              category
                                                                        }
                                                                        value={
                                                                              category
                                                                        }
                                                                  >
                                                                        {
                                                                              category
                                                                        }
                                                                  </option>
                                                            )
                                                      )}
                                                </select>
                                          </div>
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Price (₹)
                                                </label>
                                                <input
                                                      type="number"
                                                      name="price"
                                                      value={formData.price}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                      placeholder="0.00"
                                                      step="0.01"
                                                      min="0"
                                                />
                                          </div>
                                    </div>
                                    <div className="flex justify-end mt-4 space-x-2">
                                          <button
                                                onClick={handleCancel}
                                                className="px-4 py-2 border border-gray-300 rounded flex items-center"
                                          >
                                                <FiX className="mr-2" />
                                                Cancel
                                          </button>
                                          <button
                                                onClick={handleAddItem}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
                                          >
                                                <FiSave className="mr-2" />
                                                Save Item
                                          </button>
                                    </div>
                              </div>
                        )}

                        {/* Food Items Table */}
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                          <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Category
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Price
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Actions
                                                </th>
                                          </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                          {loading ? (
                                                <tr>
                                                      <td
                                                            colSpan="4"
                                                            className="px-6 py-4 text-center"
                                                      >
                                                            Loading...
                                                      </td>
                                                </tr>
                                          ) : foodItems.length === 0 ? (
                                                <tr>
                                                      <td
                                                            colSpan="4"
                                                            className="px-6 py-4 text-center"
                                                      >
                                                            No food items found
                                                      </td>
                                                </tr>
                                          ) : (
                                                foodItems.map((item) => (
                                                      <tr key={item.id}>
                                                            {editingId ===
                                                            item.id ? (
                                                                  <>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <input
                                                                                    type="text"
                                                                                    name="name"
                                                                                    value={
                                                                                          formData.name
                                                                                    }
                                                                                    onChange={
                                                                                          handleInputChange
                                                                                    }
                                                                                    className="w-full p-1 border border-gray-300 rounded"
                                                                              />
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <select
                                                                                    name="category"
                                                                                    value={
                                                                                          formData.category
                                                                                    }
                                                                                    onChange={
                                                                                          handleInputChange
                                                                                    }
                                                                                    className="w-full p-1 border border-gray-300 rounded"
                                                                              >
                                                                                    {categories.map(
                                                                                          (
                                                                                                category
                                                                                          ) => (
                                                                                                <option
                                                                                                      key={
                                                                                                            category
                                                                                                      }
                                                                                                      value={
                                                                                                            category
                                                                                                      }
                                                                                                >
                                                                                                      {
                                                                                                            category
                                                                                                      }
                                                                                                </option>
                                                                                          )
                                                                                    )}
                                                                              </select>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <input
                                                                                    type="number"
                                                                                    name="price"
                                                                                    value={
                                                                                          formData.price
                                                                                    }
                                                                                    onChange={
                                                                                          handleInputChange
                                                                                    }
                                                                                    className="w-full p-1 border border-gray-300 rounded"
                                                                                    step="0.01"
                                                                                    min="0"
                                                                              />
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                                                                              <button
                                                                                    onClick={
                                                                                          handleCancel
                                                                                    }
                                                                                    className="text-gray-600 hover:text-gray-900"
                                                                              >
                                                                                    <FiX />
                                                                              </button>
                                                                              <button
                                                                                    onClick={() =>
                                                                                          handleUpdateItem(
                                                                                                item.id
                                                                                          )
                                                                                    }
                                                                                    className="text-green-600 hover:text-green-900"
                                                                              >
                                                                                    <FiSave />
                                                                              </button>
                                                                        </td>
                                                                  </>
                                                            ) : (
                                                                  <>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                              {
                                                                                    item.name
                                                                              }
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              {
                                                                                    item.category
                                                                              }
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              ₹
                                                                              {item.price.toFixed(
                                                                                    2
                                                                              )}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                              <div className="flex space-x-2">
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                handleEditClick(
                                                                                                      item
                                                                                                )
                                                                                          }
                                                                                          className="text-blue-600 hover:text-blue-900"
                                                                                    >
                                                                                          <FiEdit />
                                                                                    </button>
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                deleteFoodItem(
                                                                                                      item.id
                                                                                                )
                                                                                          }
                                                                                          className="text-red-600 hover:text-red-900"
                                                                                    >
                                                                                          <FiTrash2 />
                                                                                    </button>
                                                                              </div>
                                                                        </td>
                                                                  </>
                                                            )}
                                                      </tr>
                                                ))
                                          )}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </>
      );
};

export default AdminFood;
