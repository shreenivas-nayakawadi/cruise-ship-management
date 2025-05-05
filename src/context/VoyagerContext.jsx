import { createContext, useContext, useState } from "react";
import {
      doc,
      setDoc,
      collection,
      serverTimestamp,
      updateDoc,
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
      const [foodItems, setFoodItems] = useState([]);

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
                        price: cart.reduce((sum, item) => sum + item.price, 0),
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
                        userEmail: currentUser.email || "",
                        items: cart.map((item) => ({
                              id: item.id, // Include product ID for reference
                              name: item.name,
                              price: item.price,
                              image: item.image || null, // Handle case where image might not exist
                              description: item.description || "", // Include description
                              category: item.category || "General", // Include category
                              quantity: 1, // Default quantity, can be updated if needed
                        })),
                        price: cart.reduce((sum, item) => sum + item.price, 0),
                        status: "processing",
                        deliveryOption,
                        deliveryLocation:
                              deliveryOption === "cabin"
                                    ? `Cabin ${Math.floor(
                                            1000 + Math.random() * 9000
                                      )}`
                                    : "Gift Shop Pickup",
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(), // Track when order was last updated
                  };

                  // Validate cart isn't empty
                  if (cart.length === 0) {
                        throw new Error("Cannot place an empty order");
                  }

                  // Save order to giftOrders collection
                  await setDoc(orderRef, orderData);

                  // Update user's order history
                  await addDoc(
                        collection(db, "users", currentUser.uid, "orders"),
                        {
                              type: "gift",
                              orderId,
                              price: orderData.price,
                              itemCount: cart.length,
                              createdAt: serverTimestamp(),
                        }
                  );

                  return {
                        success: true,
                        orderId,
                        orderData, // Return the complete order data if needed
                  };
            } catch (error) {
                  console.error("Gift order error:", error);
                  return {
                        success: false,
                        error: error.message,
                        errorCode: error.code || "UNKNOWN_ERROR", // Include error code if available
                  };
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

                  const showtime = movie.time;
                  const bookingData = {
                        bookingId,
                        userId: currentUser.uid,
                        movieId: movie.id,
                        movieTitle: movie.title,
                        showtime,
                        seats,
                        price: seats.length * movie.price,
                        theater: "Deck 5 Cinema",
                        status: "confirmed",
                        createdAt: serverTimestamp(),
                  };

                  // Seat availability check
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

                  // Check if enough seats are available
                  const movieRef = doc(db, "movies", movie.id);
                  const movieSnap = await getDoc(movieRef);
                  const movieData = movieSnap.data();
                  const currentAvailableSeats =
                        movieData.availableSeats || movieData.seats;

                  if (seats.length > currentAvailableSeats) {
                        throw new Error("Not enough seats available.");
                  }

                  // Update movie available seats count
                  await updateDoc(movieRef, {
                        availableSeats: currentAvailableSeats - seats.length,
                  });

                  // Save booking
                  await setDoc(bookingRef, bookingData);

                  // Save in user history
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
                        price: service.price,
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

                  if (participants > activity.availableSlots) {
                        throw new Error("Not enough slots available.");
                  }

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
                  const totalPrice = activity.price * participants;

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
                        price: totalPrice,
                        pricePerParticipant: activity.price,
                        createdAt: serverTimestamp(),
                  };

                  // Save booking
                  await setDoc(
                        doc(db, "activityBookings", bookingId),
                        bookingData
                  );

                  // Add reference to user bookings
                  await addDoc(
                        collection(db, "users", currentUser.uid, "bookings"),
                        {
                              type: "activity",
                              bookingId,
                              createdAt: serverTimestamp(),
                        }
                  );

                  // Decrease available slots
                  const activityRef = doc(db, "activities", activity.id);
                  await updateDoc(activityRef, {
                        availableSlots: activity.availableSlots - participants,
                  });

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
                        price: seats * event.price, // dynamically use event.price
                        status: "confirmed",
                        createdAt: serverTimestamp(),
                  };

                  await setDoc(bookingRef, bookingData);

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
            if (!currentUser)
                  return { success: false, error: "No user logged in" };

            try {
                  setLoading(true);

                  // ========== Activity Bookings ==========
                  const activityQuery = query(
                        collection(db, "activityBookings"),
                        where("userId", "==", currentUser.uid)
                  );
                  const activitySnap = await getDocs(activityQuery);
                  const activityBookings = activitySnap.docs.map((doc) => ({
                        id: doc.id,
                        bookingId: doc.data().bookingId,
                        type: "activity",
                        activityId: doc.data().activityId,
                        name: doc.data().activityName,
                        date: doc.data().date,
                        time: doc.data().time,
                        participants: doc.data().participants || 1,
                        location: doc.data().location,
                        price: doc.data().price,
                        status: doc.data().status || "confirmed",
                        createdAt: doc.data().createdAt?.toDate() || null,
                  }));

                  // ========== Spa Bookings ==========
                  const spaQuery = query(
                        collection(db, "spaBookings"),
                        where("userId", "==", currentUser.uid)
                  );
                  const spaSnap = await getDocs(spaQuery);
                  const spaBookings = spaSnap.docs.map((doc) => ({
                        id: doc.id,
                        bookingId: doc.data().bookingId,
                        type: "spa",
                        serviceId: doc.data().serviceId,
                        name: doc.data().serviceName,
                        date: doc.data().date,
                        time: doc.data().time,
                        duration: doc.data().duration,
                        price: doc.data().price,
                        status: doc.data().status || "confirmed",
                        createdAt: doc.data().createdAt?.toDate() || null,
                  }));

                  // ========== Movie Bookings ==========
                  const movieQuery = query(
                        collection(db, "movieBookings"),
                        where("userId", "==", currentUser.uid)
                  );
                  const movieSnap = await getDocs(movieQuery);
                  const movieBookings = movieSnap.docs.map((doc) => ({
                        id: doc.id,
                        bookingId: doc.data().bookingId,
                        type: "movie",
                        movieId: doc.data().movieId,
                        name: doc.data().movieTitle,
                        date: doc.data().showtime?.split(" ")[0], // assuming format: "2025-05-03 18:00"
                        time: doc.data().showtime,
                        seats: doc.data().seats,
                        theater: doc.data().theater,
                        price: doc.data().price,
                        status: doc.data().status || "confirmed",
                        createdAt: doc.data().createdAt?.toDate() || null,
                  }));

                  // ========== Entertainment Bookings ==========
                  const entertainmentQuery = query(
                        collection(db, "entertainmentBookings"),
                        where("userId", "==", currentUser.uid)
                  );
                  const entertainmentSnap = await getDocs(entertainmentQuery);
                  const entertainmentBookings = entertainmentSnap.docs.map(
                        (doc) => ({
                              id: doc.id,
                              bookingId: doc.data().bookingId,
                              type: "entertainment",
                              eventId: doc.data().eventId,
                              name: doc.data().eventTitle,
                              date: doc.data().date,
                              time: doc.data().time,
                              seats: doc.data().seats,
                              section: doc.data().section || "general",
                              price: doc.data().price,
                              status: doc.data().status || "confirmed",
                              createdAt: doc.data().createdAt?.toDate() || null,
                        })
                  );

                  const allBookings = [
                        ...activityBookings,
                        ...spaBookings,
                        ...movieBookings,
                        ...entertainmentBookings,
                  ].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

                  return { success: true, bookings: allBookings };
            } catch (error) {
                  console.error("Error fetching user bookings:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // ==================== GET USER ORDERS ====================
      const getUserOrders = async () => {
            if (!currentUser)
                  return { success: false, error: "No user logged in" };

            try {
                  setLoading(true);

                  // Query foodOrders
                  const foodQuery = query(
                        collection(db, "foodOrders"),
                        where("userId", "==", currentUser.uid)
                  );
                  const foodSnapshot = await getDocs(foodQuery);
                  const foodOrders = foodSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        orderId: doc.data().orderId,
                        type: "food",
                        items:
                              doc.data().items?.map((item) => ({
                                    name: item.name,
                                    price: item.price,
                                    quantity: item.quantity || 1,
                              })) || [],
                        totalPrice: doc.data().price || 0,
                        status: doc.data().status || "preparing",
                        deliveryLocation:
                              doc.data().deliveryLocation || "Unknown",
                        specialInstructions:
                              doc.data().specialInstructions || "",
                        createdAt: doc.data().createdAt?.toDate() || null,
                  }));

                  // Query giftOrders
                  const giftQuery = query(
                        collection(db, "giftOrders"),
                        where("userId", "==", currentUser.uid)
                  );
                  const giftSnapshot = await getDocs(giftQuery);
                  const giftOrders = giftSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        orderId: doc.data().orderId,
                        type: "gift",
                        items:
                              doc.data().items?.map((item) => ({
                                    id: item.id,
                                    name: item.name,
                                    price: item.price,
                                    image: item.image,
                                    description: item.description,
                                    category: item.category,
                                    quantity: item.quantity || 1,
                              })) || [],
                        totalPrice: doc.data().price || 0,
                        status: doc.data().status || "processing",
                        deliveryOption: doc.data().deliveryOption || "cabin",
                        deliveryLocation:
                              doc.data().deliveryLocation || "Unknown",
                        createdAt: doc.data().createdAt?.toDate() || null,
                        updatedAt: doc.data().updatedAt?.toDate() || null,
                  }));

                  const allOrders = [...foodOrders, ...giftOrders].sort(
                        (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
                  );

                  return { success: true, orders: allOrders };
            } catch (error) {
                  console.error("Error fetching user orders:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      //========================= MOVIES =========================
      const [movies, setMovies] = useState([]);

      const fetchMovies = async () => {
            try {
                  setLoading(true);
                  const querySnapshot = await getDocs(collection(db, "movies"));
                  const moviesData = [];
                  querySnapshot.forEach((doc) => {
                        moviesData.push({ id: doc.id, ...doc.data() });
                  });
                  setMovies(moviesData);
            } catch (error) {
                  console.error("Error fetching movies:", error);
            } finally {
                  setLoading(false);
            }
      };

      const getBookedSeats = async (movieId, showtime) => {
            try {
                  const bookingsQuery = query(
                        collection(db, "movieBookings"),
                        where("movieId", "==", movieId),
                        where("showtime", "==", showtime)
                  );
                  const snapshot = await getDocs(bookingsQuery);
                  return snapshot.docs.flatMap((doc) => doc.data().seats);
            } catch (error) {
                  console.error("Error fetching booked seats:", error);
                  return [];
            }
      };

      // ==================== SPA SERVICES ====================
      const [spaServices, setSpaServices] = useState([]);

      const fetchSpaServices = async () => {
            try {
                  setLoading(true);
                  const querySnapshot = await getDocs(
                        collection(db, "spaServices")
                  );
                  const services = [];
                  querySnapshot.forEach((doc) => {
                        services.push({ id: doc.id, ...doc.data() });
                  });
                  setSpaServices(services);
            } catch (error) {
                  console.error("Error fetching spa services:", error);
            } finally {
                  setLoading(false);
            }
      };

      //========================= ACTIVITIES=========================
      const [activities, setActivities] = useState([]);

      // Fetch all activities
      const fetchActivities = async () => {
            try {
                  setLoading(true);
                  const querySnapshot = await getDocs(
                        collection(db, "activities")
                  );
                  const activitiesData = [];
                  querySnapshot.forEach((doc) => {
                        activitiesData.push({ id: doc.id, ...doc.data() });
                  });
                  setActivities(activitiesData);
            } catch (error) {
                  console.error("Error fetching activities:", error);
            } finally {
                  setLoading(false);
            }
      };

      // ==================== EVENTS ====================
      const [events, setEvents] = useState([]);

      // Fetch all events
      const fetchEvents = async () => {
            try {
                  setLoading(true);
                  const querySnapshot = await getDocs(collection(db, "events"));
                  const eventsData = [];
                  querySnapshot.forEach((doc) => {
                        eventsData.push({ id: doc.id, ...doc.data() });
                  });
                  setEvents(eventsData);
            } catch (error) {
                  console.error("Error fetching events:", error);
            } finally {
                  setLoading(false);
            }
      };

      // ==================== GIFTS ====================
      const [products, setProducts] = useState([]);

      // Fetch all gift products
      const fetchProducts = async () => {
            try {
                  setLoading(true);
                  const querySnapshot = await getDocs(
                        collection(db, "giftProducts")
                  );
                  const productsData = [];
                  querySnapshot.forEach((doc) => {
                        productsData.push({ id: doc.id, ...doc.data() });
                  });
                  setProducts(productsData);
            } catch (error) {
                  console.error("Error fetching products:", error);
            } finally {
                  setLoading(false);
            }
      };

      const fetchFoodItems = async () => {
            try {
                  setLoading(true);
                  const querySnapshot = await getDocs(
                        collection(db, "foodItems")
                  );
                  const items = [];
                  querySnapshot.forEach((doc) => {
                        items.push({ id: doc.id, ...doc.data() });
                  });
                  setFoodItems(items);
            } catch (error) {
                  console.error("Error fetching food items:", error);
            } finally {
                  setLoading(false);
            }
      };

      return (
            <VoyagerContext.Provider
                  value={{
                        loading,
                        foodItems,
                        fetchFoodItems,
                        placeFoodOrder,
                        placeGiftOrder,
                        bookMovieTickets,
                        bookSpaAppointment,
                        bookActivity,
                        bookEntertainment,
                        getUserBookings,
                        getUserOrders,
                        fetchMovies,
                        movies,
                        getBookedSeats,
                        spaServices,
                        fetchSpaServices,
                        activities,
                        fetchActivities,
                        events,
                        fetchEvents,
                        products,
                        fetchProducts,
                  }}
            >
                  {children}
            </VoyagerContext.Provider>
      );
};

export const useVoyagerContext = () => useContext(VoyagerContext);
