import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { HiOutlineCalendar, HiOutlineChevronDown, HiOutlineChip, HiOutlineClipboardList, HiOutlineCog, HiOutlineCube, HiOutlineExclamationCircle, HiOutlineFolder, HiOutlineLink, HiOutlineLogout, HiOutlineSparkles, HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { NavLink } from 'react-router-dom'

const appsData = [
  {
    id: 1,
    name: 'Tracker',
    path: '/apps/tracker',
    icon: <HiOutlineChartSquareBar size={19} />,
  },
  {
    id: 2,
    name: 'Attendance',
    path: '/apps/Attendance',
    icon: <HiOutlineChartSquareBar size={19} />,
  },
  {
    id: 3,
    name: 'Tasks',
    path: '/apps/tasks',
    icon: <HiOutlineClipboardList size={19} />,
  },
  {
    id: 4,
    name: 'Calendar',
    path: '/apps/calendar',
    icon: <HiOutlineCalendar size={19} />,
  }
];

const resourcesData = [
  {
    id: 1,
    name: 'Design',
    path: '/resources/design',
    icon: <HiOutlineSparkles size={19} />,
  },
  {
    id: 2,
    name: 'Webs',
    path: '/resources/web',
    icon: <HiOutlineLink size={19} />,
  },
  {
    id: 3,
    name: 'Study',
    path: '/resources/study',
    icon: <HiOutlineCube size={19} />,
  }
];




const Navbar = () => {
  const [isAppsExpanded, setIsAppsExpanded] = useState(false)
  const [isResourcesExpanded, setIsResourcesExpanded] = useState(false)

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsResourcesExpanded(false);
        setIsAppsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isResourcesExpanded, isAppsExpanded]);

  return (
    <nav className="h-full py-4">
      <ul className='flex h-full justify-between flex-col '>
        <div className="flex flex-col gap-3">
          <li>
            <NavLink to="/dashboard" className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150  '>
              <HiOutlineChip size={23} /><span>Dashboard</span>
            </NavLink>
          </li>



          {/* Resources */}
          <li ref={dropdownRef} onClick={() => setIsResourcesExpanded(isExpanded => !isExpanded, setIsAppsExpanded(false))}>

            <div className='flex justify-between items-center text-slate-200 gap-3 cursor-pointer py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150 '>
              <div className="flex items-center gap-3">
                <HiOutlineFolder size={23} />
                <span>Resources</span>
              </div>

              <HiOutlineChevronDown className={`transition-transform duration-300 transform ${isResourcesExpanded ? "rotate-180" : "rotate-0"} ${isResourcesExpanded ? 'text-[#3a6df0]' : 'text-slate-200'} hover:text-[#3a6df0]`} size={23} />
            </div>

            <ul className={`transition-all ease-in-out duration-300 overflow-hidden text-sm ${isResourcesExpanded ? 'max-h-[200px]' : 'max-h-0'}`}>
              {resourcesData.map((folder) => (
                <li key={folder.id}>
                  <NavLink to={folder.path} className='flex items-center text-slate-200 gap-3 py-2 pl-8 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150'>
                    {folder.icon}
                    <span>{folder.name}</span>
                  </NavLink>
                </li>

              ))}
            </ul>
          </li>



          {/* Apps */}
          <li ref={dropdownRef}
            onClick={() => setIsAppsExpanded(isExpanded => !isExpanded, setIsResourcesExpanded(false))}
          >
            <div className='flex justify-between items-center text-slate-200 gap-3 cursor-pointer py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150 '>
              <div className="flex items-center gap-3">
                <HiOutlineViewGrid size={23} />
                <span>Apps</span>
              </div>

              <HiOutlineChevronDown className={`transition-transform duration-300 transform ${isAppsExpanded ? "rotate-180" : "rotate-0"} ${isAppsExpanded ? 'text-[#3a6df0]' : 'text-slate-200'} hover:text-[#3a6df0]`} size={23} />
            </div>

            <ul className={`transition-all ease-in-out duration-300 overflow-hidden text-sm ${isAppsExpanded ? 'max-h-[200px]' : 'max-h-0'}`}>
              {appsData.map((app) => (
                <li key={app.id}>
                  <NavLink to={app.path} className='flex items-center text-slate-200 gap-3 py-2 pl-8 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150'>
                    {app.icon}
                    <span>{app.name}</span>
                  </NavLink>
                </li>

              ))}
            </ul>
          </li>
        </div>

        <div className="flex flex-col gap-3">
          <li>
            <NavLink to="/help" className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150  ' >
              <HiOutlineExclamationCircle size={23} />
              <span>Help & Support</span>

            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150 ' >
              <HiOutlineCog size={23} className="rotate-icon" />
              <span>Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d] hover:text-[#3a6df0] transition-all ease-in-out duration-150' >
              <HiOutlineLogout size={23} className="origin-center rotate-180" />
              <span>Logout</span>
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  )
}

export default Navbar