import { useState } from "react";
import { FiActivity, FiCalendar, FiMapPin, FiClock } from "react-icons/fi";
import { useVoyagerContext } from "../../context/VoyagerContext";
import VoyagerNavbar from "./VoyagerNavbar";

export default function Activities() {
      const [activities] = useState([
            {
                  id: 1,
                  name: "Poolside Zumba",
                  time: "10:00 - 11:00",
                  location: "Main Pool Deck",
                  date: "Today",
                  description: "Fun dance workout with our fitness instructor",
            },
            {
                  id: 2,
                  name: "Wine Tasting",
                  time: "15:00 - 16:30",
                  location: "Vineyard Lounge",
                  date: "Today",
                  description: "Sample premium wines from around the world",
            },
            {
                  id: 3,
                  name: "Karaoke Night",
                  time: "20:00 - 23:00",
                  location: "Grand Lounge",
                  date: "Tomorrow",
                  description:
                        "Show off your singing talent with our live band",
            },
      ]);
      const [selectedActivity, setSelectedActivity] = useState(null);
      const [bookingConfirmed, setBookingConfirmed] = useState(false);
      const { bookActivity, loading } = useVoyagerContext();

      const handleBooking = async () => {
            const result = await bookActivity(selectedActivity);
            if (result.success) {
                  console.log("Activity booked:", result.bookingId);
                  setBookingConfirmed(true);
                  setTimeout(() => setBookingConfirmed(false), 3000);
            } else {
                  alert("Booking failed: " + result.error);
            }
      };

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
                                    {activities.map((activity) => (
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
                                                <div className="flex items-center mt-2 text-sm text-gray-600">
                                                      <FiClock className="mr-1" />
                                                      <span>
                                                            {activity.time}
                                                      </span>
                                                      <span className="mx-2">
                                                            •
                                                      </span>
                                                      <FiMapPin className="mr-1" />
                                                      <span>
                                                            {activity.location}
                                                      </span>
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

                                          <div className="mb-6">
                                                <h3 className="font-medium mb-2">
                                                      Description
                                                </h3>
                                                <p className="text-gray-600">
                                                      {
                                                            selectedActivity.description
                                                      }
                                                </p>
                                          </div>

                                          <button
                                                onClick={handleBooking}
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
}
