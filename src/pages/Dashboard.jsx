import { HiOutlineChip } from "react-icons/hi";
import LineChart from "../ui/LineChart";
import useTaskAPI from "../services/TaskAPI";
import Slider from "../ui/Slider";
import { Spinner, TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Link } from "react-router-dom";
import TaskStatus from "../ui/buttons/TaskStatus";
import { useEffect, useState } from "react";
import TodayDate from "../ui/TodayDate";
import BarChart from "../ui/BarChart";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

const Dashboard = ({ resourcesData, resourcesFastAccess, isLoading }) => {
  console.log(resourcesData);

  const [clock, setClock] = useState(new Date().toLocaleTimeString());

  const UpdateTime = () => {
    setClock(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    const intervalId = setInterval(UpdateTime);

    return () => clearInterval(intervalId);
  }, []);

  const resourcesNum = resourcesData
    .map((resource) => resource.data.length)
    .reduce((a, b) => a + b, 0);

  const { tasksDataChart } = useTaskAPI();
  const { numDoneTasks, numPendingTasks } = useTaskAPI();

  return (
    <div>
      <div className=" flex items-center gap-3 mb-10">
        <HiOutlineChip size={25} />
        <h2 className="text-2xl font-semibold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
          Dashboard
        </h2>
      </div>
      <div className="flex gap-7">
        <div className="flex flex-col  gap-4 w-[50%]   px-5 py-8 border rounded-md border-slate-500 bg-[rgba(148,163,184,0.17)]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
              Progress Details
            </h3>{" "}
            <TaskStatus
              numDoneTasks={numDoneTasks}
              numPendingTasks={numPendingTasks}
            />
          </div>

          <LineChart tasksDataChart={tasksDataChart} />
          <BarChart tasksDataChart={tasksDataChart} />
        </div>

        <div className="flex flex-col w-[65%]  gap-10">
          <div className="flex flex-col  gap-4  px-5 py-8 border rounded-md border-slate-500 bg-[rgba(148,163,184,0.17)]">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
                All Resources{" "}
              </h3>
            </div>

            {isLoading && <Spinner />}
            <ul className="flex gap-5 ml-4 items-center my-2">
              {resourcesFastAccess.map((resource) => (
                <TooltipComponent
                  content={resource.name}
                  position="TopCenter"
                  offsetY={-5}
                  animation={TooltipAnimation}
                  key={resource.id}
                >
                  <Link
                    to={resource.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex  border opacity-50 hover:opacity-100 border-[#ffffff] hover:border-white border-dashed rounded-full p-2 mx-auto transition-all ease-in-out duration-200 text-[#ffffff] hover:text-white"
                  >
                    {resource.name === "ChatGPT" ? (
                      <img src={resource.icon} alt="ChatGPT Logo" />
                    ) : (
                      resource.icon
                    )}
                  </Link>
                </TooltipComponent>
              ))}
            </ul>

            <Slider resourcesData={resourcesData} resourcesNum={resourcesNum} />
          </div>

          <div className="flex flex-col justify-center gap-4 w-[100%]  px-5 py-8 border rounded-md border-slate-500 bg-[rgba(148,163,184,0.17)]">
            <h3 className="text-center text-6xl font-semibold  bg-gradient-to-br from-white to-[#504f4f] bg-clip-text text-transparent">
              {clock}
            </h3>
            <div className="text-center">
              <TodayDate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
