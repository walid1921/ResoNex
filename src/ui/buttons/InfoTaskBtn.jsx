import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { BsFillExclamationCircleFill } from "react-icons/bs";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

function InfoTaskBtn({ numTasks, percentage, size = 18 }) {
  return (
    <TooltipComponent
      content={
        numTasks
          ? `You have ${numTasks} Tasks | ${percentage}%`
          : `Let's get started`
      }
      position="TopCenter"
      offsetY={-5}
      animation={TooltipAnimation}
    >
      <div className="p-1 rounded-full opacity-50 hover:opacity-100 hover:cursor-pointer">
        <BsFillExclamationCircleFill size={size} />
      </div>
    </TooltipComponent>
  );
}

export default InfoTaskBtn;
