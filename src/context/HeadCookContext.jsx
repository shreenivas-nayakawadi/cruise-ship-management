import { createContext, useContext, useState } from "react";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  updateDoc,
  doc,
  onSnapshot
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "./AuthContext";

const HeadCookContext = createContext();

export const HeadCookProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [foodOrders, setFoodOrders] = useState([]);

  // Fetch all food orders
  const fetchFoodOrders = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "foodOrders"));
      const querySnapshot = await getDocs(q);
      
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });

      // Sort by status (preparing first) and then by creation time
      const sortedOrders = orders.sort((a, b) => {
        if (a.status === b.status) {
          return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
        }
        return a.status === "preparing" ? -1 : 1;
      });

      setFoodOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching food orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Real-time updates for food orders
  const setupFoodOrdersListener = () => {
    const q = query(collection(db, "foodOrders"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      setFoodOrders(orders);
    });
    return unsubscribe;
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setLoading(true);
      const orderRef = doc(db, "foodOrders", orderId);
      await updateDoc(orderRef, {
        status: newStatus,
        updatedAt: new Date()
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
    <HeadCookContext.Provider
      value={{
        loading,
        foodOrders,
        fetchFoodOrders,
        updateOrderStatus,
        setupFoodOrdersListener
      }}
    >
      {children}
    </HeadCookContext.Provider>
  );
};

export const useHeadCookContext = () => {
  const context = useContext(HeadCookContext);
  if (!context) {
    throw new Error(
      "useHeadCookContext must be used within a HeadCookProvider"
    );
  }
  return context;
};