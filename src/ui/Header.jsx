import MainNavbar from "./MainNavbar";



const Header = () => {

  return (
    <header className='px-9 py-3 border-b border-slate-600'>

      {/* <div className='flex relative'> 
          <TooltipComponent content='Settings' position='TopCenter' offsetY={-5} animation={TooltipAnimation}>
            <button className="hover:text-[#3a6df0] transition-all ease-in-out duration-200 "><FiSettings size={20} /></button>
          </TooltipComponent>
      </div> */}

      <MainNavbar />

    </header>
  );
};

export default Header;
