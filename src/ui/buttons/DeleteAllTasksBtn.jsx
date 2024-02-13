import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { HiOutlineMinusSm } from "react-icons/hi";


let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

function DeleteAllTasksBtn({ openDeleteModal }) {
  return (
    <TooltipComponent
      content="Delete all"
      position="TopCenter"
      offsetY={-5}
      animation={TooltipAnimation}
    >
      <button
        className="bg-[#ff4d4dad] p-1 rounded-full"
        onClick={openDeleteModal}
      >
        <HiOutlineMinusSm size={11} />
      </button>
    </TooltipComponent>
  );
}

export default DeleteAllTasksBtn;
