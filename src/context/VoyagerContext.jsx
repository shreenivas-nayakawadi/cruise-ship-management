import { createContext, useContext, useState } from "react";
import {
      doc,
      setDoc,
      collection,
      serverTimestamp,
      query,
      where,
      getDocs,
      getDoc,
      addDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "./AuthContext";
import { v4 as uuidv4 } from "uuid";

const VoyagerContext = createContext();

export const VoyagerProvider = ({ children }) => {
      const { currentUser } = useAuth();
      const [loading, setLoading] = useState(false);

      // ==================== FOOD ORDER ====================
      const placeFoodOrder = async (cart, specialInstructions = "") => {
            try {
                  setLoading(true);
                  const orderId = uuidv4();
                  const orderRef = doc(db, "foodOrders", orderId);

                  const orderData = {
                        orderId,
                        userId: currentUser.uid,
                        userEmail: currentUser.email,
                        items: cart.map((item) => ({
                              name: item.name,
                              price: item.price,
                              quantity: 1,
                        })),
                        total: cart.reduce((sum, item) => sum + item.price, 0),
                        status: "preparing",
                        deliveryLocation: `Cabin ${Math.floor(
                              1000 + Math.random() * 9000
                        )}`,
                        specialInstructions,
                        createdAt: serverTimestamp(),
                  };

                  await setDoc(orderRef, orderData);

                  // Update user's order history
                  await addDoc(
                        collection(db, "users", currentUser.uid, "orders"),
                        {
                              type: "food",
                              orderId,
                              createdAt: serverTimestamp(),
                        }
                  );

                  return { success: true, orderId };
            } catch (error) {
                  console.error("Food order error:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // ==================== GIFT SHOP ORDER ====================
      const placeGiftOrder = async (cart, deliveryOption = "cabin") => {
            try {
                  setLoading(true);
                  const orderId = uuidv4();
                  const orderRef = doc(db, "giftOrders", orderId);

                  const orderData = {
                        orderId,
                        userId: currentUser.uid,
                        items: cart.map((item) => ({
                              name: item.name,
                              price: item.price,
                              image: item.image,
                        })),
                        total: cart.reduce((sum, item) => sum + item.price, 0),
                        status: "processing",
                        deliveryOption,
                        deliveryLocation:
                              deliveryOption === "cabin"
                                    ? `Cabin ${Math.floor(
                                            1000 + Math.random() * 9000
                                      )}`
                                    : "Gift Shop Pickup",
                        createdAt: serverTimestamp(),
                  };

                  await setDoc(orderRef, orderData);

                  // Update user's order history
                  await addDoc(
                        collection(db, "users", currentUser.uid, "orders"),
                        {
                              type: "gift",
                              orderId,
                              createdAt: serverTimestamp(),
                        }
                  );

                  return { success: true, orderId };
            } catch (error) {
                  console.error("Gift order error:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // ==================== MOVIE BOOKING ====================
      const bookMovieTickets = async (movie, seats) => {
            try {
                  setLoading(true);
                  const bookingId = uuidv4();
                  const bookingRef = doc(db, "movieBookings", bookingId);

                  const showtime = movie.time; // 🔹 extracted here from movie object
                  const bookingData = {
                        bookingId,
                        userId: currentUser.uid,
                        movieId: movie.id,
                        movieTitle: movie.title,
                        showtime,
                        seats,
                        total: seats.length * 8.99,
                        theater: "Deck 5 Cinema",
                        status: "confirmed",
                        createdAt: serverTimestamp(),
                  };

                  // 🔸 Seat availability check
                  const seatsQuery = query(
                        collection(db, "movieBookings"),
                        where("showtime", "==", showtime),
                        where("movieId", "==", movie.id)
                  );

                  const snapshot = await getDocs(seatsQuery);
                  const bookedSeats = snapshot.docs.flatMap(
                        (doc) => doc.data().seats
                  );
                  const alreadyBooked = seats.some((seat) =>
                        bookedSeats.includes(seat)
                  );
                  if (alreadyBooked) {
                        throw new Error(
                              "Some selected seats are already booked."
                        );
                  }

                  // 🔹 Save booking
                  await setDoc(bookingRef, bookingData);

                  // 🔹 Save in user history
                  await addDoc(
                        collection(db, "users", currentUser.uid, "bookings"),
                        {
                              type: "movie",
                              bookingId,
                              createdAt: serverTimestamp(),
                        }
                  );

                  return { success: true, bookingId };
            } catch (error) {
                  console.error("Booking error:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // ==================== SPA BOOKING ====================
      const bookSpaAppointment = async (service, date, time) => {
            try {
                  setLoading(true);
                  const bookingId = uuidv4();
                  const bookingRef = doc(db, "spaBookings", bookingId);

                  // Check for existing appointment
                  const existing = query(
                        collection(db, "spaBookings"),
                        where("date", "==", date),
                        where("time", "==", time),
                        where("serviceName", "==", service.name)
                  );

                  const snapshot = await getDocs(existing);
                  if (!snapshot.empty) {
                        return {
                              success: false,
                              error: "This time slot is already booked for the selected service.",
                        };
                  }

                  const bookingData = {
                        bookingId,
                        userId: currentUser.uid,
                        serviceId: service.id,
                        serviceName: service.name,
                        duration: service.duration,
                        date,
                        time,
                        total: service.price,
                        status: "confirmed",
                        createdAt: serverTimestamp(),
                  };

                  await setDoc(bookingRef, bookingData);

                  await addDoc(
                        collection(db, "users", currentUser.uid, "bookings"),
                        {
                              type: "spa",
                              bookingId,
                              createdAt: serverTimestamp(),
                        }
                  );

                  setLoading(false);

                  return { success: true, bookingId };
            } catch (error) {
                  console.error("Spa booking error:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // ==================== ACTIVITY BOOKING ====================
      const bookActivity = async (activity, participants = 1) => {
            try {
                  setLoading(true);

                  // Check if this user has already booked the activity
                  const bookingsRef = collection(db, "activityBookings");
                  const q = query(
                        bookingsRef,
                        where("userId", "==", currentUser.uid),
                        where("activityId", "==", activity.id)
                  );
                  const snapshot = await getDocs(q);

                  if (!snapshot.empty) {
                        throw new Error("You've already booked this activity.");
                  }

                  const bookingId = uuidv4();
                  const bookingData = {
                        bookingId,
                        userId: currentUser.uid,
                        activityId: activity.id,
                        activityName: activity.name,
                        date: activity.date,
                        time: activity.time,
                        participants,
                        location: activity.location,
                        status: "confirmed",
                        createdAt: serverTimestamp(),
                  };

                  // Save booking to central bookings collection
                  await setDoc(
                        doc(db, "activityBookings", bookingId),
                        bookingData
                  );

                  // Save reference in user's personal bookings
                  await addDoc(
                        collection(db, "users", currentUser.uid, "bookings"),
                        {
                              type: "activity",
                              bookingId,
                              createdAt: serverTimestamp(),
                        }
                  );

                  return { success: true, bookingId };
            } catch (error) {
                  console.error("Activity booking error:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // ==================== ENTERTAINMENT BOOKING ====================
      const bookEntertainment = async (event, seats = 2) => {
            try {
                  setLoading(true);
                  const bookingId = uuidv4();

                  // Check if already booked
                  const q = query(
                        collection(db, "entertainmentBookings"),
                        where("userId", "==", currentUser.uid),
                        where("eventId", "==", event.id)
                  );
                  const existing = await getDocs(q);
                  if (!existing.empty) {
                        throw new Error("You have already booked this event");
                  }

                  const bookingRef = doc(
                        db,
                        "entertainmentBookings",
                        bookingId
                  );

                  const bookingData = {
                        bookingId,
                        userId: currentUser.uid,
                        eventId: event.id,
                        eventTitle: event.title,
                        date: event.date,
                        time: event.time,
                        seats,
                        section: "general",
                        total: seats * 15.99,
                        status: "confirmed",
                        createdAt: serverTimestamp(),
                  };

                  await setDoc(bookingRef, bookingData);

                  // User bookings
                  await addDoc(
                        collection(db, "users", currentUser.uid, "bookings"),
                        {
                              type: "entertainment",
                              bookingId,
                              createdAt: serverTimestamp(),
                        }
                  );

                  return { success: true, bookingId };
            } catch (error) {
                  console.error("Booking error:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // ==================== GET USER BOOKINGS ====================
      const getUserBookings = async () => {
            if (!currentUser) return [];

            try {
                  setLoading(true);

                  // ========== Activity Bookings ==========
                  const activityQuery = query(
                        collection(db, "activityBookings"),
                        where("userId", "==", currentUser.uid)
                  );
                  const activitySnap = await getDocs(activityQuery);
                  // Map through the documents and extract relevant data
                  const activityBookings = activitySnap.docs.map((doc) => {
                        const data = doc.data();
                        return {
                              id: doc.id,
                              type: "Activity",
                              name: data.activityName,
                              date: data.date,
                              time: data.time,
                              status: data.status || "Unknown",
                        };
                  });

                  // ========== Spa Bookings ==========
                  const spaQuery = query(
                        collection(db, "spaBookings"),
                        where("userId", "==", currentUser.uid)
                  );
                  const spaSnap = await getDocs(spaQuery);
                  const spaBookings = spaSnap.docs.map((doc) => {
                        const data = doc.data();
                        return {
                              id: doc.id,
                              type: "Spa",
                              name: data.serviceName,
                              date: data.date,
                              time: data.time,
                              status: data.status || "Unknown",
                        };
                  });

                  // ========== Movie Bookings ==========
                  const movieQuery = query(
                        collection(db, "movieBookings"),
                        where("userId", "==", currentUser.uid)
                  );
                  const movieSnap = await getDocs(movieQuery);
                  const movieBookings = movieSnap.docs.map((doc) => {
                        const data = doc.data();
                        return {
                              id: doc.id,
                              type: "Movie",
                              name: data.movieTitle,
                              date: data.showtime?.split(" ")[0], // assuming format: "2025-05-03 18:00"
                              time: data.showtime?.split(" ")[1],
                              status: data.status || "Unknown",
                        };
                  });

                  // ========== Entertainment Bookings ==========
                  const entertainmentQuery = query(
                        collection(db, "entertainmentBookings"),
                        where("userId", "==", currentUser.uid)
                  );
                  const entertainmentSnap = await getDocs(entertainmentQuery);
                  const entertainmentBookings = entertainmentSnap.docs.map(
                        (doc) => {
                              const data = doc.data();
                              return {
                                    id: doc.id,
                                    type: "Entertainment",
                                    name: data.eventTitle,
                                    date: data.date,
                                    time: data.time,
                                    status: data.status || "Unknown",
                              };
                        }
                  );

                  const allBookings = [
                        ...activityBookings,
                        ...spaBookings,
                        ...movieBookings,
                        ...entertainmentBookings,
                  ];

                  console.log("🎟 Direct Bookings:", allBookings);
                  return allBookings;
            } catch (error) {
                  console.error("Error fetching direct bookings:", error);
                  return [];
            } finally {
                  setLoading(false);
            }
      };

      // ==================== GET USER ORDERS ====================
      const getUserOrders = async () => {
            try {
                  setLoading(true);

                  // Query foodOrders
                  const foodQuery = query(
                        collection(db, "foodOrders"),
                        where("userId", "==", currentUser.uid)
                  );
                  const foodSnapshot = await getDocs(foodQuery);
                  const foodOrders = foodSnapshot.docs.map((doc) => {
                        const data = doc.data();
                        return {
                              id: doc.id,
                              type: "Food",
                              items: data.items?.map((item) => item.name) || [],
                              status: data.status || "Unknown",
                              time:
                                    data.createdAt
                                          ?.toDate?.()
                                          .toLocaleString() || "Unknown",
                        };
                  });

                  // Query giftOrders
                  const giftQuery = query(
                        collection(db, "giftOrders"),
                        where("userId", "==", currentUser.uid)
                  );
                  const giftSnapshot = await getDocs(giftQuery);
                  const giftOrders = giftSnapshot.docs.map((doc) => {
                        const data = doc.data();
                        return {
                              id: doc.id,
                              type: "Gift",
                              items: data.items?.map((item) => item.name) || [],
                              status: data.status || "Unknown",
                              time:
                                    data.createdAt
                                          ?.toDate?.()
                                          .toLocaleString() || "Unknown",
                        };
                  });

                  const allOrders = [...foodOrders, ...giftOrders];
                  return allOrders;
            } catch (error) {
                  console.error("Error fetching direct orders:", error);
                  return [];
            } finally {
                  setLoading(false);
            }
      };

      return (
            <VoyagerContext.Provider
                  value={{
                        loading,
                        placeFoodOrder,
                        placeGiftOrder,
                        bookMovieTickets,
                        bookSpaAppointment,
                        bookActivity,
                        bookEntertainment,
                        getUserBookings,
                        getUserOrders,
                  }}
            >
                  {children}
            </VoyagerContext.Provider>
      );
};

export const useVoyagerContext = () => {
      const context = useContext(VoyagerContext);
      if (!context) {
            throw new Error(
                  "useVoyagerContext must be used within a VoyagerProvider"
            );
      }
      return context;
};
