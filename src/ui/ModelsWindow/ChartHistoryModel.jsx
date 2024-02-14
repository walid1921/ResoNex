import SecondaryBtn from "../buttons/SecondaryBtn";
import ModalWindow from "./ModalWindow";

function ChartHistory({
  closeChartHistoryModal,
  chartHistoryOpen,
  chartHistory,
}) {
  return (
    <ModalWindow isModalOpen={chartHistoryOpen} closeModal={closeChartHistoryModal}>
      <div className="flex flex-col h-full justify-between my-4">
        <div className="overflow-y-scroll custom-scrollbar my-3">
          <h2 className="text-lg text-center">Chart History</h2>

          <div className="mt-10 mr-3 mb-4">
            {chartHistory.length === 0 ? (
              <div className=" flex justify-center items-center  ">
                <span className="text-md text-center font-light px-6 py-6 border bg-[rgba(148,163,184,0.26)] border-[rgba(58,111,240,0.5)] text-[#ffffff6f] rounded-md">
                  No chart data has been saved yet.
                </span>
              </div>
            ) : (
              chartHistory.map((chart) => (
                <div
                  key={chart._id}
                  className="flex flex-col justify-center mt-8"
                >
                  <div className="flex justify-center gap-5 border-b pb-4 border-slate-400 text-slate-400">
                    <p>{chart.duration}</p>
                  </div>
                  <div className="flex justify-center mb-2 gap-6">
                    {chart.weekProgress.map((progress) => (
                      <div
                        key={progress._id}
                        className="flex  items-center mt-4 gap-[1px] text-sm "
                      >
                        <p>{progress.date}</p>

                        <p
                          className={`border ml-2 px-1 rounded-md text-sm ${
                            progress.percentage <= 25
                              ? "bg-[#ff4d4d57] border-[#ff4d4dad] text-red-400"
                              : progress.percentage <= 60
                              ? "bg-[#ffbb3333] border-[#ffbb33a3] text-orange-400"
                              : "bg-[#16a34a33] border-green-800 text-green-600"
                          }`}
                        >
                          {progress.percentage}%
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <SecondaryBtn onClick={closeChartHistoryModal} text={"Close"} />
        </div>
      </div>
    </ModalWindow>
  );
}

export default ChartHistory;
