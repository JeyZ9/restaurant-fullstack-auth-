import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import App from "../App"
import Register from "../pages/Register";
import Login from "../pages/Login";
import { NotAllowed } from "../pages/NotAllowed";
import Profile from "../pages/Profile";

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
    path: "/add",
    element: <Home />,
  },
  {
    path: "/delete",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/notallowed",
    element: <NotAllowed />,
  },
  {
    path: "/profile",
    element: <Profile />,
  }
]);

export default router;