// import { useState, useEffect } from "react";
// import { FiMusic, FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
// import { useVoyagerContext } from "../../context/VoyagerContext";
// import VoyagerNavbar from "./VoyagerNavbar";

// const Entertainment = () => {
//       const [eventItems, setEventItems] = useState([]);
//       const [selectedEvent, setSelectedEvent] = useState(null);
//       const [bookingComplete, setBookingComplete] = useState(false);

//       const { loading, bookEntertainment, events, fetchEvents } =
//             useVoyagerContext();

//       const handleReserve = async () => {
//             const result = await bookEntertainment(selectedEvent);

//             if (result.success) {
//                   console.log("Booking confirmed:", result.bookingId);
//                   setBookingComplete(true);
//                   setTimeout(() => setBookingComplete(false), 3000);
//             } else {
//                   alert("Booking failed: " + result.error);
//             }
//       };

//       useEffect(() => {
//             setEventItems([...events]);
//       }, [events]);

//       useEffect(() => {
//             fetchEvents();
//       }, []);

//       return (
//             <>
//                   <VoyagerNavbar />
//                   <div className="max-w-4xl mx-auto p-6">
//                         <div className="flex items-center mb-6">
//                               <FiMusic className="text-2xl text-blue-600 mr-2" />
//                               <h1 className="text-2xl font-bold text-gray-800">
//                                     Entertainment
//                               </h1>
//                         </div>

//                         {!selectedEvent ? (
//                               <div className="space-y-4">
//                                     {eventItems.map((event) => (
//                                           <div
//                                                 key={event.id}
//                                                 onClick={() =>
//                                                       setSelectedEvent(event)
//                                                 }
//                                                 className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-blue-300 cursor-pointer"
//                                           >
//                                                 <div className="flex justify-between">
//                                                       <h3 className="font-medium text-gray-800">
//                                                             {event.title}
//                                                       </h3>
//                                                       <span className="text-sm text-gray-500">
//                                                             {event.date}
//                                                       </span>
//                                                 </div>
//                                                 <div className="text-sm text-gray-600 mt-1">
//                                                       {event.performer}
//                                                 </div>
//                                                 <div className="flex items-center mt-2 text-sm text-gray-600">
//                                                       <FiClock className="mr-1" />
//                                                       <span>{event.time}</span>
//                                                       <span className="mx-2">
//                                                             •
//                                                       </span>
//                                                       <FiMapPin className="mr-1" />
//                                                       <span>
//                                                             {event.location}
//                                                       </span>
//                                                 </div>
//                                           </div>
//                                     ))}
//                               </div>
//                         ) : (
//                               <div>
//                                     <div className="flex justify-between items-center mb-6">
//                                           <h2 className="text-xl font-bold text-gray-800">
//                                                 {selectedEvent.title}
//                                           </h2>
//                                           <button
//                                                 onClick={() =>
//                                                       setSelectedEvent(null)
//                                                 }
//                                                 className="text-sm text-blue-600 hover:underline"
//                                           >
//                                                 Back to events
//                                           </button>
//                                     </div>

//                                     <div className="bg-white rounded-lg shadow-sm p-6">
//                                           <div className="mb-4">
//                                                 <h3 className="font-medium">
//                                                       Performer
//                                                 </h3>
//                                                 <p className="text-gray-600">
//                                                       {selectedEvent.performer}
//                                                 </p>
//                                           </div>

//                                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                                                 <div className="flex items-center">
//                                                       <FiCalendar className="text-gray-500 mr-2" />
//                                                       <span>
//                                                             {selectedEvent.date}
//                                                       </span>
//                                                 </div>
//                                                 <div className="flex items-center">
//                                                       <FiClock className="text-gray-500 mr-2" />
//                                                       <span>
//                                                             {selectedEvent.time}
//                                                       </span>
//                                                 </div>
//                                                 <div className="flex items-center">
//                                                       <FiMapPin className="text-gray-500 mr-2" />
//                                                       <span>
//                                                             {
//                                                                   selectedEvent.location
//                                                             }
//                                                       </span>
//                                                 </div>
//                                           </div>

//                                           <div className="mb-6">
//                                                 <h3 className="font-medium mb-2">
//                                                       Description
//                                                 </h3>
//                                                 <p className="text-gray-600">
//                                                       {
//                                                             selectedEvent.description
//                                                       }
//                                                 </p>
//                                           </div>

//                                           <button
//                                                 onClick={handleReserve}
//                                                 disabled={loading}
//                                                 className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm ${
//                                                       loading
//                                                             ? "opacity-50"
//                                                             : ""
//                                                 }`}
//                                           >
//                                                 Reserve Seats
//                                           </button>
//                                     </div>
//                               </div>
//                         )}
//                   </div>
//             </>
//       );
// };

// export default Entertainment;

