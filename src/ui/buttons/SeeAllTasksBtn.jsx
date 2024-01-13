import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { RiDropdownList } from "react-icons/ri";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

function SeeAllTasksBtn({ openAllTasksModal }) {
  return (
    <TooltipComponent
      content="See All Tasks"
      position="TopCenter"
      offsetY={-5}
      animation={TooltipAnimation}
    >
      <button
        className="border border-[#3654ff] hover:bg-[#3a6ef0cb] bg-[#3a6df0] px-2 py-2 rounded-md flex items-center gap-2 transition-all ease-in-out duration-300"
        onClick={openAllTasksModal}
      >
        <RiDropdownList size={15} /> All Tasks
      </button>
    </TooltipComponent>
  );
}

export default SeeAllTasksBtn;
