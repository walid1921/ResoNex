import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";


const Header = () => {
  let TooltipAnimation = {
    open: { effect: 'ZoomIn', duration: 200, delay: 0 },
  };

  return (
    <header className='px-9 py-10 border-b border-slate-600'>

      {/* <div className='flex relative'> 
          <TooltipComponent content='Settings' position='TopCenter' offsetY={-5} animation={TooltipAnimation}>
            <button className="hover:text-[#3a6df0] transition-all ease-in-out duration-200 "><FiSettings size={20} /></button>
          </TooltipComponent>
      </div> */}

    </header>
  );
};

export default Header;
