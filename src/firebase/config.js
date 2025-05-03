import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn-jYvjfQmhpYPwIVWDNO8UAwxjqpRU3Q",
  authDomain: "cruise-ship-management-ca45e.firebaseapp.com",
  projectId: "cruise-ship-management-ca45e",
  storageBucket: "cruise-ship-management-ca45e.firebasestorage.app",
  messagingSenderId: "523549719545",
  appId: "1:523549719545:web:fde08633a81508751c9b28"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export the services you'll use in your app
export { auth, db, storage };