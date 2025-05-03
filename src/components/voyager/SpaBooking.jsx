import { useState, useEffect } from "react";
import { FiSmile, FiCalendar, FiClock, FiCheck } from "react-icons/fi";
import { useVoyagerContext } from "../../context/VoyagerContext";
import VoyagerNavbar from "./VoyagerNavbar";

const SpaBooking = () => {
      const [services, setServices] = useState([]);
      const [selectedService, setSelectedService] = useState(null);
      const [selectedDate, setSelectedDate] = useState("");
      const [selectedTime, setSelectedTime] = useState("");
      const [bookingComplete, setBookingComplete] = useState(false);

      const { bookSpaAppointment, loading, spaServices, fetchSpaServices } =
            useVoyagerContext();

      const availableTimes = ["09:00", "11:00", "13:00", "15:00", "17:00"];

      const bookAppointment = async () => {
            const result = await bookSpaAppointment(
                  selectedService,
                  selectedDate,
                  selectedTime
            );
            if (result.success) {
                  console.log("Appointment booked:", result.bookingId);
                  setBookingComplete(true);
                  setTimeout(() => setBookingComplete(false), 3000);
            } else {
                  alert("Booking failed: " + result.error);
            }
      };

      useEffect(() => {
            setServices([...spaServices]);
      }, [spaServices]);

      useEffect(() => {
            fetchSpaServices();
      }, []);

      return (
            <>
                  <VoyagerNavbar />
                  <div className="max-w-4xl mx-auto p-6">
                        <div className="flex items-center mb-6">
                              <FiSmile className="text-2xl text-blue-600 mr-2" />
                              <h1 className="text-2xl font-bold text-gray-800">
                                    Spa & Wellness Center
                              </h1>
                        </div>

                        {bookingComplete && (
                              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                                    <FiCheck className="mr-2" />
                                    Your spa appointment has been confirmed!
                              </div>
                        )}

                        {!selectedService ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {services.map((service) => (
                                          <div
                                                key={service.id}
                                                onClick={() =>
                                                      setSelectedService(
                                                            service
                                                      )
                                                }
                                                className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-blue-300 cursor-pointer"
                                          >
                                                <h3 className="font-medium text-gray-800">
                                                      {service.name}
                                                </h3>
                                                <div className="flex justify-between mt-2 text-sm text-gray-600">
                                                      <span>
                                                            {service.duration}
                                                      </span>
                                                      <span className="font-medium">
                                                            ${service.price}
                                                      </span>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        ) : (
                              <div>
                                    <div className="flex justify-between items-center mb-6">
                                          <h2 className="text-xl font-bold text-gray-800">
                                                {selectedService.name}
                                          </h2>
                                          <button
                                                onClick={() =>
                                                      setSelectedService(null)
                                                }
                                                className="text-sm text-blue-600 hover:underline"
                                          >
                                                Back to services
                                          </button>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            <FiCalendar className="inline mr-1" />
                                                            Select Date
                                                      </label>
                                                      <input
                                                            type="date"
                                                            min={
                                                                  new Date()
                                                                        .toISOString()
                                                                        .split(
                                                                              "T"
                                                                        )[0]
                                                            }
                                                            value={selectedDate}
                                                            onChange={(e) =>
                                                                  setSelectedDate(
                                                                        e.target
                                                                              .value
                                                                  )
                                                            }
                                                            className="w-full p-2 border border-gray-300 rounded"
                                                      />
                                                </div>

                                                <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            <FiClock className="inline mr-1" />
                                                            Select Time
                                                      </label>
                                                      <select
                                                            value={selectedTime}
                                                            onChange={(e) =>
                                                                  setSelectedTime(
                                                                        e.target
                                                                              .value
                                                                  )
                                                            }
                                                            className="w-full p-2 border border-gray-300 rounded"
                                                            disabled={
                                                                  !selectedDate
                                                            }
                                                      >
                                                            <option value="">
                                                                  Select time
                                                            </option>
                                                            {availableTimes.map(
                                                                  (time) => (
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
                                          </div>
                                    </div>

                                    {selectedDate && selectedTime && (
                                          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                                                <div className="mb-4">
                                                      <h3 className="font-medium">
                                                            Appointment Summary
                                                      </h3>
                                                      <div className="mt-2 text-sm text-gray-600">
                                                            <div>
                                                                  {
                                                                        selectedService.name
                                                                  }{" "}
                                                                  -{" "}
                                                                  {
                                                                        selectedService.duration
                                                                  }
                                                            </div>
                                                            <div>
                                                                  {selectedDate}{" "}
                                                                  at{" "}
                                                                  {selectedTime}
                                                            </div>
                                                            <div className="mt-2 font-bold">
                                                                  Total: $
                                                                  {
                                                                        selectedService.price
                                                                  }
                                                            </div>
                                                      </div>
                                                </div>
                                                <button
                                                      onClick={bookAppointment}
                                                      disabled={loading}
                                                      className={`w-full ${
                                                            loading
                                                                  ? "bg-gray-400"
                                                                  : "bg-green-600 hover:bg-green-700"
                                                      } text-white py-2 px-4 rounded text-sm ${
                                                            loading
                                                                  ? "cursor-not-allowed"
                                                                  : "cursor-pointer"
                                                      }`}
                                                >
                                                      Confirm Appointment
                                                </button>
                                          </div>
                                    )}
                              </div>
                        )}
                  </div>
            </>
      );
};

export default SpaBooking;
