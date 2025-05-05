import { useState, useEffect } from "react";
import {
      FiActivity,
      FiCalendar,
      FiMapPin,
      FiClock,
      FiUsers,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import { useVoyagerContext } from "../../context/VoyagerContext";
import VoyagerNavbar from "./VoyagerNavbar";

const Activities = () => {
      const [activityItems, setActivityItems] = useState([]);
      const [selectedActivity, setSelectedActivity] = useState(null);
      const [bookingConfirmed, setBookingConfirmed] = useState(false);
      const [participants, setParticipants] = useState(1);
      const { bookActivity, loading, activities, fetchActivities } =
            useVoyagerContext();

      const handleBooking = async () => {
            const result = await bookActivity(selectedActivity, participants);
            if (result.success) {
                  console.log("Activity booked:", result.bookingId);
                  setBookingConfirmed(true);
                  setTimeout(() => setBookingConfirmed(false), 3000);
                  fetchActivities(); // refresh data after booking
            } else {
                  alert("Booking failed: " + result.error);
            }
      };

      useEffect(() => {
            setActivityItems([...activities]);
      }, [activities]);

      useEffect(() => {
            fetchActivities();
      }, []);

      return (
            <>
                  <VoyagerNavbar />
                  <div className="max-w-4xl mx-auto p-6">
                        <div className="flex items-center mb-6">
                              <FiActivity className="text-2xl text-blue-600 mr-2" />
                              <h1 className="text-2xl font-bold text-gray-800">
                                    Daily Activities
                              </h1>
                        </div>

                        {!selectedActivity ? (
                              <div className="space-y-4">
                                    {activityItems.map((activity) => (
                                          <div
                                                key={activity.id}
                                                onClick={() =>
                                                      setSelectedActivity(
                                                            activity
                                                      )
                                                }
                                                className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-blue-300 cursor-pointer"
                                          >
                                                <div className="flex justify-between">
                                                      <h3 className="font-medium text-gray-800">
                                                            {activity.name}
                                                      </h3>
                                                      <span className="text-sm text-gray-500">
                                                            {activity.date}
                                                      </span>
                                                </div>
                                                <div className="flex items-center mt-2 text-sm text-gray-600 space-x-4">
                                                      <div className="flex items-center">
                                                            <FiClock className="mr-1" />
                                                            <span>
                                                                  {
                                                                        activity.time
                                                                  }
                                                            </span>
                                                      </div>
                                                      <div className="flex items-center">
                                                            <FiMapPin className="mr-1" />
                                                            <span>
                                                                  {
                                                                        activity.location
                                                                  }
                                                            </span>
                                                      </div>
                                                      <div className="flex items-center">
                                                            <FaRupeeSign className="mr-1" />
                                                            <span>
                                                                  {
                                                                        activity.price
                                                                  }
                                                            </span>
                                                      </div>
                                                      <div className="flex items-center">
                                                            <FiUsers className="mr-1" />
                                                            <span>
                                                                  {
                                                                        activity.availableSlots
                                                                  }{" "}
                                                                  slots
                                                            </span>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        ) : (
                              <div>
                                    <div className="flex justify-between items-center mb-6">
                                          <h2 className="text-xl font-bold text-gray-800">
                                                {selectedActivity.name}
                                          </h2>
                                          <button
                                                onClick={() =>
                                                      setSelectedActivity(null)
                                                }
                                                className="text-sm text-blue-600 hover:underline"
                                          >
                                                Back to activities
                                          </button>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-sm p-6">
                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                <div className="flex items-center">
                                                      <FiCalendar className="text-gray-500 mr-2" />
                                                      <span>
                                                            {
                                                                  selectedActivity.date
                                                            }
                                                      </span>
                                                </div>
                                                <div className="flex items-center">
                                                      <FiClock className="text-gray-500 mr-2" />
                                                      <span>
                                                            {
                                                                  selectedActivity.time
                                                            }
                                                      </span>
                                                </div>
                                                <div className="flex items-center">
                                                      <FiMapPin className="text-gray-500 mr-2" />
                                                      <span>
                                                            {
                                                                  selectedActivity.location
                                                            }
                                                      </span>
                                                </div>
                                          </div>

                                          <div className="mb-4">
                                                <h3 className="font-medium mb-2">
                                                      Description
                                                </h3>
                                                <p className="text-gray-600">
                                                      {
                                                            selectedActivity.description
                                                      }
                                                </p>
                                          </div>

                                          <div className="flex items-center mb-4 space-x-4">
                                                <div className="flex items-center">
                                                      <FaRupeeSign className="text-gray-500 mr-1" />
                                                      <span className="text-gray-700 font-medium">
                                                            ₹
                                                            {
                                                                  selectedActivity.price
                                                            }{" "}
                                                            / person
                                                      </span>
                                                </div>
                                                <div className="flex items-center">
                                                      <FiUsers className="text-gray-500 mr-1" />
                                                      <span className="text-gray-700">
                                                            {
                                                                  selectedActivity.availableSlots
                                                            }{" "}
                                                            slots left
                                                      </span>
                                                </div>
                                          </div>

                                          <input
                                                type="number"
                                                min="1"
                                                max={
                                                      selectedActivity.maxParticipants
                                                }
                                                value={participants}
                                                onChange={(e) =>
                                                      setParticipants(
                                                            Number(
                                                                  e.target.value
                                                            )
                                                      )
                                                }
                                                className="border border-gray-300 rounded px-3 py-1 mb-4 w-24"
                                          />

                                          <button
                                                onClick={() => {
                                                      setSelectedActivity(null);
                                                      handleBooking();
                                                }}
                                                disabled={loading}
                                                className={`w-full ${
                                                      loading
                                                            ? "bg-gray-400"
                                                            : "bg-blue-600 hover:bg-blue-700"
                                                } text-white py-2 px-4 rounded text-sm`}
                                          >
                                                Add to My Schedule
                                          </button>
                                    </div>
                              </div>
                        )}
                  </div>
            </>
      );
};

export default Activities;
