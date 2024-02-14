import { HiOutlineExclamationCircle } from "react-icons/hi";

const Help = () => {
  return (
    <>
      <div className=" flex items-center gap-3 mb-10">
        <HiOutlineExclamationCircle size={25} />
        <h2 className="text-2xl font-semibold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
          Help
        </h2>
      </div>
    </>
  );
};

export default Help;
