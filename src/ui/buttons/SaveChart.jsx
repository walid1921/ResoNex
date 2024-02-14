import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineSaveAlt } from "react-icons/md";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

function SaveChart({ handleSaveProgress }) {
  return (
    <TooltipComponent
      content="Save this Week Progress"
      position="TopCenter"
      offsetY={-5}
      animation={TooltipAnimation}
    >
      <button
        className="text-[10px] border border-[#3654ff] hover:bg-[#3a6ef0cb] bg-[#3a6df0] px-2 py-2 rounded-md flex gap-2 transition-all ease-in duration-150"
        onClick={handleSaveProgress}
      >
        <MdOutlineSaveAlt size={15} /> Save Progress
      </button>
    </TooltipComponent>
  );
}

export default SaveChart;
