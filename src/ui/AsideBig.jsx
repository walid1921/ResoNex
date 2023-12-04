
import Navbar from './Navbar'
import User from './User'
import { HiArrowCircleLeft } from 'react-icons/hi'
import { useStateContext } from '../contexts/ContextProvider'
import { Link } from 'react-router-dom'

const AsideBig = () => {
  const { activeMenu, setActiveMenu } = useStateContext();


  return (
    <aside className='row-span-full flex flex-col py-2 border-r border-slate-600 ease-in-out duration-500 relative'>

      <div onClick={() => setActiveMenu(() => !activeMenu)} className='absolute -right-[14px] top-[20px]  cursor-pointer text-[#e2e2e2] opacity-50 hover:opacity-100 transition-all ease-in-out duration-300'><HiArrowCircleLeft size={30} /></div>

      <div className='flex items-center justify-center px-14 py-8 border-b border-slate-600'>

        <Link to='/'>
          {/* <span className='text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#2660f3] to-[#41596d]'>ResoNex</span> */}
          <img src="../../public/logo.png" alt="logoIcon" />

        </Link>
      </div>

      <User />
      <Navbar />
    </aside>
  )
}

export default AsideBig