import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import ProjectDetails from "./pages/ProjectDetails";
import ClientDetails from "./pages/ClientDetails";

// Lazy load HomePage
const HomePage = lazy(() => import("./pages/Home"));

function App() {
  return (
    // <Suspense fallback={<SplashScreen />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        {/* <Route path="/clients/:id" element={<ClientDetails />} /> */}
      </Routes>
    // </Suspense>
  );
}

export default App;
