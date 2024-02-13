import { HiOutlineChevronDown } from "react-icons/hi";
import { useAuth } from "../contexts/authContext";

function User() {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center text-md py-5 px-4 gap-4 border-b border-slate-600">
      <div className="flex items-center gap-3">
        <img
          src="https://fakeimg.pl/200x200?text=img"
          alt="placeholder"
          className="h-10 w-10 rounded-full"
        />

        <span>{user ? user.username : "Name?"}</span>
      </div>
    </div>
  );
}

export default User;
