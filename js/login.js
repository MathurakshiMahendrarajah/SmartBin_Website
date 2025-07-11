// Import Firebase SDK if not already in HTML
// <script type="module" src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"></script>
// <script type="module" src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"></script>

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyC7WqJCPr50KFFDqcoRDtXPzsg7gB2_1yA",
    authDomain: "dustbin-123.firebaseapp.com",
    projectId: "dustbin-123",
    storageBucket: "dustbin-123.firebasestorage.app",
    messagingSenderId: "253366361764",
    appId: "1:253366361764:web:e25a5a1cff3ca4183cd031",
    measurementId: "G-51MRWER7WJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Both fields are required.");
      return;
    }

    try {
      // Set userId as username (you can modify this logic)
      const userId = username;

      // Save to Firestore
      await setDoc(doc(db, "users", userId), {
        username: username,
        password: password, // ❗ Not secure to store plain passwords — use Firebase Auth or encryption in real apps
        timestamp: new Date()
      });

      alert("Login data saved successfully!");
      // Redirect or clear form
      form.reset();
    } catch (error) {
      console.error("Error saving login data:", error);
      alert("Failed to save login data. Check console for details.");
    }
  });
});
