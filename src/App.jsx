import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import './App.css';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;