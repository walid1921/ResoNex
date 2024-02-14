import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { HiOutlinePlus } from "react-icons/hi";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

function AddResource({ openAddResourceModal }) {
  return (
    <TooltipComponent
      content="Add New Link"
      position="TopCenter"
      offsetY={-5}
      animation={TooltipAnimation}
    >
      <button
        className="border border-[#ffffff66] hover:border-white  border-dashed rounded-md w-[20%] py-3 justify-center items-center flex  mt-5 mx-auto transition-all ease-in-out duration-200 text-[#ffffff66] hover:text-white"
        onClick={openAddResourceModal}
      >
        <HiOutlinePlus size={11} />
      </button>
    </TooltipComponent>
  );
}

export default AddResource;
