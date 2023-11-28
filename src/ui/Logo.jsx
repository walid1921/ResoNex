import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div className='flex items-center text-2xl font-semibold  p-10 border-b border-slate-400'>   
      <Link to='/'>ResoNex</Link>
      </div>
  )
}

export default Logo