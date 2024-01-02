import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdUpdate } from "react-icons/md";
import SecondaryBtn from "./SecondaryBtn";
import Modal from "react-modal"; //npm install react-modal
import PrimaryBtn from "./PrimaryBtn";
import { IoCloudDoneSharp } from "react-icons/io5";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { hasChartBeenUpdatedToday } from "../../utils/utils";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

function UpdateChartBtn({
  handleUpdateChartClick,
  openUpdateModal,
  closeUpdateModal,
  isUpdateModalOpen,
  getCurrentDay,
  percentage,
}) {
  const isChartUpdatedToday = hasChartBeenUpdatedToday();

  return (
    <>
      <TooltipComponent
        content="Update Chart for Today"
        position="TopCenter"
        offsetY={-5}
        animation={TooltipAnimation}
      >
        <button
          className="bg-[rgba(58,111,240,0.60)] p-1 rounded-full"
          onClick={openUpdateModal}
        >
          <MdUpdate size={15} />
        </button>
      </TooltipComponent>

      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={closeUpdateModal}
        contentLabel="Do you want to update the chart for today?"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(2px)",
          },
          content: {
            background: "rgba(0, 0, 0, 0.6)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            border: "1px solid rgba(0, 0, 0, 0.3)",
            color: "#fff",
            width: "25%",
            height: isChartUpdatedToday ? "18%" : "54%",
            margin: "auto",
          },
        }}
      >
        <div className="flex flex-col">
          {isChartUpdatedToday ? (
            <div className="text-green-600 bg-[rgba(22,163,74,0.2)] flex justify-center mt-3 border border-green-800 p-2 rounded-md">
              <h2 className="flex items-center gap-2 ">
                <IoCloudDoneSharp size={20} /> Chart already updated today!
              </h2>
            </div>
          ) : (
            <h2 className="flex justify-center mt-3">
              Do you want to update the chart for today?
            </h2>
          )}

          <div className="flex flex-col gap-3 mt-8">
            {isChartUpdatedToday ? (
              <></>
            ) : (
              <div className="flex flex-col gap-2 text-center border mb-6 py-4 rounded-md bg-[rgba(58,111,240,0.2)] border-[rgba(58,111,240,0.5)]">
                <p>Your Progress info for Today</p>
                <p>Day : {getCurrentDay()}</p>
                <p>
                  Progress :{" "}
                  <span className=" text-yellow-400">
                    {percentage ? percentage : 0}%
                  </span>
                </p>
              </div>
            )}

            <div className="text-[13px] text-rose-400 flex opacity-70 items-center gap-2">
              <div className="p-1 rounded-full hover:cursor-pointer">
                <BsFillExclamationCircleFill size={13} />
              </div>

              <p >
                {isChartUpdatedToday
                  ? "Next update will be the next day"
                  : "You can update only one time per day"}
              </p>
            </div>

            {isChartUpdatedToday ? (
              <></>
            ) : (
              <div className="flex items-center gap-2 opacity-70 text-[13px] text-rose-400">
                <span className="p-1 rounded-full  hover:cursor-pointer">
                  <BsFillExclamationCircleFill size={13} />
                </span>
                <p >
                  Your tasks will be saved automatically when you update the
                  chart
                </p>
              </div>
            )}
          </div>

          {isChartUpdatedToday ? (
            <></>
          ) : (
            <div className="flex justify-center items-center my-8 gap-3">
              <button
                className={`border border-[#3654ff] hover:bg-[#3a6ef0cb] bg-[#3a6df0] px-4 py-2 rounded-md text-sm transition-all ease-in duration-150 hover:opacity-75 gap-2`}
                onClick={handleUpdateChartClick}
              >
                Update
              </button>
              <SecondaryBtn onClick={closeUpdateModal} text={"Cancel"} />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default UpdateChartBtn;
