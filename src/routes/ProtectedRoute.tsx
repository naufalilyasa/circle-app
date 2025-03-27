import Layout from "@/layouts/Layout";
// import { useUserStore } from "@/stores/user";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouteLayout() {
  // const { user } = useUserStore();

  // useEffect(() => {
  //   console.log(user);
  // }, []);

  const user = true;

  if (user) {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default ProtectedRouteLayout;
