import Logo from "./Logo"
import Navbar from "./Navbar"

function Sidebar() {
  return (
    <aside className="row-span-full flex flex-col gap-3 py-2 border-r border-slate-400">
      <Logo />
      <Navbar />
    </aside>
  )
}

export default Sidebar
