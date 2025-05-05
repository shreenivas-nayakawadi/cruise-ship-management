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

      // Helper function to get complete user data
      const getCompleteUserData = async (firebaseUser) => {
            if (!firebaseUser) return null;

            try {
                  const userDoc = await getDoc(
                        doc(db, "users", firebaseUser.uid)
                  );
                  const userData = userDoc.data();

                  return {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        role: userData?.role || "voyager",
                        ...userData, // include any additional user fields
                  };
            } catch (error) {
                  console.error("Error fetching user data:", error);
                  throw error;
            }
      };

      // Auth state listener
      useEffect(() => {
            const unsubscribe = onAuthStateChanged(
                  auth,
                  async (firebaseUser) => {
                        try {
                              if (firebaseUser) {
                                    const completeUser =
                                          await getCompleteUserData(
                                                firebaseUser
                                          );
                                    setCurrentUser(completeUser);
                              } else {
                                    setCurrentUser(null);
                              }
                        } catch (error) {
                              console.error(
                                    "Error handling auth state change:",
                                    error
                              );
                        } finally {
                              setLoading(false);
                        }
                  }
            );

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
                  setLoading(true);
                  const userCredential = await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                  );

                  // Update last login timestamp
                  await setDoc(
                        doc(db, "users", userCredential.user.uid),
                        { lastLogin: new Date() },
                        { merge: true }
                  );

                  // Get and return complete user data
                  const completeUser = await getCompleteUserData(
                        userCredential.user
                  );
                  setCurrentUser(completeUser);
                  return completeUser;
            } catch (error) {
                  throw handleAuthError(error);
            } finally {
                  setLoading(false);
            }
      };

      // Logout current user
      const logout = async () => {
            try {
                  setLoading(true);
                  await signOut(auth);
                  setCurrentUser(null);
            } catch (error) {
                  throw new Error("Logout failed. Please try again.");
            } finally {
                  setLoading(false);
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
