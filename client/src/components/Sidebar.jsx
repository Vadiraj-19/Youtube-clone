import {
  MdHomeFilled,
  MdSubscriptions,
  MdOutlineVideoLibrary,
  MdOutlineWatchLater,
  MdOutlineSettings,
} from "react-icons/md";
import { GiClapperboard, GiTrophy } from "react-icons/gi";
import {
  FaRegClock,
  FaFire,
  FaMusic,
  FaRegHeart,
  FaGamepad,
  FaFlag,
  FaCircleInfo,
  FaRegMessage,
  FaUser,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Sidebar = ({ isExpanded }) => {
  const { user, logout } = useAuth();

  // track window width for responsive logic
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showFullSidebar = !isMobile && isExpanded;
  const showNarrowSidebar = (isMobile && isExpanded) || (!isMobile && !isExpanded);
  const hideSidebar = isMobile && !isExpanded;

  const coreItems = [
    { icon: <MdHomeFilled />, label: "Home", to: "/" },
    { icon: <GiClapperboard />, label: "Shorts" },
    { icon: <MdSubscriptions />, label: "Subscriptions" },
    { icon: <MdOutlineVideoLibrary />, label: "Library" },
  ];

  const extraItems = [
    {
      group: [
        { icon: <MdOutlineWatchLater />, label: "Watch later" },
        { icon: <FaRegClock />, label: "History" },
      ],
    },
    {
      group: [{ icon: <FaUser />, label: "You" }],
    },
    {
      title: "Explore",
      group: [
        { icon: <FaFire />, label: "Trending" },
        { icon: <FaMusic />, label: "Music" },
        { icon: <FaRegHeart />, label: "Live" },
        { icon: <FaGamepad />, label: "Gaming" },
        { icon: <GiClapperboard />, label: "Movies" },
        { icon: <GiTrophy />, label: "Sports" },
      ],
    },
    {
      group: [
        { icon: <MdOutlineSettings />, label: "Settings" },
        { icon: <FaFlag />, label: "Report history" },
        { icon: <FaCircleInfo />, label: "Help" },
        { icon: <FaRegMessage />, label: "Send feedback" },
      ],
    },
  ];

  return (
    <div
      className={`
        fixed top-20 left-0 z-40 h-[calc(100vh-56px)] bg-black text-white transition-all duration-300 overflow-x-hidden
        ${showFullSidebar ? "w-48 px-4" : showNarrowSidebar ? "w-14 px-2" : "w-0 px-0"}
      `}
    >
      {/* Core items */}
      <div className="flex flex-col gap-2">
        {coreItems.map((item, i) => (
          <SidebarItem key={i} {...item} expanded={showFullSidebar} />
        ))}
      </div>

      {/* Extra items only for full sidebar */}
      {showFullSidebar && (
        <>
          {extraItems.map((section, i) => (
            <div key={i}>
              <Divider />
              {section.title && (
                <p className="text-gray-400 text-sm px-2">{section.title}</p>
              )}
              <div className="flex flex-col gap-2">
                {section.group.map((item, j) => (
                  <SidebarItem key={j} {...item} expanded={true} />
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Auth section shown only when sidebar is visible (not collapsed) */}
      {!hideSidebar && (
        <>
          <Divider />
          <div className="mt-4 px-1">
            {showFullSidebar ? (
              <SidebarAuthExpanded user={user} logout={logout} />
            ) : (
              <SidebarAuthCompact user={user} logout={logout} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

const SidebarItem = ({ icon, label, to = "#", expanded }) => (
  <Link
    to={to}
    className={`
      flex items-center font-light rounded-xl transition-all
      ${expanded ? "gap-4 px-3 py-2 text-sm justify-start" : "justify-center p-4 text-xl"}
      hover:bg-zinc-700
    `}
    title={!expanded ? label : ""}
  >
    <span className={expanded ? "text-lg" : "text-2xl"}>{icon}</span>
    {expanded && <span>{label}</span>}
  </Link>
);

const SidebarAuthExpanded = ({ user, logout }) => (
  <div className="w-full px-2 py-3 bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl">
    {user ? (
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-white shadow-md"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{user.username}</span>
          <button
            onClick={logout}
            className="text-xs text-red-400 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    ) : (
      <Link
        to="/login"
        className="text-blue-300 text-sm border border-blue-300 rounded-xl px-3 py-2 text-center block hover:bg-blue-950"
      >
        Sign In to continue
      </Link>
    )}
  </div>
);

const SidebarAuthCompact = ({ user, logout }) => (
  <div className="text-center">
    {user ? (
      <div className="flex flex-col items-center gap-1">
        <img
          src={user.avatar}
          alt="User"
          className="w-8 h-8 rounded-full"
          title={user.username}
        />
        <button
          onClick={logout}
          className="text-[10px] text-red-400 hover:underline"
        >
          Logout
        </button>
      </div>
    ) : (
      <Link
        to="/login"
        className="text-blue-300 text-xs border border-blue-300 rounded-xl px-2 py-1 text-center"
      >
        Sign In
      </Link>
    )}
  </div>
);

const Divider = () => <div className="bg-gray-600 my-3 h-[1px] w-full" />;

export default Sidebar;
