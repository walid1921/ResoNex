import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { HiOutlinePlus } from "react-icons/hi";

let TooltipAnimation = {
    open: { effect: "FadeIn", duration: 300, delay: 0 },
  };
  
function AddTaskBtn({ openAddModal }) {
  return (
    <TooltipComponent
      content="Add"
      position="TopCenter"
      offsetY={-5}
      animation={TooltipAnimation}
    >
      <button
        className="bg-[rgba(95,207,101,0.64)] p-1 rounded-full"
        onClick={openAddModal}
      >
        <HiOutlinePlus size={11} />
      </button>
    </TooltipComponent>
  );
}

export default AddTaskBtn;
