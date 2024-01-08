import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";


import { HiArrowCircleRight, HiOutlineCalendar, HiOutlineChartSquareBar, HiOutlineChip, HiOutlineClipboardList, HiOutlineCog, HiOutlineCube, HiOutlineExclamationCircle, HiOutlineFolder, HiOutlineLink, HiOutlineLogout, HiOutlineSparkles, HiOutlineViewGrid } from "react-icons/hi";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";

const resourcesData = [
  {
    id: 1,
    name: 'Design',
    path: '/resources/design',
    icon: <HiOutlineSparkles size={23} />,
  },
  {
    id: 2,
    name: 'Webs',
    path: '/resources/web',
    icon: <HiOutlineLink size={23} />,
  },
  {
    id: 3,
    name: 'Study',
    path: '/resources/study',
    icon: <HiOutlineCube size={23} />,
  }
];

const appsData = [
  {
    id: 1,
    name: 'Coding Tracker',
    path: '/apps/coding-tracker',
    icon: <HiOutlineChartSquareBar size={23} />,
  },
  {
    id: 2,
    name: 'Tasks Tracker',
    path: '/apps/tasks-tracker',
    icon: <HiOutlineClipboardList size={23} />,
  },
  {
    id: 3,
    name: 'Calendar',
    path: '/apps/calendar',
    icon: <HiOutlineCalendar size={23} />,
  }
];

