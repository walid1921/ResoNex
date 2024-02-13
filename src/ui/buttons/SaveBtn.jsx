import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineSaveAlt } from "react-icons/md";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

function SaveBtn({ openSavingModal }) {
  return (
    <TooltipComponent
      content="Save All"
      position="TopCenter"
      offsetY={-5}
      animation={TooltipAnimation}
    >
      <button
        className="bg-[rgba(255,187,51,0.64)] p-1 rounded-full"
        onClick={openSavingModal}
      >
        <MdOutlineSaveAlt size={11} />
      </button>
    </TooltipComponent>
  );
}

export default SaveBtn;
