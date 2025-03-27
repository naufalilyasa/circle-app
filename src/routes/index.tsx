import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteLayout from "./ProtectedRoute";
import Forgot from "./Forgot";
import Reset from "./Reset";

let router = createBrowserRouter([
  {
    Component: ProtectedRouteLayout,
    children: [{ path: "/", Component: Home }],
  },
  // { path: "/", Component: Home },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/forgot", Component: Forgot },
  { path: "/reset", Component: Reset },
]);

export default router;
