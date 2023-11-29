import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div className='flex items-center p-10 border-b border-slate-600  '>   
      <Link to='/'>
        <span className='text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#2660f3] to-[#41596d]'>ResoNex</span>
        
        </Link>
      </div>
  )
}

export default Logo