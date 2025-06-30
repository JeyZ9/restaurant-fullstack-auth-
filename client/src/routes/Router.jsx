import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import App from "../App"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/update/:id",
        element: <Home />
    },

    {
        path: "/app",
        element: <App />
    }
])

export default router;