import Logo from "./Logo"
import Navbar from "./Navbar"
import Profile from "./Profile"

function Sidebar({appsData, resourcesData}) {
  return (
    <aside className="row-span-full flex flex-col  py-2 border-r border-slate-400">
      <Logo />
      <Profile />
      <Navbar appsData={appsData} resourcesData={resourcesData}/>
    </aside>
  )
}

export default Sidebar
