import { createContext, useContext, useState } from "react";
import {
      collection,
      query,
      where,
      getDocs,
      updateDoc,
      doc,
      onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "./AuthContext";

const SupervisorContext = createContext();

export const SupervisorProvider = ({ children }) => {
      const { currentUser } = useAuth();
      const [loading, setLoading] = useState(false);
      const [giftOrders, setGiftOrders] = useState([]);

      // Fetch all gift orders
      const fetchGiftOrders = async () => {
            try {
                  setLoading(true);
                  const q = query(collection(db, "giftOrders"));
                  const querySnapshot = await getDocs(q);

                  const orders = [];
                  querySnapshot.forEach((doc) => {
                        orders.push({ id: doc.id, ...doc.data() });
                  });

                  // Sort by status (processing first) and then by creation time
                  const sortedOrders = orders.sort((a, b) => {
                        if (a.status === b.status) {
                              return (
                                    (a.createdAt?.seconds || 0) -
                                    (b.createdAt?.seconds || 0)
                              );
                        }
                        return a.status === "processing" ? -1 : 1;
                  });

                  setGiftOrders(sortedOrders);
            } catch (error) {
                  console.error("Error fetching gift orders:", error);
            } finally {
                  setLoading(false);
            }
      };

      // Real-time updates for gift orders
      const setupGiftOrdersListener = () => {
            const q = query(collection(db, "giftOrders"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                  const orders = [];
                  querySnapshot.forEach((doc) => {
                        orders.push({ id: doc.id, ...doc.data() });
                  });
                  setGiftOrders(orders);
            });
            return unsubscribe;
      };

      // Update order status
      const updateOrderStatus = async (orderId, newStatus) => {
            try {
                  setLoading(true);
                  const orderRef = doc(db, "giftOrders", orderId);
                  await updateDoc(orderRef, {
                        status: newStatus,
                        updatedAt: new Date(),
                  });
                  return { success: true };
            } catch (error) {
                  console.error("Error updating order status:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      return (
            <SupervisorContext.Provider
                  value={{
                        loading,
                        giftOrders,
                        fetchGiftOrders,
                        updateOrderStatus,
                        setupGiftOrdersListener,
                  }}
            >
                  {children}
            </SupervisorContext.Provider>
      );
};

export const useSupervisorContext = () => useContext(SupervisorContext);
