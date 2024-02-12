import React, { useEffect, useRef } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";

import {
  HiOutlineBell,
  HiOutlineChevronDown,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";
import Notification from "./Notification";
import { useAuth } from "../contexts/authContext";
import { Link } from "react-router-dom";

import { RxAvatar } from "react-icons/rx";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent
    content={title}
    position="BottomCenter"
    offsetY={-5}
    animation={TooltipAnimation}
  >
    <button
      onClick={customFunc}
      type="button"
      className="hover:text-[#3a6df0] opacity-70 transition-all ease-in-out duration-200 relative"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-1 top-1"
      />
      {icon}
    </button>
  </TooltipComponent>
);

function MainNavbar() {
  const { isClicked, setIsClicked, handleClick } = useStateContext();

  const { user, logout } = useAuth();
  const userProfileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userProfileRef.current &&
        !userProfileRef.current.contains(event.target)
      ) {
        // Click outside the user profile, close the dropdown
        setIsClicked({ ...isClicked, userProfile: false });
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("click", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isClicked, setIsClicked]);

  function handleLogout() {
    logout();
  }

  return (
    <nav className="flex justify-end items-center gap-4 relative">
      {/* Notification */}
      <NavButton
        customFunc={() => handleClick("notification")}
        title="Notifications"
        dotColor="#3a6df0"
        icon={<HiOutlineBell size={25} />}
      />

      {/* UseProfile */}
      <div
        ref={userProfileRef}
        onClick={() => handleClick("userProfile")}
        className="flex items-center cursor-pointer gap-2 p-1 rounded-lg"
      >
        <img
          src="https://fakeimg.pl/200x200?text=img"
          alt="placeholder"
          className="h-8 w-8 rounded-full"
        />
        <p className="ml-1 text-sm font-semibold text-slate-500">
          Welcome, {user ? user.username : "Name?"}
        </p>
        <HiOutlineChevronDown size={20} className="text-slate-500" />
      </div>

      {isClicked.notification && <Notification />}
      {isClicked.userProfile && (
        <div className="absolute top-14 right-0 user-window ">
          <ul className="flex flex-col justify-center items-center gap-2 my-1">
            <li className="px-8 py-1 border-b border-slate-400">
              <Link
                to="/settings"
                className="flex items-center text-[#bbb] gap-3  py-2 px-4  hover:text-[#3a6df0] transition-all ease-in-out duration-150 "
              >
                <RxAvatar size={20} />
                <p>Profile</p>
              </Link>
            </li>
            <li className="px-8 py-1 border-b border-slate-400">
              <Link
                to="/settings"
                className="flex items-center text-[#bbb] gap-3  py-2 px-4  hover:text-[#3a6df0] transition-all ease-in-out duration-150"
              >
                <HiOutlineCog size={20} />
                <p>Settings</p>
              </Link>
            </li>
            <li className="px-8 py-1 ">
              <Link
                to="/login"
                onClick={handleLogout}
                className="flex items-center text-[#bbb] gap-3  py-2 px-4  hover:text-[#3a6df0] transition-all ease-in-out duration-150"
              >
                <HiOutlineLogout
                  size={20}
                  className="origin-center rotate-180"
                />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default MainNavbar;
