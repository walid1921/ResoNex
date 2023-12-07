import React, { useEffect } from 'react'
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";

import { HiOutlineBell, HiOutlineChevronDown } from "react-icons/hi";
import Notification from './Notification';
import UserProfile from './UserProfile';

// import { Notification, UserProfile} from '.'

let TooltipAnimation = {
  open: { effect: 'FadeIn', duration: 300, delay: 0 },
};

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (

  <TooltipComponent content={title} position='BottomCenter' offsetY={-5} animation={TooltipAnimation}>
    <button onClick={customFunc} type='button' className="hover:text-[#3a6df0] opacity-70 transition-all ease-in-out duration-200 relative">

      <span style={{ background: dotColor }} className='absolute inline-flex rounded-full h-2 w-2 right-1 top-1' />
      {icon}

    </button>
  </TooltipComponent>

)


function MainNavbar() {
  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick } = useStateContext();

  return (
    <nav className='flex justify-end items-center gap-4'>

      {/* Notification */}
      <NavButton customFunc={() => handleClick('notification')} title='Notifications' dotColor='#3a6df0' icon={<HiOutlineBell size={25} />} />

      {/* UseProfile */}
      <TooltipComponent content='User_Name' position='BottomCenter' offsetY={-5} animation={TooltipAnimation}>

        <div onClick={() => handleClick('userProfile')} className='flex items-center cursor-pointer gap-2 p-1 rounded-lg'>
          <img src="https://fakeimg.pl/200x200?text=img" alt="placeholder" className="h-8 w-8 rounded-full" />
          <p>
            <span className='text-slate-500 text-sm'>Hi, </span>{' '}<span className='ml-1 text-sm font-semibold text-slate-500'>Walid</span>
          </p>
          <HiOutlineChevronDown size={20} className='text-slate-500' />
        </div>
      </TooltipComponent>

      {isClicked.notification && <Notification />}
      {isClicked.userProfile && <UserProfile />}
    </nav>
  )
}

export default MainNavbar
