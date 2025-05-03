import { useState } from "react";
import { FiFilm, FiClock, FiCheck } from "react-icons/fi";
import { useVoyagerContext } from "../../context/VoyagerContext";
import VoyagerNavbar from "./VoyagerNavbar";

export default function MovieBooking() {
      const [movies] = useState([
            { id: 1, title: "Ocean Adventure", time: "18:00", seats: 45 },
            {
                  id: 2,
                  title: "Pirates of the Caribbean",
                  time: "20:30",
                  seats: 32,
            },
            { id: 3, title: "The Titanic Story", time: "22:00", seats: 28 },
      ]);
      const [selectedMovie, setSelectedMovie] = useState(null);
      const [selectedSeats, setSelectedSeats] = useState([]);
      const [bookingComplete, setBookingComplete] = useState(false);

      const { bookMovieTickets, loading } = useVoyagerContext();

      const toggleSeat = (seatNumber) => {
            if (selectedSeats.includes(seatNumber)) {
                  setSelectedSeats(
                        selectedSeats.filter((s) => s !== seatNumber)
                  );
            } else {
                  setSelectedSeats([...selectedSeats, seatNumber]);
            }
      };

      const bookTickets = async () => {
            const result = await bookMovieTickets(selectedMovie, selectedSeats); // optionally use movie.time if needed separately
            if (result.success) {
                  console.log("Movie booking confirmed:", result.bookingId);
                  setBookingComplete(true);
                  setSelectedSeats([]);
                  setSelectedMovie(null);
                  setTimeout(() => setBookingComplete(false), 3000);
            } else {
                  alert("Booking failed: " + result.error);
            }
      };

      return (
            <>
                  <VoyagerNavbar />
                  <div className="max-w-4xl mx-auto p-6">
                        <div className="flex items-center mb-6">
                              <FiFilm className="text-2xl text-blue-600 mr-2" />
                              <h1 className="text-2xl font-bold text-gray-800">
                                    Movie Theater Booking
                              </h1>
                        </div>

                        {bookingComplete && (
                              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                                    <FiCheck className="mr-2" />
                                    Your tickets have been booked! Confirmation
                                    sent to your cabin.
                              </div>
                        )}

                        {!selectedMovie ? (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {movies.map((movie) => (
                                          <div
                                                key={movie.id}
                                                onClick={() =>
                                                      setSelectedMovie(movie)
                                                }
                                                className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-blue-300 cursor-pointer"
                                          >
                                                <h3 className="font-medium text-gray-800">
                                                      {movie.title}
                                                </h3>
                                                <div className="flex items-center mt-2 text-sm text-gray-600">
                                                      <FiClock className="mr-1" />
                                                      <span>{movie.time}</span>
                                                </div>
                                                <div className="mt-2 text-sm">
                                                      <span className="text-gray-600">
                                                            Available seats:{" "}
                                                      </span>
                                                      <span className="font-medium">
                                                            {movie.seats}
                                                      </span>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        ) : (
                              <div>
                                    <div className="flex justify-between items-center mb-6">
                                          <h2 className="text-xl font-bold text-gray-800">
                                                {selectedMovie.title} -{" "}
                                                {selectedMovie.time}
                                          </h2>
                                          <button
                                                onClick={() =>
                                                      setSelectedMovie(null)
                                                }
                                                className="text-sm text-blue-600 hover:underline"
                                          >
                                                Back to movies
                                          </button>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                          <h3 className="font-medium mb-4">
                                                Select Seats
                                          </h3>
                                          <div className="grid grid-cols-10 gap-2">
                                                {Array.from(
                                                      { length: 50 },
                                                      (_, i) => i + 1
                                                ).map((seat) => (
                                                      <button
                                                            key={seat}
                                                            onClick={() =>
                                                                  toggleSeat(
                                                                        seat
                                                                  )
                                                            }
                                                            disabled={
                                                                  seat >
                                                                  selectedMovie.seats
                                                            }
                                                            className={`w-8 h-8 rounded flex items-center justify-center text-sm
                    ${
                          selectedSeats.includes(seat)
                                ? "bg-blue-600 text-white"
                                : seat > selectedMovie.seats
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-gray-200"
                    }`}
                                                      >
                                                            {seat}
                                                      </button>
                                                ))}
                                          </div>
                                    </div>

                                    {selectedSeats.length > 0 && (
                                          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                                                <div className="flex justify-between items-center mb-4">
                                                      <h3 className="font-medium">
                                                            Selected Seats:{" "}
                                                            {selectedSeats.join(
                                                                  ", "
                                                            )}
                                                      </h3>
                                                      <span className="font-bold">
                                                            Total: $
                                                            {(
                                                                  selectedSeats.length *
                                                                  8.99
                                                            ).toFixed(2)}
                                                      </span>
                                                </div>
                                                <button
                                                      onClick={bookTickets}
                                                      disabled={loading}
                                                      className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm ${
                                                            loading
                                                                  ? "opacity-50 cursor-not-allowed"
                                                                  : ""
                                                      }`}
                                                >
                                                      Confirm Booking
                                                </button>
                                          </div>
                                    )}
                              </div>
                        )}
                  </div>
            </>
      );
}
