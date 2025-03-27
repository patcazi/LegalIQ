// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Functions and point it to the correct region
// If your function is deployed to a region other than us-central1, specify it here.
const functions = getFunctions(app /*, 'your-function-region' */);

// Initialize other Firebase services as needed and export them
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const analytics = getAnalytics(app); // Optional

// Export the initialized app and functions instances
export { app, functions }; 