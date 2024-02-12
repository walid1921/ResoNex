import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { LuHistory } from "react-icons/lu";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

function ChartHistoryBtn({ openChartHistoryModal }) {
  return (
    <TooltipComponent
      content="See All your Chart History"
      position="TopCenter"
      offsetY={-5}
      animation={TooltipAnimation}
    >
      <button
        className="border border-[#ffbb33] hover:bg-[rgba(255,187,51,0.75)] hover:text-white text-[#ffbb33] px-2 py-2 rounded-md flex items-center gap-2 transition-all ease-in-out duration-300"
        onClick={openChartHistoryModal}
      >
        <LuHistory size={15} /> Chart History
      </button>
    </TooltipComponent>
  );
}

export default ChartHistoryBtn;
