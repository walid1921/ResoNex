import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const AppLayout = () => {
  return (
    <div className='app'>
      <Sidebar />
      <Header />
      <main className='p-6'>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout