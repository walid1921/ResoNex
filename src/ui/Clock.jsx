import { useState } from "react";
import TodayDate from "./TodayDate";

let time = new Date().toLocaleTimeString();

function Clock() {
  const [clock, setClock] = useState(time);

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setClock(time);
  };
  setInterval(UpdateTime);
  return (
    <div className="flex flex-col justify-center gap-4 w-[50%] h-[40%]  px-5 py-8 border rounded-md border-slate-500 bg-[rgba(148,163,184,0.17)]">
      <h3 className="text-center text-6xl font-semibold  bg-gradient-to-br from-white to-[#504f4f] bg-clip-text text-transparent">
        {clock}
      </h3>
      <div className="text-center">
        <TodayDate />
      </div>
    </div>
  );
}

export default Clock;
