import { TooltipComponent } from "@syncfusion/ej2-react-popups";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

function SortTasksBtn({ sortBy, handleSortChange }) {
  return (
    <TooltipComponent
      content="Sort"
      position="TopCenter"
      offsetY={-5}
      animation={TooltipAnimation}
    >
      <select
        className=" hover:cursor-pointer px-2 py-[1px] rounded-full w-[85px] text-[#fff] font-extralight"
        value={sortBy}
        onChange={(e) => handleSortChange(e.target.value)}
        style={{ backgroundColor: "#76829285" }}
      >
        <option value="pending">Pending</option>
        <option value="done">Done</option>
        <option value="date">Date</option>
      </select>
    </TooltipComponent>
  );
}

export default SortTasksBtn;
