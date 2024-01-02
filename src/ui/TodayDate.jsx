import { useState } from "react";

function TodayDate() {
  
  const todayDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "short" });
    
    return `${dayOfWeek}, ${day}-${month}-${year}`;
  };
  
  const [currentDate, setCurrentDate] = useState(todayDate());

  return <p className="text-sm text-slate-400 flex justify-end items-end h-full mb-2 mr-2">
  {currentDate}
</p>;
}

export default TodayDate;
