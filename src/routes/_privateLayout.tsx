import RightBar from "@/routes/-components/RightBar";
import { Outlet, redirect } from "@tanstack/react-router";
import { getMeFn } from "@/api/auth";
import { useAuthUserStore } from "@/stores/auth";
import LeftBar from "./-components/LeftBar";
import { Menu } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute({
  loader: async ({ location }) => {
    try {
      const me = await getMeFn();
      if (!me?.data.user) throw new Error("Unauthorized");
      useAuthUserStore.getState().setAuthUser(me);
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

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <main className="flex bg-[#1d1d1d] min-h-svh max-w-screen overflow-hidden overflow-x-hidden font-plus-jakarta-sans text-white">
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
