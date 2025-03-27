import React from "react";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";

interface AppLayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: AppLayoutProps) {
  return (
    <div className="flex bg-[#1d1d1d] min-h-svh w-screen">
      <LeftBar />
      <section className="flex-1 text-[#e8e8e8]">{children}</section>
      <RightBar />
    </div>
  );
}

export default Layout;
