import { HiArrowCircleLeft } from "react-icons/hi"
import { Link } from "react-router-dom"

function UserGuide() {
    return (
        <div className="page-features  relative">
        <div className="flex justify-center items-center flex-col h-full">
          <Link
            to={"/login"}
            className="absolute top-8 left-8 hover:text-[#3a6df0] cursor-pointer text-[#e2e2e2]
              opacity-50 hover:opacity-100 transition-all ease-in-out duration-300"
          >
            <HiArrowCircleLeft size={40} />
          </Link>
  
          <h2 className="text-4xl font-semibold bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent animate-moveInTop">
            User Guide
          </h2>
  
        </div>
      </div>
    )
}

export default UserGuide