function AsideSmall() {
  const { activeMenu, setActiveMenu } = useStateContext();

  const [isResourcesExpanded, setIsResourcesExpanded] = useState(false)
  const [isAppsExpanded, setIsAppsExpanded] = useState(false)

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


  let TooltipAnimation = {
    open: { effect: 'FadeIn', duration: 300, delay: 0 },
  };

  return (
    <aside className='row-span-full flex flex-col py-2 border-r border-slate-600 ease-in-out duration-500 relative'>


      {/* Menu Btn */}
      <div onClick={() => setActiveMenu(() => !activeMenu)} className='absolute -right-[14px] top-[20px]  cursor-pointer text-[#e2e2e2] opacity-50 hover:opacity-100 transition-all ease-in-out duration-300'>
        <TooltipComponent content='Expand sidebar' position='RightCenter' offsetY={-5} animation={TooltipAnimation}>
          <button className={!activeMenu ? `text-[#3a6df0] hover:text-[#3a6df0] transition-all ease-in-out duration-200` : 'text-[#e2e2e2]'}><HiArrowCircleRight size={30} /></button>
        </TooltipComponent>
      </div>

      {/* Logo */}
      <div className="flex justify-center py-8 border-b border-slate-600">
        <TooltipComponent content='ResoNex' position='RightCenter' offsetY={-5} animation={TooltipAnimation}>
          <Link to="/" className='flex justify-center px-2  transition-all ease-in-out duration-150  '>
            <img src="../logox.png" alt="logoIcon" className='h-[40px]' />
          </Link>
        </TooltipComponent>
      </div>


      {/* User */}
      <div className="py-5 border-b border-slate-600">
        <TooltipComponent content='Walid' position='RightCenter' offsetY={-5} animation={TooltipAnimation}>
          <NavLink to="/" className='flex justify-center px-2  transition-all ease-in-out duration-150  '>
            <img src="https://fakeimg.pl/200x200?text=img" alt="placeholder" className="h-9 w-9 rounded-full" />
          </NavLink>
        </TooltipComponent>
      </div>


      <ul className="flex flex-col py-4 gap-3 h-full justify-between">
        <div className="flex flex-col gap-3">

          {/* Dashboard */}
          <li className="relative">
            <TooltipComponent content='Dashboard' position='RightCenter' offsetY={-5} animation={TooltipAnimation}>
              <NavLink to="/dashboard" className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150  '>
                <button className="hover:text-[#3a6df0] transition-all ease-in-out duration-200 "><HiOutlineChip size={23} /></button>
              </NavLink>
            </TooltipComponent>
          </li>



          {/* Resources */}
          <li className="relative" ref={dropdownRef} onClick={() => setIsResourcesExpanded(isExpanded => !isExpanded, setIsAppsExpanded(false))}>

            <TooltipComponent content='Resources' position='RightCenter' offsetY={-5} animation={TooltipAnimation}>
              <div className='flex justify-between items-center text-slate-200 gap-3 cursor-pointer py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150 '>
                <button className="hover:text-[#3a6df0] transition-all ease-in-out duration-200 "><HiOutlineFolder size={23} /></button>
              </div>
            </TooltipComponent>

            <ul className={`transition-all ease-in-out duration-300 overflow-hidden text-sm ${isResourcesExpanded ? 'max-h-[200px]' : 'max-h-0'}`}>
              {resourcesData.map((folder) => (
                <li className="relative" key={folder.id}>
                  <TooltipComponent content={folder.name} position='RightCenter' offsetY={-5} animation={TooltipAnimation}>
                    <NavLink to={folder.path} className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150  '>
                      <button className="hover:text-[#3a6df0] transition-all ease-in-out duration-200 ">{folder.icon}</button>
                    </NavLink>
                  </TooltipComponent>
                </li>

              ))}
            </ul>
          </li>


          {/* Apps */}
          <li className="relative"
            ref={dropdownRef}
            onClick={() => setIsAppsExpanded(isExpanded => !isExpanded, setIsResourcesExpanded(false))}
          >
            <TooltipComponent content='Apps' position='RightCenter' offsetY={-5} animation={TooltipAnimation}>
              <div className='flex justify-between items-center text-slate-200 gap-3 cursor-pointer py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150 '>
                <button className="hover:text-[#3a6df0] transition-all ease-in-out duration-200 "><HiOutlineViewGrid size={23} /></button>
              </div>
            </TooltipComponent>

            <ul className={`transition-all ease-in-out duration-300 overflow-hidden text-sm ${isAppsExpanded ? 'max-h-[200px]' : 'max-h-0'}`}>
              {appsData.map((app) => (
                <li className="relative" key={app.id}>
                  <TooltipComponent content={app.name} position='RightCenter' offsetY={-5} animation={TooltipAnimation}>
                    <NavLink to={app.path} className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150  '>
                      <button className="hover:text-[#3a6df0] transition-all ease-in-out duration-200 ">{app.icon}</button>
                    </NavLink>
                  </TooltipComponent>
                </li>

              ))}
            </ul>
          </li>
        </div>

        <div className="flex flex-col gap-3">
          <li className="relative">
            <TooltipComponent content='Help & Support' position='RightCenter' offsetY={-5} animation={TooltipAnimation}>
              <NavLink to="/help" className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150  '>
                <button className="hover:text-[#3a6df0] transition-all ease-in-out duration-200 "><HiOutlineExclamationCircle size={23} /></button>
              </NavLink>
            </TooltipComponent>
          </li>


          <li className="relative">
            <TooltipComponent content='Settings' position='RightCenter' offsetY={-5} animation={TooltipAnimation}>
              <NavLink to="/settings" className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150  '>
                <button className="hover:text-[#3a6df0] transition-all ease-in-out duration-200 "><HiOutlineCog size={23} /></button>
              </NavLink>
            </TooltipComponent>
          </li>

          <li className="relative">
            <TooltipComponent content='Logout' position='RightCenter' offsetY={-5} animation={TooltipAnimation}>
              <NavLink to="/login" className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#3a6df0] transition-all ease-in-out duration-150  '>
                <button className="hover:text-[#3a6df0] transition-all ease-in-out duration-200 "><HiOutlineLogout size={23} /></button>
              </NavLink>
            </TooltipComponent>
          </li>
        </div>

      </ul>
    </aside>
  )
}

export default AsideSmall
