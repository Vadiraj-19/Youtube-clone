import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
const Layout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleHamburgerClick = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  return (
    <>
      {/* Top Header */}
      <Header
        onHamburgerClick={handleHamburgerClick}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Sidebar + Main Content */}
      <div className="pt-14 flex mt-10 bg-[#0F0F0F] min-h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <Sidebar isExpanded={isSidebarExpanded} />

        {/* Main Content */}
        <main
          className={`
            flex-2 transition-all duration-300 
            ${isSidebarExpanded ? "ml-10 sm:ml-48" : "ml-[10px] sm:ml-20"}
          `}
        >
          <Outlet context={{ searchTerm }} />
        </main>
      </div>
      <Footer/>
    </>
  );
};

export default Layout;
