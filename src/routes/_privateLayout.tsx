import RightBar from "@/routes/-components/RightBar";
import { Navigate, Outlet, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMeFn } from "@/api/auth";
import { Skeleton } from "@/components/ui/skeleton";
import LeftBar from "./-components/LeftBar";
import { Menu } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute({
  loader: async ({ location }) => {
    try {
      const me = await getMeFn();
      if (!me?.data.user) throw new Error("Unauthorized");
      return me.data.user;
    } catch (err) {
      console.error("Error fetching user data:", err);
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: MainLayout,
});

function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, isError } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMeFn,
    retry: 3,
    retryDelay: 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: true,
  });

  const toggleSidebar = () => setIsOpen(!isOpen);

  if (isLoading)
    return (
      <div className="flex mt-20 justify-center items-center w-full">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );

  if (isError) return <Navigate to="/login" replace />;

  return (
    <main className="flex bg-[#1d1d1d] min-h-svh max-w-screen overflow-hidden overflow-x-hidden font-plus-jakarta-sans text-[#fff]">
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={toggleSidebar} />}
      <LeftBar isOpen={isOpen} />
      <section className="lg:flex-6/12 md:w-[65%] mx-auto">
        <button onClick={toggleSidebar} className="md:hidden ps-4 mt-4">
          <Menu size={32} />
        </button>
        <Outlet />
      </section>
      <RightBar />
    </main>
  );
}

export default MainLayout;
