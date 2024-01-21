import React from "react";
import { HiOutlineChartSquareBar } from "react-icons/hi";

const CodingTracker = () => {
  return (
    <div className="h-full">
      <div className=" flex items-center gap-3 mb-10">
        <HiOutlineChartSquareBar size={25} />
        <h2 className="text-2xl font-semibold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
          Coding Tracker
        </h2>
      </div>

      <div className="h-[60%] flex justify-center items-center">
        <div
          className={`text-md text-center font-light px-6 py-6 border bg-[rgba(148,163,184,0.24)] border-[rgba(58,111,240,0.5)]  text-[#ffffff6f] rounded-md`}
        >
          <span className=" text-xl font-semibold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
            Coding Tracker
          </span>{" "}
          Coming soon...
        </div>
      </div>
    </div>
  );
};

export default CodingTracker;
