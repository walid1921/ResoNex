import React from "react";
import { HiOutlineChartSquareBar } from "react-icons/hi";

const CodingTracker = () => {
  return (
    <div>
      <div className=" flex items-center gap-3 mb-10">
        <HiOutlineChartSquareBar size={25} />
        <h2 className="text-2xl font-semibold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
          Coding Tracker
        </h2>
      </div>
    </div>
  );
};

export default CodingTracker;
