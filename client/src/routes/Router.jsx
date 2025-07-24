import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import App from "../App"
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/update/:id",
    element: <Home />,
  },

  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <App />,
  }
]);

export default router;