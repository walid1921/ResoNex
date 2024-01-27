import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import {
  HiOutlineCalendar,
  HiOutlineChevronDown,
  HiOutlineChip,
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineExclamationCircle,
  HiOutlineFolder,
  HiOutlineLogout,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import useCalendarAPI from "../services/CalendarAPI";
import { useAuth } from "../contexts/authContext";

const Navbar = ({ tasksData }) => {
  const { calendarData } = useCalendarAPI();

  const numEvents = calendarData.length;

  const numPendingTasks = tasksData.filter(
    (task) => task.status === "Pending"
  ).length;

  const appsData = [
    {
      id: 1,
      name: "Tasks Tracker",
      path: "/apps/tasks-tracker",
      icon: <HiOutlineClipboardList size={19} />,
      numPendingTasks,
    },
    {
      id: 2,
      name: "Calendar",
      path: "/apps/calendar",
      icon: <HiOutlineCalendar size={19} />,
      numEvents,
    },
    {
      id: 3,
      name: "Coding Tracker",
      path: "/apps/coding-tracker",
      icon: <HiOutlineChartSquareBar size={19} />,
    },
  ];

  const [isAppsExpanded, setIsAppsExpanded] = useState(false);
  const [isResourcesExpanded, setIsResourcesExpanded] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsResourcesExpanded(false);
        setIsAppsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isResourcesExpanded, isAppsExpanded]);

  const { logout } = useAuth();

  function handleLogout() {
    logout();
  }

  // useEffect(() => {
  //   if (isAuthenticated) navigate("/dashboard");
  // }, [isAuthenticated, navigate]);

  return (
    <nav className="h-full py-4">
      <ul className="flex h-full justify-between flex-col ">
        <div className="flex flex-col gap-3">
          <li>
            <NavLink
              to="/dashboard"
              className="flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150  "
            >
              <HiOutlineChip size={20} />
              <span className="text-[14px]">Dashboard</span>
            </NavLink>
          </li>

          {/* Resources */}
          <li
            ref={dropdownRef}
            onClick={() =>
              setIsResourcesExpanded(
                !isResourcesExpanded,
                setIsAppsExpanded(false)
              )
            }
          >
            <NavLink
              to={"/resources"}
              className="flex items-center text-slate-200 gap-3 cursor-pointer py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150 "
            >
              <HiOutlineFolder size={20} />
              <span className="text-[14px]">Resources</span>
            </NavLink>
          </li>

          {/* Apps */}
          <li
            ref={dropdownRef}
            onClick={() =>
              setIsAppsExpanded(!isAppsExpanded, setIsResourcesExpanded(false))
            }
          >
            <div className="flex justify-between items-center text-slate-200 gap-3 cursor-pointer py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150 ">
              <div className="flex items-center gap-3">
                <HiOutlineViewGrid size={20} />
                <span className="text-[14px]">Apps</span>
              </div>

              <HiOutlineChevronDown
                className={`transition-transform duration-300 transform ${
                  isAppsExpanded ? "rotate-180" : "rotate-0"
                } ${
                  isAppsExpanded ? "text-[#3a6df0]" : "text-slate-200"
                } hover:text-[#3a6df0]`}
                size={20}
              />
            </div>

            <ul
              className={`transition-all ease-in-out duration-300 overflow-hidden text-sm font-light ${
                isAppsExpanded ? "max-h-[200px]" : "max-h-0"
              }`}
            >
              {appsData.map((app) => (
                <li key={app.id}>
                  <NavLink
                    to={app.path}
                    className="flex items-center justify-between text-slate-200 gap-3 py-2 pl-8 pr-6 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150"
                  >
                    <div className="flex items-center gap-3">
                      {app.icon}
                      <span>{app.name}</span>
                    </div>
                    {app.numPendingTasks ? (
                      <TooltipComponent
                        content={`${app.numPendingTasks} Pending Tasks `}
                        position="TopCenter"
                      >
                        <span className="text-white text-[10px] bg-[rgba(58,111,240,0.2)] border-[rgba(58,111,240,0.5)] transition-all ease-in-out duration-150 border rounded-full p-1 px-2">
                          {app.numPendingTasks}
                        </span>
                      </TooltipComponent>
                    ) : (
                      ""
                    )}
                    {app.numEvents ? (
                      <TooltipComponent
                        content={`${app.numEvents} Events `}
                        position="TopCenter"
                      >
                        <span className="text-white text-[10px] bg-[rgba(58,111,240,0.2)] border-[rgba(58,111,240,0.5)] transition-all ease-in-out duration-150 border rounded-full p-1 px-2">
                          {app.numEvents}
                        </span>
                      </TooltipComponent>
                    ) : (
                      ""
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </div>

        <div className="flex flex-col gap-3">
          <li>
            <NavLink
              to="/help"
              className="flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150  "
            >
              <HiOutlineExclamationCircle size={20} />
              <span className="text-[14px]">Help & Support</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className="flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150 "
            >
              <HiOutlineCog size={20} />
              <span className="text-[14px]">Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              onClick={handleLogout}
              className="flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d] hover:text-[#3a6df0] transition-all ease-in-out duration-150"
            >
              <HiOutlineLogout size={20} className="origin-center rotate-180" />
              <span className="text-[14px]">Logout</span>
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
