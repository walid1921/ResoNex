import { TooltipComponent } from "@syncfusion/ej2-react-popups";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

function TaskStatus({ numDoneTasks, numPendingTasks }) {
  return (
    <div className="flex items-center gap-3 justify-end ">
      <TooltipComponent
        content={
          numDoneTasks ? `${numDoneTasks} already Done ` : `No Done Tasks`
        }
        position="TopCenter"
        offsetY={-5}
        animation={TooltipAnimation}
      >
        <div
          className={"h-3 w-3 rounded-full cursor-pointer bg-[#5fcf65a3]"}
        ></div>
      </TooltipComponent>

      <TooltipComponent
        content={
          numPendingTasks
            ? ` ${numPendingTasks} Pending Tasks`
            : `No Pending Tasks`
        }
        position="TopCenter"
        offsetY={-5}
        animation={TooltipAnimation}
      >
        <div
          className={`${
            !numPendingTasks
              ? "h-3 w-3 rounded-full cursor-pointer bg-[#c4b131a2] "
              : "h-3 w-3 rounded-full cursor-pointer bg-[#c4b131a2]  animate-lightInfinite"
          }`}
        ></div>
      </TooltipComponent>
    </div>
  );
}

export default TaskStatus;
