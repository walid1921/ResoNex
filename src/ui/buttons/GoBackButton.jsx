import { HiArrowCircleLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

function GoBackButton() {
  return (
    <Link
      to="/login"
      className="absolute top-8 left-8 hover:text-[#3a6df0] cursor-pointer text-[#e2e2e2]
          opacity-50 hover:opacity-100 transition-all ease-in-out duration-300"
    >
      <HiArrowCircleLeft size={40} />
    </Link>
  );
}

export default GoBackButton;
