import { createContext, useContext, useState } from "react";
import {
      collection,
      query,
      getDocs,
      updateDoc,
      doc,
      onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "./AuthContext";

const ManagerContext = createContext();

export const ManagerProvider = ({ children }) => {
      const [loading, setLoading] = useState(false);
      const [bookings, setBookings] = useState({
            movies: [],
            spa: [],
            activities: [],
            events: [],
      });

      // Common function to fetch bookings by type
      const fetchBookingsByType = async (type) => {
            try {
                  setLoading(true);
                  let collectionName;
                  switch (type) {
                        case "movies":
                              collectionName = "movieBookings";
                              break;
                        case "spa":
                              collectionName = "spaBookings";
                              break;
                        case "activities":
                              collectionName = "activityBookings";
                              break;
                        case "events":
                              collectionName = "entertainmentBookings";
                              break;
                        default:
                              throw new Error("Invalid booking type");
                  }

                  const q = query(collection(db, collectionName));
                  const snapshot = await getDocs(q);
                  const bookingsData = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        type,
                        ...doc.data(),
                  }));

                  setBookings((prev) => ({ ...prev, [type]: bookingsData }));
            } catch (error) {
                  console.error(`Error fetching ${type} bookings:`, error);
            } finally {
                  setLoading(false);
            }
      };

      // Common function to update booking status
      const updateBookingStatus = async (type, bookingId, newStatus) => {
            try {
                  setLoading(true);
                  let collectionName;
                  switch (type) {
                        case "movies":
                              collectionName = "movieBookings";
                              break;
                        case "spa":
                              collectionName = "spaBookings";
                              break;
                        case "activities":
                              collectionName = "activityBookings";
                              break;
                        case "events":
                              collectionName = "entertainmentBookings";
                              break;
                        default:
                              throw new Error("Invalid booking type");
                  }

                  const bookingRef = doc(db, collectionName, bookingId);
                  await updateDoc(bookingRef, {
                        status: newStatus,
                        updatedAt: new Date(),
                  });
                  return { success: true };
            } catch (error) {
                  console.error("Error updating booking status:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      return (
            <ManagerContext.Provider
                  value={{
                        loading,
                        bookings,
                        fetchBookingsByType,
                        updateBookingStatus,
                  }}
            >
                  {children}
            </ManagerContext.Provider>
      );
};

export const useManagerContext = () => {
      const context = useContext(ManagerContext);
      if (!context) {
            throw new Error(
                  "useManagerContext must be used within a ManagerProvider"
            );
      }
      return context;
};
