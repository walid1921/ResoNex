import InfoTaskBtn from "./buttons/InfoTaskBtn";
import UpdateChartBtn from "./buttons/UpdateChartBtn";

function BarProgress({
  percentage,
  numTasks,
  barsView,
  showBarsView,
  handleUpdateChartClick,
  openUpdateModal,
  closeUpdateModal,
  isUpdateModalOpen,
  getCurrentDay,
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3 ml-3">
        <p className="text-sm">Today's Progress</p>
        <div className="w-[200px]">
          <div className="w-[100%] h-1 rounded-full bg-[rgba(58,111,240,0.20)]">
            <div
              className={`${
                percentage <= 25
                  ? "bg-[rgb(255,51,51,0.5)]"
                  : percentage <= 60
                  ? "bg-[rgb(255,187,51,0.5)]"
                  : "bg-[rgb(46,204,113,0.5)]"
              } h-full rounded-full transition-all ease-in-out duration-200`}
              style={{ width: `${percentage ? percentage : 0}%` }}
            ></div>
          </div>
        </div>

        <span className="text-[13px] text-slate-400">
          {percentage ? percentage : 0}%
        </span>

        <InfoTaskBtn numTasks={numTasks} percentage={percentage} size={18} />
      </div>

      <UpdateChartBtn
        handleUpdateChartClick={handleUpdateChartClick}
        openUpdateModal={openUpdateModal}
        closeUpdateModal={closeUpdateModal}
        isUpdateModalOpen={isUpdateModalOpen}
        getCurrentDay={getCurrentDay}
        percentage={percentage}
      />
    </div>
  );
}

export default BarProgress;
