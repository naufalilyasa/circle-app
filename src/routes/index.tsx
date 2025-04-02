import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteLayout from "./ProtectedRoute";
import Forgot from "./Forgot";
import Reset from "./Reset";
import DetailPost from "./DetailPost";
import MyProfile from "./MyProfile";
import Profile from "./Profile";
import Search from "./Search";

const router = createBrowserRouter([
  {
    Component: ProtectedRouteLayout,
    children: [
      { path: "/", Component: Home },
      { path: "/detail-post", Component: DetailPost },
      { path: "/my-profile", Component: MyProfile },
      { path: "/profile", Component: Profile },
      { path: "/search", Component: Search },
    ],
  },
  // { path: "/", Component: Home },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/forgot", Component: Forgot },
  { path: "/reset", Component: Reset },
]);

export default router;
