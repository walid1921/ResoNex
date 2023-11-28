import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const AppLayout = ({appsData, resourcesData}) => {
  return (
    <div className='appLayout'>
      <Sidebar appsData={appsData} resourcesData={resourcesData}/>
      <Header />
      <main className='p-6'>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout