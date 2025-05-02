import { createContext, useContext, useState, useEffect } from "react";
import {
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
      onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
      const [currentUser, setCurrentUser] = useState(null);
      const [loading, setLoading] = useState(true);

      // Set up auth state listener
      useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                  if (user) {
                        // Get user role from Firestore
                        const userDoc = await getDoc(
                              doc(db, "users", user.uid)
                        );
                        const userData = userDoc.data();

                        setCurrentUser({
                              uid: user.uid,
                              email: user.email,
                              role: userData?.role || "voyager",
                        });
                  } else {
                        setCurrentUser(null);
                  }
                  setLoading(false);
            });

            return unsubscribe;
      }, []);

      // Register new user with role
      const register = async (email, password, role) => {
            try {
                  const userCredential = await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                  );
                  const user = userCredential.user;

                  await setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        email: user.email,
                        role: role,
                        createdAt: new Date(),
                        lastLogin: null,
                  });

                  return {
                        uid: user.uid,
                        email: user.email,
                        role: role,
                  };
            } catch (error) {
                  throw handleAuthError(error);
            }
      };

      // Login existing user
      const login = async (email, password) => {
            try {
                  const userCredential = await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                  );
                  const user = userCredential.user;

                  await setDoc(
                        doc(db, "users", user.uid),
                        { lastLogin: new Date() },
                        { merge: true }
                  );

                  const userDoc = await getDoc(doc(db, "users", user.uid));
                  const userData = userDoc.data();

                  return {
                        uid: user.uid,
                        email: user.email,
                        role: userData?.role || "voyager",
                  };
            } catch (error) {
                  throw handleAuthError(error);
            }
      };

      // Logout current user
      const logout = async () => {
            try {
                  await signOut(auth);
            } catch (error) {
                  throw new Error("Logout failed. Please try again.");
            }
      };

      // Common error handler
      const handleAuthError = (error) => {
            switch (error.code) {
                  case "auth/email-already-in-use":
                        return new Error("Email already registered");
                  case "auth/invalid-email":
                        return new Error("Invalid email address");
                  case "auth/weak-password":
                        return new Error("Password must be 6+ characters");
                  case "auth/user-not-found":
                        return new Error("Email not found");
                  case "auth/wrong-password":
                        return new Error("Incorrect password");
                  case "auth/too-many-requests":
                        return new Error(
                              "Account temporarily locked. Try again later"
                        );
                  default:
                        console.error("Auth error:", error);
                        return new Error("Authentication failed");
            }
      };

      const value = {
            currentUser,
            loading,
            register,
            login,
            logout,
      };

      return (
            <AuthContext.Provider value={value}>
                  {!loading && children}
            </AuthContext.Provider>
      );
};

export const useAuth = () => useContext(AuthContext);
