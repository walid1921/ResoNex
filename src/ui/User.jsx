import { HiOutlineChevronDown } from "react-icons/hi"

function User() {
  return (
    <div className="flex justify-between items-center text-md py-5 px-4 gap-4 border-b border-slate-600 hover:cursor-pointer">
      <div className="flex items-center gap-3">
        <img src="https://fakeimg.pl/200x200?text=img" alt="placeholder" className="h-10 w-10 rounded-full" />
        <div className="flex flex-col">
          <span>Walid</span>
          <span className="text-sm text-slate-500">My Account</span>
        </div>

      </div>


      <HiOutlineChevronDown size={23} />

    </div>
  )
}

export default User
