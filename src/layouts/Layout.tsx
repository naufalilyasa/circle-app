import React from "react";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";

interface AppLayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: AppLayoutProps) {
  return (
    <main className="flex bg-[#1d1d1d] min-h-svh font-plus-jakarta-sans text-[#fff]">
      <LeftBar />
      <section className="flex-1">{children}</section>
      <RightBar />
    </main>
  );
}

export default Layout;
