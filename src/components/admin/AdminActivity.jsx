import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiSave, FiX } from "react-icons/fi";
import { useAdminContext } from "../../context/AdminContext";
import AdminNavbar from "./AdminNavbar";
import { BiRupee } from "react-icons/bi";

const AdminActivity = () => {
      const {
            activities,
            loading,
            addActivity,
            updateActivity,
            deleteActivity,
      } = useAdminContext();

      const [isAdding, setIsAdding] = useState(false);
      const [editingId, setEditingId] = useState(null);
      const [formData, setFormData] = useState({
            name: "",
            time: "",
            location: "",
            date: "Today",
            description: "",
            price: 0,
            maxParticipants: 20,
      });

      // Predefined options
      const dateOptions = ["Today", "Tomorrow", "This Week", "Next Week"];
      const participantOptions = [10, 15, 20, 25, 30, 40, 50];

      const timeSlots = [
            "08:00 - 09:00",
            "09:00 - 10:00",
            "10:00 - 11:00",
            "11:00 - 12:00",
            "12:00 - 13:00",
            "13:00 - 14:00",
            "14:00 - 15:00",
            "15:00 - 16:00",
            "16:00 - 17:00",
            "17:00 - 18:00",
            "18:00 - 19:00",
            "19:00 - 20:00",
            "20:00 - 21:00",
            "21:00 - 22:00",
            "22:00 - 23:00",
      ];

      const locationOptions = [
            "Main Pool Deck",
            "Grand Lounge",
            "Vineyard Lounge",
            "Sky Deck",
            "Ocean View Terrace",
            "Royal Theater",
            "Adults Only Pool",
            "Sports Court",
            "Kids Club",
            "Spa Terrace",
      ];

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                  ...prev,
                  [name]:
                        name === "price" || name === "maxParticipants"
                              ? parseFloat(value) || 0
                              : value,
            }));
      };

      const handleAddActivity = async () => {
            if (!formData.name || !formData.time || !formData.location) {
                  alert("Please fill all required fields");
                  return;
            }

            const { success } = await addActivity(formData);
            console.log(formData);
            if (success) {
                  setIsAdding(false);
                  setFormData({
                        name: "",
                        time: "",
                        location: "",
                        date: "Today",
                        description: "",
                        price: 0,
                        maxParticipants: 20,
                  });
            }
      };

      const handleUpdateActivity = async (id) => {
            if (!formData.name || !formData.time || !formData.location) {
                  alert("Please fill all required fields");
                  return;
            }

            const { success } = await updateActivity(id, formData);
            if (success) {
                  setEditingId(null);
                  setFormData({
                        name: "",
                        time: "",
                        location: "",
                        date: "Today",
                        description: "",
                        price: 0,
                        maxParticipants: 20,
                  });
            }
      };

      const handleEditClick = (activity) => {
            setEditingId(activity.id);
            setFormData({
                  name: activity.name,
                  time: activity.time,
                  location: activity.location,
                  date: activity.date,
                  description: activity.description,
                  price: activity.price || 0,
                  maxParticipants: activity.maxParticipants || 20,
            });
      };

      const handleCancel = () => {
            setIsAdding(false);
            setEditingId(null);
            setFormData({
                  name: "",
                  time: "",
                  location: "",
                  date: "Today",
                  description: "",
                  price: 0,
                  maxParticipants: 20,
            });
      };

      return (
            <>
                  <AdminNavbar />
                  <div className="container mx-auto px-4 py-6">
                        <div className="flex justify-between items-center mb-6">
                              <h1 className="text-2xl font-bold text-gray-800">
                                    Activities Management
                              </h1>
                              <button
                                    onClick={() => {
                                          handleCancel();
                                          setIsAdding(true);
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
                              >
                                    <FiPlus className="mr-2" />
                                    Add Activity
                              </button>
                        </div>

                        {/* Add New Activity Form */}
                        {isAdding && (
                              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                                    <h2 className="text-lg font-semibold mb-4">
                                          Add New Activity
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Activity Name*
                                                </label>
                                                <input
                                                      type="text"
                                                      name="name"
                                                      value={formData.name}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                      placeholder="Activity name"
                                                      required
                                                />
                                          </div>
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Time Slot*
                                                </label>
                                                <select
                                                      name="time"
                                                      value={formData.time}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                      required
                                                >
                                                      <option value="">
                                                            Select a time slot
                                                      </option>
                                                      {timeSlots.map((time) => (
                                                            <option
                                                                  key={time}
                                                                  value={time}
                                                            >
                                                                  {time}
                                                            </option>
                                                      ))}
                                                </select>
                                          </div>
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Location*
                                                </label>
                                                <select
                                                      name="location"
                                                      value={formData.location}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                      required
                                                >
                                                      <option value="">
                                                            Select a location
                                                      </option>
                                                      {locationOptions.map(
                                                            (location) => (
                                                                  <option
                                                                        key={
                                                                              location
                                                                        }
                                                                        value={
                                                                              location
                                                                        }
                                                                  >
                                                                        {
                                                                              location
                                                                        }
                                                                  </option>
                                                            )
                                                      )}
                                                </select>
                                          </div>
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Date
                                                </label>
                                                <select
                                                      name="date"
                                                      value={formData.date}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                >
                                                      {dateOptions.map(
                                                            (option) => (
                                                                  <option
                                                                        key={
                                                                              option
                                                                        }
                                                                        value={
                                                                              option
                                                                        }
                                                                  >
                                                                        {option}
                                                                  </option>
                                                            )
                                                      )}
                                                </select>
                                          </div>
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Price (₹)
                                                </label>
                                                <div className="relative rounded-md shadow-sm">
                                                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <BiRupee className="text-gray-400" />
                                                      </div>
                                                      <input
                                                            type="number"
                                                            name="price"
                                                            value={
                                                                  formData.price
                                                            }
                                                            onChange={
                                                                  handleInputChange
                                                            }
                                                            className="block w-full pl-8 p-2 border border-gray-300 rounded"
                                                            placeholder="0.00"
                                                            step="0.01"
                                                            min="0"
                                                      />
                                                </div>
                                          </div>
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Max Participants
                                                </label>
                                                <select
                                                      name="maxParticipants"
                                                      value={
                                                            formData.maxParticipants
                                                      }
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                >
                                                      {participantOptions.map(
                                                            (num) => (
                                                                  <option
                                                                        key={
                                                                              num
                                                                        }
                                                                        value={
                                                                              num
                                                                        }
                                                                  >
                                                                        {num}
                                                                  </option>
                                                            )
                                                      )}
                                                </select>
                                          </div>
                                          <div className="md:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Description
                                                </label>
                                                <textarea
                                                      name="description"
                                                      value={
                                                            formData.description
                                                      }
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                      rows="3"
                                                      placeholder="Activity description"
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
                                                onClick={handleAddActivity}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
                                          >
                                                <FiSave className="mr-2" />
                                                Save Activity
                                          </button>
                                    </div>
                              </div>
                        )}

                        {/* Activities Table */}
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200">
                                    {!editingId && (
                                          <thead className="bg-gray-50">
                                                <tr>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Name
                                                      </th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Time
                                                      </th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Location
                                                      </th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Price
                                                      </th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Max
                                                      </th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Actions
                                                      </th>
                                                </tr>
                                          </thead>
                                    )}

                                    <tbody className="bg-white divide-y divide-gray-200">
                                          {loading ? (
                                                <tr>
                                                      <td
                                                            colSpan="6"
                                                            className="px-6 py-4 text-center"
                                                      >
                                                            Loading...
                                                      </td>
                                                </tr>
                                          ) : activities.length === 0 &&
                                            !editingId ? (
                                                <tr>
                                                      <td
                                                            colSpan="6"
                                                            className="px-6 py-4 text-center"
                                                      >
                                                            No activities found
                                                      </td>
                                                </tr>
                                          ) : (
                                                activities.map((activity) => (
                                                      <tr key={activity.id}>
                                                            {editingId ===
                                                            activity.id ? (
                                                                  <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                                                                        <h2 className="text-lg font-semibold mb-4">
                                                                              Update
                                                                              Activity
                                                                        </h2>
                                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                              <div>
                                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                                          Activity
                                                                                          Name*
                                                                                    </label>
                                                                                    <input
                                                                                          type="text"
                                                                                          name="name"
                                                                                          value={
                                                                                                formData.name
                                                                                          }
                                                                                          onChange={
                                                                                                handleInputChange
                                                                                          }
                                                                                          className="w-full p-2 border border-gray-300 rounded"
                                                                                          placeholder="Activity name"
                                                                                          required
                                                                                    />
                                                                              </div>
                                                                              <div>
                                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                                          Time
                                                                                          Slot*
                                                                                    </label>
                                                                                    <select
                                                                                          name="time"
                                                                                          value={
                                                                                                formData.time
                                                                                          }
                                                                                          onChange={
                                                                                                handleInputChange
                                                                                          }
                                                                                          className="w-full p-2 border border-gray-300 rounded"
                                                                                          required
                                                                                    >
                                                                                          <option value="">
                                                                                                Select
                                                                                                a
                                                                                                time
                                                                                                slot
                                                                                          </option>
                                                                                          {timeSlots.map(
                                                                                                (
                                                                                                      time
                                                                                                ) => (
                                                                                                      <option
                                                                                                            key={
                                                                                                                  time
                                                                                                            }
                                                                                                            value={
                                                                                                                  time
                                                                                                            }
                                                                                                      >
                                                                                                            {
                                                                                                                  time
                                                                                                            }
                                                                                                      </option>
                                                                                                )
                                                                                          )}
                                                                                    </select>
                                                                              </div>
                                                                              <div>
                                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                                          Location*
                                                                                    </label>
                                                                                    <select
                                                                                          name="location"
                                                                                          value={
                                                                                                formData.location
                                                                                          }
                                                                                          onChange={
                                                                                                handleInputChange
                                                                                          }
                                                                                          className="w-full p-2 border border-gray-300 rounded"
                                                                                          required
                                                                                    >
                                                                                          <option value="">
                                                                                                Select
                                                                                                a
                                                                                                location
                                                                                          </option>
                                                                                          {locationOptions.map(
                                                                                                (
                                                                                                      location
                                                                                                ) => (
                                                                                                      <option
                                                                                                            key={
                                                                                                                  location
                                                                                                            }
                                                                                                            value={
                                                                                                                  location
                                                                                                            }
                                                                                                      >
                                                                                                            {
                                                                                                                  location
                                                                                                            }
                                                                                                      </option>
                                                                                                )
                                                                                          )}
                                                                                    </select>
                                                                              </div>
                                                                              <div>
                                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                                          Date
                                                                                    </label>
                                                                                    <select
                                                                                          name="date"
                                                                                          value={
                                                                                                formData.date
                                                                                          }
                                                                                          onChange={
                                                                                                handleInputChange
                                                                                          }
                                                                                          className="w-full p-2 border border-gray-300 rounded"
                                                                                    >
                                                                                          {dateOptions.map(
                                                                                                (
                                                                                                      option
                                                                                                ) => (
                                                                                                      <option
                                                                                                            key={
                                                                                                                  option
                                                                                                            }
                                                                                                            value={
                                                                                                                  option
                                                                                                            }
                                                                                                      >
                                                                                                            {
                                                                                                                  option
                                                                                                            }
                                                                                                      </option>
                                                                                                )
                                                                                          )}
                                                                                    </select>
                                                                              </div>
                                                                              <div>
                                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                                          Price
                                                                                          (₹)
                                                                                    </label>
                                                                                    <div className="relative rounded-md shadow-sm">
                                                                                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                                                <BiRupee className="text-gray-400" />
                                                                                          </div>
                                                                                          <input
                                                                                                type="number"
                                                                                                name="price"
                                                                                                value={
                                                                                                      formData.price
                                                                                                }
                                                                                                onChange={
                                                                                                      handleInputChange
                                                                                                }
                                                                                                className="block w-full pl-8 p-2 border border-gray-300 rounded"
                                                                                                placeholder="0.00"
                                                                                                step="0.01"
                                                                                                min="0"
                                                                                          />
                                                                                    </div>
                                                                              </div>
                                                                              <div className="md:col-span-3">
                                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                                          Description
                                                                                    </label>
                                                                                    <textarea
                                                                                          name="description"
                                                                                          value={
                                                                                                formData.description
                                                                                          }
                                                                                          onChange={
                                                                                                handleInputChange
                                                                                          }
                                                                                          className="w-full p-2 border border-gray-300 rounded"
                                                                                          rows="3"
                                                                                          placeholder="Activity description"
                                                                                    />
                                                                              </div>
                                                                        </div>
                                                                        <div className="flex justify-end mt-4 space-x-2">
                                                                              <button
                                                                                    onClick={
                                                                                          handleCancel
                                                                                    }
                                                                                    className="px-4 py-2 border border-gray-300 rounded flex items-center"
                                                                              >
                                                                                    <FiX className="mr-2" />
                                                                                    Cancel
                                                                              </button>
                                                                              <button
                                                                                    onClick={() => {
                                                                                          handleUpdateActivity(
                                                                                                editingId
                                                                                          );
                                                                                    }}
                                                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
                                                                              >
                                                                                    <FiSave className="mr-2" />
                                                                                    Update
                                                                                    Activity
                                                                              </button>
                                                                        </div>
                                                                  </div>
                                                            ) : (
                                                                  <>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                              {
                                                                                    activity.name
                                                                              }
                                                                              <p className="text-xs text-gray-500 mt-1">
                                                                                    {
                                                                                          activity.description
                                                                                    }
                                                                              </p>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              {
                                                                                    activity.time
                                                                              }
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              {
                                                                                    activity.location
                                                                              }
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              ₹
                                                                              {activity.price?.toFixed(
                                                                                    2
                                                                              ) ||
                                                                                    "Free"}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              {
                                                                                    activity.maxParticipants
                                                                              }
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                              <div className="flex space-x-2">
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                handleEditClick(
                                                                                                      activity
                                                                                                )
                                                                                          }
                                                                                          className="text-blue-600 hover:text-blue-900"
                                                                                    >
                                                                                          <FiEdit />
                                                                                    </button>
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                deleteActivity(
                                                                                                      activity.id
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

export default AdminActivity;
