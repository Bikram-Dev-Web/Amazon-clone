import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Lists from "./Components/Lists";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Load from "./imgs/spin.gif";
import { app } from "./Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProductPage from "./Components/ProductPage";
import CartSection from "./Components/CartSection";
import Payment from "./Components/Payment";
import Profile from "./Components/Profile";
import Orders from "./Components/Orders";
import Error from "./Components/Error";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This is your existing useEffect for Firebase auth
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  // --- START: UPDATED CODE FOR CHAT WIDGET ---
  useEffect(() => {
    // 1. Create and add the CSS <link> tag to the <head>
    const cssLink = document.createElement('link');
    // IMPORTANT: Make sure 'style.css' is the correct filename from your 'dist' folder
    cssLink.href = "https://chat-widget-25.vercel.app/my-chat-widget-app.css";
    cssLink.rel = 'stylesheet';
    document.head.appendChild(cssLink);

    // 2. Create and add the JavaScript <script> tag
    const script = document.createElement('script');
    script.src = "https://chat-widget-25.vercel.app/chat-widget.js";
    script.async = true;

    // 3. Run the init function after the script is loaded
    script.onload = () => {
      if (window.ChatWidget) {
        window.ChatWidget.init();
      }
    };
    document.body.appendChild(script);

    // 4. Clean up by removing both when the app unmounts
    return () => {
      document.head.removeChild(cssLink);
      document.body.removeChild(script);
    };
  }, []); // The empty array ensures this runs only once
  // --- END: UPDATED CODE FOR CHAT WIDGET ---

  if (loading) {
    return (
      <div className="loading">
        <img src={Load} className="loading-img" alt="Loading..." />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Signin />} />
        <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup />} />
        {user && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/wishlists" element={<Lists />} />
            <Route path="/cart" element={<CartSection />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="*" element={<Error />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;