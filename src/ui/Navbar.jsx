import { useState } from "react";
import { HiOutlineChartSquareBar, HiOutlineChevronDown, HiOutlineCog, HiOutlineExclamationCircle, HiOutlineFolder, HiOutlineHome, HiOutlineViewGrid } from "react-icons/hi";
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <nav className="h-full py-4">
      <ul className='flex h-full justify-between flex-col '>
        <div className="flex flex-col gap-3">
          <li>
            <NavLink to="/dashboard" className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#10121b1a]  '>
              <HiOutlineHome size={23} /><span>Home</span>
            </NavLink>
          </li>

          
          <li>
            <NavLink to='/resources' className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#10121b1a]  ' >
              <HiOutlineFolder size={23} />
              <span>Resources</span>

            </NavLink>
          </li>

          


          <li
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          >
            <div className='flex justify-between items-center text-slate-200 gap-3 cursor-pointer  py-2 px-4 hover:bg-[#10121b1a] '>
              <div className="flex items-center gap-3">
                <HiOutlineViewGrid size={23} />
                <span>Apps</span>
              </div>

              <HiOutlineChevronDown className="navbar-chevron" size={23} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }} />
            </div>

            <ul className={`mt-3 transition-all ease-in-out duration-300 overflow-hidden ${isExpanded ? 'max-h-[200px]' : 'max-h-0'}`}>
              <li>
                <NavLink to='/apps/tracker' className='flex items-center text-slate-200 gap-3 py-2 pl-8 hover:bg-[#10121b1a]'>
                  <HiOutlineChartSquareBar size={23} />
                  <span>Tracker</span>
                </NavLink>
              </li>
              <li>
                <NavLink to='/apps/tasks' className='flex items-center text-slate-200 gap-3 py-2 pl-8 hover:bg-[#10121b1a]'>
                  <HiOutlineChartSquareBar size={23} />
                  <span>Tasks</span>
                </NavLink>
              </li>

            </ul>
          </li>




        </div>
        <div className="flex flex-col gap-3">
          <li>
            <NavLink to="/help" className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#10121b1a]  ' >
              <HiOutlineExclamationCircle size={23} />
              <span>Help</span>

            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className='flex items-center text-slate-200 gap-3  py-2 px-4 hover:bg-[#10121b1a]  transition-all ease-in ' >
              <HiOutlineCog size={23} />
              <span>Settings</span>
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  )
}

export default Navbar