import { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChip, HiOutlineCog, HiOutlineExclamationCircle, HiOutlineFolder, HiOutlineLogout, HiOutlineViewGrid } from "react-icons/hi";
import { NavLink } from 'react-router-dom'

const Navbar = ({ appsData, resourcesData }) => {
  const [isAppsExpanded, setIsAppsExpanded] = useState(false)
  const [isResourcesExpanded, setIsResourcesExpanded] = useState(false)

  return (
    <nav className="h-full py-4">
      <ul className='flex h-full justify-between flex-col '>
        <div className="flex flex-col gap-3">
          <li>
            <NavLink to="/dashboard" className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#0e7e7e] transition-all ease-in-out duration-150  '>
              <HiOutlineChip size={23} /><span>Dashboard</span>
            </NavLink>
          </li>



          {/* Resources */}
          <li
            onClick={() => setIsResourcesExpanded(!isResourcesExpanded)}
          >
            <div className='flex justify-between items-center text-slate-200 gap-3 cursor-pointer py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#0e7e7e] transition-all ease-in-out duration-150 '>
              <div className="flex items-center gap-3">
                <HiOutlineFolder size={23} />
                <span>Resources</span>
              </div>

              <HiOutlineChevronDown className="navbar-chevron" size={23} style={{ transform: isResourcesExpanded ? "rotate(180deg)" : "rotate(0)" }} />
            </div>

            <ul className={`transition-all ease-in-out duration-300 overflow-hidden text-sm ${isResourcesExpanded ? 'max-h-[200px]' : 'max-h-0'}`}>
              {resourcesData.map((folder) => (
                <li key={folder.id}>
                  <NavLink to={folder.path} className='flex items-center text-slate-200 gap-3 py-2 pl-8 hover:bg-[#0c0f194d]  hover:text-[#0e7e7e] transition-all ease-in-out duration-150'>
                    {folder.icon}
                    <span>{folder.name}</span>
                  </NavLink>
                </li>

              ))}
            </ul>
          </li>



          {/* Apps */}
          <li
            onClick={() => setIsAppsExpanded(!isAppsExpanded)}
          >
            <div className='flex justify-between items-center text-slate-200 gap-3 cursor-pointer py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#0e7e7e] transition-all ease-in-out duration-150 '>
              <div className="flex items-center gap-3">
                <HiOutlineViewGrid size={23} />
                <span>Apps</span>
              </div>

              <HiOutlineChevronDown className="navbar-chevron" size={23} style={{ transform: isAppsExpanded ? "rotate(180deg)" : "rotate(0)" }} />
            </div>

            <ul className={`transition-all ease-in-out duration-300 overflow-hidden text-sm ${isAppsExpanded ? 'max-h-[200px]' : 'max-h-0'}`}>
              {appsData.map((app) => (
                <li key={app.id}>
                  <NavLink to={app.path} className='flex items-center text-slate-200 gap-3 py-2 pl-8 hover:bg-[#0c0f194d]  hover:text-[#0e7e7e] transition-all ease-in-out duration-150'>
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
            <NavLink to="/help" className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#0e7e7e] transition-all ease-in-out duration-150  ' >
              <HiOutlineExclamationCircle size={23} />
              <span>Help & Support</span>

            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d]  hover:text-[#0e7e7e] transition-all ease-in-out duration-150  ' >
              <HiOutlineCog size={23} />
              <span>Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#0c0f194d] hover:text-[#0e7e7e] transition-all ease-in-out duration-150' >
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