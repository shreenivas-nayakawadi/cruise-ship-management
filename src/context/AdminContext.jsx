import { createContext, useContext, useState, useEffect } from "react";
import {
      collection,
      doc,
      setDoc,
      getDocs,
      deleteDoc,
      updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/config";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
      const [loading, setLoading] = useState(true);
      const [foodItems, setFoodItems] = useState([]);

      //========================= FOOD ITEMS =========================
      // Fetch all food items
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

      // Add new food item
      const addFoodItem = async (item) => {
            try {
                  setLoading(true);
                  const newItemRef = doc(collection(db, "foodItems"));
                  await setDoc(newItemRef, {
                        name: item.name,
                        category: item.category,
                        price: item.price,
                        createdAt: new Date().toISOString(),
                  });
                  await fetchFoodItems(); // Refresh the list
                  return { success: true };
            } catch (error) {
                  console.error("Error adding food item:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Update food item
      const updateFoodItem = async (id, updatedData) => {
            try {
                  setLoading(true);
                  const itemRef = doc(db, "foodItems", id);
                  await updateDoc(itemRef, updatedData);
                  await fetchFoodItems(); // Refresh the list
                  return { success: true };
            } catch (error) {
                  console.error("Error updating food item:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Delete food item
      const deleteFoodItem = async (id) => {
            try {
                  setLoading(true);
                  await deleteDoc(doc(db, "foodItems", id));
                  await fetchFoodItems(); // Refresh the list
                  return { success: true };
            } catch (error) {
                  console.error("Error deleting food item:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchFoodItems();
      }, []);

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

      const addMovie = async (movie) => {
            try {
                  setLoading(true);
                  const newMovieRef = doc(collection(db, "movies"));
                  await setDoc(newMovieRef, {
                        title: movie.title,
                        time: movie.time,
                        seats: movie.seats,
                        availableSeats: movie.seats,
                        createdAt: new Date().toISOString(),
                  });
                  await fetchMovies();
                  return { success: true };
            } catch (error) {
                  console.error("Error adding movie:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      const updateMovie = async (id, updatedData) => {
            try {
                  setLoading(true);
                  await updateDoc(doc(db, "movies", id), updatedData);
                  await fetchMovies();
                  return { success: true };
            } catch (error) {
                  console.error("Error updating movie:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      const deleteMovie = async (id) => {
            try {
                  setLoading(true);
                  await deleteDoc(doc(db, "movies", id));
                  await fetchMovies();
                  return { success: true };
            } catch (error) {
                  console.error("Error deleting movie:", error);
                  return { success: false, error: error.message };
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

      //========================= SPA SERVICES =========================
      const [spaServices, setSpaServices] = useState([]);

      // Fetch all spa services
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

      // Add new spa service
      const addSpaService = async (service) => {
            try {
                  setLoading(true);
                  const newServiceRef = doc(collection(db, "spaServices"));
                  await setDoc(newServiceRef, {
                        name: service.name,
                        duration: service.duration,
                        price: service.price,
                        createdAt: new Date().toISOString(),
                  });
                  await fetchSpaServices(); // Refresh the list
                  return { success: true };
            } catch (error) {
                  console.error("Error adding spa service:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Update spa service
      const updateSpaService = async (id, updatedData) => {
            try {
                  setLoading(true);
                  const serviceRef = doc(db, "spaServices", id);
                  await updateDoc(serviceRef, updatedData);
                  await fetchSpaServices(); // Refresh the list
                  return { success: true };
            } catch (error) {
                  console.error("Error updating spa service:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Delete spa service
      const deleteSpaService = async (id) => {
            try {
                  setLoading(true);
                  await deleteDoc(doc(db, "spaServices", id));
                  await fetchSpaServices(); // Refresh the list
                  return { success: true };
            } catch (error) {
                  console.error("Error deleting spa service:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchSpaServices();
      }, []);

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

      // Add new activity
      const addActivity = async (activity) => {
            try {
                  setLoading(true);
                  const newActivityRef = doc(collection(db, "activities"));
                  await setDoc(newActivityRef, {
                        name: activity.name,
                        time: activity.time,
                        location: activity.location,
                        date: activity.date,
                        description: activity.description,
                        createdAt: new Date().toISOString(),
                  });
                  await fetchActivities();
                  return { success: true };
            } catch (error) {
                  console.error("Error adding activity:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Update activity
      const updateActivity = async (id, updatedData) => {
            try {
                  setLoading(true);
                  const activityRef = doc(db, "activities", id);
                  await updateDoc(activityRef, updatedData);
                  await fetchActivities();
                  return { success: true };
            } catch (error) {
                  console.error("Error updating activity:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Delete activity
      const deleteActivity = async (id) => {
            try {
                  setLoading(true);
                  await deleteDoc(doc(db, "activities", id));
                  await fetchActivities();
                  return { success: true };
            } catch (error) {
                  console.error("Error deleting activity:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchActivities();
      }, []);

      //=========================EVENTS=========================
      // Add to your AdminContext.jsx
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

      // Add new event
      const addEvent = async (event) => {
            try {
                  setLoading(true);
                  const newEventRef = doc(collection(db, "events"));
                  await setDoc(newEventRef, {
                        title: event.title,
                        performer: event.performer,
                        time: event.time,
                        location: event.location,
                        date: event.date,
                        description: event.description,
                        createdAt: new Date().toISOString(),
                  });
                  await fetchEvents();
                  return { success: true };
            } catch (error) {
                  console.error("Error adding event:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Update event
      const updateEvent = async (id, updatedData) => {
            try {
                  setLoading(true);
                  const eventRef = doc(db, "events", id);
                  await updateDoc(eventRef, updatedData);
                  await fetchEvents();
                  return { success: true };
            } catch (error) {
                  console.error("Error updating event:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Delete event
      const deleteEvent = async (id) => {
            try {
                  setLoading(true);
                  await deleteDoc(doc(db, "events", id));
                  await fetchEvents();
                  return { success: true };
            } catch (error) {
                  console.error("Error deleting event:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Add to your useEffect to fetch events on mount
      useEffect(() => {
            fetchEvents();
      }, []);

      //===========================GIFTS===========================

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

      // Add new gift product
      const addProduct = async (productData) => {
            try {
                  setLoading(true);

                  const newProductRef = doc(collection(db, "giftProducts"));
                  await setDoc(newProductRef, {
                        name: productData.name,
                        price: productData.price,
                        description: productData.description || "",
                        category: productData.category || "General",
                        createdAt: new Date().toISOString(),
                  });

                  await fetchProducts();
                  return { success: true };
            } catch (error) {
                  console.error("Error adding product:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Update gift product
      const updateProduct = async (id, productData) => {
            try {
                  setLoading(true);

                  const updateData = {
                        name: productData.name,
                        price: productData.price,
                        description: productData.description || "",
                        category: productData.category || "General",
                  };

                  const productRef = doc(db, "giftProducts", id);
                  await updateDoc(productRef, updateData);

                  await fetchProducts();
                  return { success: true };
            } catch (error) {
                  console.error("Error updating product:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Delete gift product
      const deleteProduct = async (id) => {
            try {
                  setLoading(true);
                  await deleteDoc(doc(db, "giftProducts", id));
                  await fetchProducts();
                  return { success: true };
            } catch (error) {
                  console.error("Error deleting product:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Add to your useEffect to fetch products on mount
      useEffect(() => {
            fetchProducts();
      }, []);

      const value = {
            loading,
            foodItems,
            addFoodItem,
            updateFoodItem,
            deleteFoodItem,
            fetchFoodItems,
            movies,
            fetchMovies,
            addMovie,
            updateMovie,
            deleteMovie,
            getBookedSeats,
            spaServices,
            fetchSpaServices,
            addSpaService,
            updateSpaService,
            deleteSpaService,
            activities,
            fetchActivities,
            addActivity,
            updateActivity,
            deleteActivity,
            events,
            fetchEvents,
            addEvent,
            updateEvent,
            deleteEvent,
            products,
            fetchProducts,
            addProduct,
            updateProduct,
            deleteProduct,
      };

      return (
            <AdminContext.Provider value={value}>
                  {children}
            </AdminContext.Provider>
      );
};

export const useAdminContext = () => useContext(AdminContext);
