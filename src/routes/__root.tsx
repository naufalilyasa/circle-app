import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
// import { CookiesProvider } from "react-cookie";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return <p>404 not found</p>;
  },
});

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
