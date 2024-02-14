import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Link } from "react-router-dom";
import { HiArrowCircleLeft } from "react-icons/hi";

import Navbar from "./Navbar";
import User from "./User";
import { useStateContext } from "../contexts/ContextProvider";
import { TooltipAnimation } from "../utils/utils";

const AsideBig = ({tasksData}) => {
  const { activeMenu, setActiveMenu } = useStateContext();

  return (
    <aside className="row-span-full  flex-col py-2 border-r border-slate-600 ease-in-out duration-500 relative flex ">
      {/* Menu Btn */}
      <div
        onClick={() => setActiveMenu(() => !activeMenu)}
        className="absolute -right-[14px] top-[20px]  cursor-pointer text-[#e2e2e2] opacity-50 hover:opacity-100 transition-all ease-in-out duration-300"
      >
        <TooltipComponent
          content="Collapse sidebar"
          position="RightCenter"
          offsetY={-5}
          animation={TooltipAnimation}
        >
          <button className="hover:text-[#3a6df0] transition-all ease-in-out duration-200 ">
            <HiArrowCircleLeft size={30} />
          </button>
        </TooltipComponent>
      </div>

      <div className="flex items-center justify-center px-14 py-8 border-b border-slate-600">
        <Link to="/">
          {/* <span className='text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#2660f3] to-[#41596d]'>ResoNex</span> */}
          <img src="../logo.png" alt="logoIcon" />
        </Link>
      </div>

      <User />
      <Navbar tasksData={tasksData} />
    </aside>
  );
};

export default AsideBig;