import { useState, useEffect } from "react";
import { FiMusic, FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import { useVoyagerContext } from "../../context/VoyagerContext";
import VoyagerNavbar from "./VoyagerNavbar";

const Entertainment = () => {
      const [eventItems, setEventItems] = useState([]);
      const [selectedEvent, setSelectedEvent] = useState(null);
      const [bookingComplete, setBookingComplete] = useState(false);
      const [seats, setSeats] = useState(2);

      const { loading, bookEntertainment, events, fetchEvents } =
            useVoyagerContext();

      const handleReserve = async () => {
            console.log(selectedEvent, seats)
            const result = await bookEntertainment(selectedEvent, seats);
            if (result.success) {
                  console.log("Booking confirmed:", result.bookingId);
                  setBookingComplete(true);
                  setSelectedEvent(null)
                  setTimeout(() => setBookingComplete(false), 3000);
            } else {
                  alert("Booking failed: " + result.error);
            }
      };

      useEffect(() => {
            setEventItems([...events]);
      }, [events]);

      useEffect(() => {
            fetchEvents();
      }, []);

      return (
            <>
                  <VoyagerNavbar />
                  <div className="max-w-4xl mx-auto p-6">
                        <div className="flex items-center mb-6">
                              <FiMusic className="text-2xl text-blue-600 mr-2" />
                              <h1 className="text-2xl font-bold text-gray-800">
                                    Entertainment
                              </h1>
                        </div>

                        {!selectedEvent ? (
                              <div className="space-y-4">
                                    {eventItems.map((event) => (
                                          <div
                                                key={event.id}
                                                onClick={() =>
                                                      setSelectedEvent(event)
                                                }
                                                className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-blue-300 cursor-pointer"
                                          >
                                                <div className="flex justify-between items-center">
                                                      <h3 className="font-medium text-gray-800">
                                                            {event.title}
                                                      </h3>
                                                      <span className="text-sm text-gray-500">
                                                            {event.date}
                                                      </span>
                                                </div>
                                                <div className="text-sm text-gray-600 mt-1">
                                                      {event.performer}
                                                </div>
                                                <div className="flex items-center mt-2 text-sm text-gray-600">
                                                      <FiClock className="mr-1" />
                                                      <span>{event.time}</span>
                                                      <span className="mx-2">
                                                            •
                                                      </span>
                                                      <FiMapPin className="mr-1" />
                                                      <span>
                                                            {event.location}
                                                      </span>
                                                </div>
                                                <div className="flex items-center mt-2 text-sm text-green-600 font-semibold">
                                                      <BiRupee className="mr-1" />
                                                      <span>
                                                            {event.price} per
                                                            seat
                                                      </span>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        ) : (
                              <div>
                                    <div className="flex justify-between items-center mb-6">
                                          <h2 className="text-xl font-bold text-gray-800">
                                                {selectedEvent.title}
                                          </h2>
                                          <button
                                                onClick={() =>
                                                      setSelectedEvent(null)
                                                }
                                                className="text-sm text-blue-600 hover:underline"
                                          >
                                                Back to events
                                          </button>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-sm p-6">
                                          <div className="mb-4">
                                                <h3 className="font-medium">
                                                      Performer
                                                </h3>
                                                <p className="text-gray-600">
                                                      {selectedEvent.performer}
                                                </p>
                                          </div>

                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                <div className="flex items-center">
                                                      <FiCalendar className="text-gray-500 mr-2" />
                                                      <span>
                                                            {selectedEvent.date}
                                                      </span>
                                                </div>
                                                <div className="flex items-center">
                                                      <FiClock className="text-gray-500 mr-2" />
                                                      <span>
                                                            {selectedEvent.time}
                                                      </span>
                                                </div>
                                                <div className="flex items-center">
                                                      <FiMapPin className="text-gray-500 mr-2" />
                                                      <span>
                                                            {
                                                                  selectedEvent.location
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
                                                            selectedEvent.description
                                                      }
                                                </p>
                                          </div>

                                          <div className="mb-4">
                                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                                      Number of Seats
                                                </label>
                                                <input
                                                      type="number"
                                                      value={seats}
                                                      min={1}
                                                      max={
                                                            selectedEvent.maxSeats
                                                      }
                                                      onChange={(e) =>
                                                            setSeats(
                                                                  Number(
                                                                        e.target
                                                                              .value
                                                                  )
                                                            )
                                                      }
                                                      className="w-24 border border-gray-300 rounded px-2 py-1 text-sm"
                                                />
                                          </div>

                                          <div className="flex items-center mb-6 text-sm text-gray-700 font-medium">
                                                <BiRupee className="text-xl mr-1 text-green-600" />
                                                Total: ₹
                                                {selectedEvent.price * seats}
                                          </div>

                                          <button
                                                onClick={handleReserve}
                                                disabled={loading}
                                                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm ${
                                                      loading
                                                            ? "opacity-50"
                                                            : ""
                                                }`}
                                          >
                                                Reserve Seats
                                          </button>
                                    </div>
                              </div>
                        )}
                  </div>
            </>
      );
};

export default Entertainment;
