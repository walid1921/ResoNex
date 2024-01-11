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
        className="border border-[#ffffff66] hover:border-white  border-dashed rounded-md w-[62%] py-3 justify-center items-center flex  mt-5 mx-auto transition-all ease-in-out duration-300 text-[#ffffff66] hover:text-white"
        onClick={openAddModal}
      >
        <HiOutlinePlus size={11} />
      </button>
    </TooltipComponent>
  );
}

export default AddTaskBtn;
