import React, { lazy, useState, useEffect } from "react";
import SplashScreen from "./pages/SplashScreen";

// Lazy load HomePage
const HomePage = lazy(() => import("./pages/Home"));

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Hide splash screen after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
