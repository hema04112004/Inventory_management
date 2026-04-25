import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Sidebar from "../components/SlideBar";

export default function Shell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* fixed navbar */}
      <Navbar onHamburgerClick={() => setSidebarOpen((s) => !s)} />

      {/* sidebar (fixed) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* main content:
          - md:ml-64 moves it right by sidebar width on desktop
          - mt-16 pushes it below fixed navbar (navbar height ≈ 4rem)
      */}
      <main className=" p-4 md:ml-64 mt-16 max-w-7xl mx-auto min-h-[80vh]">
        <Outlet />
      </main>
    </div>
  );
}