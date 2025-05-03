import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiSave, FiX } from "react-icons/fi";
import { useAdminContext } from "../../context/AdminContext";
import AdminNavbar from "./AdminNavbar";

const AdminEntertainment = () => {
      const { events, loading, addEvent, updateEvent, deleteEvent } =
            useAdminContext();

      const [isAdding, setIsAdding] = useState(false);
      const [editingId, setEditingId] = useState(null);
      const [formData, setFormData] = useState({
            title: "",
            performer: "",
            time: "",
            location: "",
            date: "Tonight",
            description: "",
      });

      // Predefined options
      const dateOptions = ["Tonight", "Tomorrow", "Day 3", "Day 4", "Day 5"];

      const timeSlots = [
            "18:00 - 19:30",
            "19:00 - 20:30",
            "20:00 - 21:30",
            "21:00 - 22:30",
            "22:00 - 23:30",
      ];

      const locationOptions = [
            "Grand Lounge",
            "Main Theater",
            "Laugh Lounge",
            "Sky Deck",
            "Ocean View Terrace",
            "Royal Ballroom",
      ];

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                  ...prev,
                  [name]: value,
            }));
      };

      const handleAddEvent = async () => {
            const { success } = await addEvent(formData);
            if (success) {
                  setIsAdding(false);
                  setFormData({
                        title: "",
                        performer: "",
                        time: "",
                        location: "",
                        date: "Tonight",
                        description: "",
                  });
            }
      };

      const handleUpdateEvent = async (id) => {
            const { success } = await updateEvent(id, formData);
            if (success) {
                  setEditingId(null);
                  setFormData({
                        title: "",
                        performer: "",
                        time: "",
                        location: "",
                        date: "Tonight",
                        description: "",
                  });
            }
      };

      const handleEditClick = (event) => {
            setEditingId(event.id);
            setFormData({
                  title: event.title,
                  performer: event.performer,
                  time: event.time,
                  location: event.location,
                  date: event.date,
                  description: event.description,
            });
      };

      const handleCancel = () => {
            setIsAdding(false);
            setEditingId(null);
            setFormData({
                  title: "",
                  performer: "",
                  time: "",
                  location: "",
                  date: "Tonight",
                  description: "",
            });
      };

      return (
            <>
                  <AdminNavbar />
                  <div className="container mx-auto px-4 py-6">
                        <div className="flex justify-between items-center mb-6">
                              <h1 className="text-2xl font-bold text-gray-800">
                                    Events Management
                              </h1>
                              <button
                                    onClick={() => setIsAdding(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
                              >
                                    <FiPlus className="mr-2" />
                                    Add Event
                              </button>
                        </div>

                        {/* Add New Event Form */}
                        {isAdding && (
                              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                                    <h2 className="text-lg font-semibold mb-4">
                                          Add New Event
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Event Title
                                                </label>
                                                <input
                                                      type="text"
                                                      name="title"
                                                      value={formData.title}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                      placeholder="Event title"
                                                />
                                          </div>
                                          <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Performer
                                                </label>
                                                <input
                                                      type="text"
                                                      name="performer"
                                                      value={formData.performer}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                      placeholder="Performer or group name"
                                                />
                                          </div>
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Time Slot
                                                </label>
                                                <select
                                                      name="time"
                                                      value={formData.time}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                      size="3"
                                                >
                                                      <option value="">
                                                            Select time
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
                                                      Location
                                                </label>
                                                <select
                                                      name="location"
                                                      value={formData.location}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                      size="3"
                                                >
                                                      <option value="">
                                                            Select location
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
                                          <div className="md:col-span-2">
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
                                                      placeholder="Event description"
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
                                                onClick={handleAddEvent}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
                                          >
                                                <FiSave className="mr-2" />
                                                Save Event
                                          </button>
                                    </div>
                              </div>
                        )}

                        {/* Events Table */}
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                          <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Title
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Performer
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Time
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Location
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
                                                            colSpan="5"
                                                            className="px-6 py-4 text-center"
                                                      >
                                                            Loading...
                                                      </td>
                                                </tr>
                                          ) : events.length === 0 ? (
                                                <tr>
                                                      <td
                                                            colSpan="5"
                                                            className="px-6 py-4 text-center"
                                                      >
                                                            No events found
                                                      </td>
                                                </tr>
                                          ) : (
                                                events.map((event) => (
                                                      <tr key={event.id}>
                                                            {editingId ===
                                                            event.id ? (
                                                                  <>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <input
                                                                                    type="text"
                                                                                    name="title"
                                                                                    value={
                                                                                          formData.title
                                                                                    }
                                                                                    onChange={
                                                                                          handleInputChange
                                                                                    }
                                                                                    className="w-full p-1 border border-gray-300 rounded"
                                                                              />
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <input
                                                                                    type="text"
                                                                                    name="performer"
                                                                                    value={
                                                                                          formData.performer
                                                                                    }
                                                                                    onChange={
                                                                                          handleInputChange
                                                                                    }
                                                                                    className="w-full p-1 border border-gray-300 rounded"
                                                                              />
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <select
                                                                                    name="time"
                                                                                    value={
                                                                                          formData.time
                                                                                    }
                                                                                    onChange={
                                                                                          handleInputChange
                                                                                    }
                                                                                    className="w-full p-1 border border-gray-300 rounded"
                                                                                    size="3"
                                                                              >
                                                                                    <option value="">
                                                                                          Select
                                                                                          time
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
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <select
                                                                                    name="location"
                                                                                    value={
                                                                                          formData.location
                                                                                    }
                                                                                    onChange={
                                                                                          handleInputChange
                                                                                    }
                                                                                    className="w-full p-1 border border-gray-300 rounded"
                                                                                    size="3"
                                                                              >
                                                                                    <option value="">
                                                                                          Select
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
                                                                                          handleUpdateEvent(
                                                                                                event.id
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
                                                                                    event.title
                                                                              }
                                                                              <p className="text-xs text-gray-500 mt-1">
                                                                                    {
                                                                                          event.description
                                                                                    }
                                                                              </p>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              {
                                                                                    event.performer
                                                                              }
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              {
                                                                                    event.time
                                                                              }
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              {
                                                                                    event.location
                                                                              }
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                              <div className="flex space-x-2">
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                handleEditClick(
                                                                                                      event
                                                                                                )
                                                                                          }
                                                                                          className="text-blue-600 hover:text-blue-900"
                                                                                    >
                                                                                          <FiEdit />
                                                                                    </button>
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                deleteEvent(
                                                                                                      event.id
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

export default AdminEntertainment;
