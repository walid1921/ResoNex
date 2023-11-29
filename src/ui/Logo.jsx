import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div className='flex items-center justify-center px-10 py-8 border-b border-slate-600  '>   
      <Link to='/'>
        {/* <span className='text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#2660f3] to-[#41596d]'>ResoNex</span> */}
        <img src="logoIcon.png" alt="logoIcon" />
        
        </Link>
      </div>
  )
}

export default Logo