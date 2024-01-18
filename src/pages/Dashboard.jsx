import { HiOutlineChip } from "react-icons/hi";
import LineChart from "../ui/LineChart";

const Dashboard = ({ tasksDataChart }) => {
  return (
    <div>
      <div className=" flex items-center gap-3 mb-10">
        <HiOutlineChip size={25} />
        <h2 className="text-2xl font-semibold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
          Dashboard
        </h2>
      </div>
      <div className="w-[500px]">
        <LineChart tasksDataChart={tasksDataChart} />
      </div>
    </div>
  );
};

export default Dashboard;
