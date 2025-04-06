import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import ProjectDetails from "./pages/ProjectDetails";

// Lazy load HomePage
const HomePage = lazy(() => import("./pages/Home"));

function App() {
  return (
    // <Suspense fallback={<SplashScreen />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
    // </Suspense>
  );
}

export default App;
