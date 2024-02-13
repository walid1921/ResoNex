import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { HiOutlineMinusSm } from "react-icons/hi";
import Modal from "react-modal"; //npm install react-modal
import SecondaryBtn from "./buttons/SecondaryBtn";
import { useState } from "react";
import { BsExclamation } from "react-icons/bs";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

function ToDoCard({
  id,
  title,
  description,
  date,
  status,
  handleDeleteTask,
  openTask,
  openCompletedModal,
}) {
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);

  const truncatedDescription =
    description.length >= 30 ? `${description.slice(0, 23)}...` : description;

  const openDeleteTaskModal = () => {
    setIsDeleteTaskModalOpen(true);
  };

  const closeDeleteTaskModal = () => {
    setIsDeleteTaskModalOpen(false);
  };

  return (
    <div
      className={`flex flex-col h-[100px]  rounded-md px-5 mx-20 py-4 border ${
        status === "Done"
          ? "border-[#5fcf65a3] opacity-50 bg-[rgba(95,207,101,0.26)]"
          : "border-[#c4b131a2] bg-[rgba(148,163,184,0.26)]"
      }`}
    >
      <div className="flex items-center h-full justify-between mb-2">
        <h4 className="text-sm ">{title}</h4>

        <div className="flex items-center gap-2">
          <TooltipComponent
            content={status}
            position="TopCenter"
            offsetY={-5}
            animation={TooltipAnimation}
          >
            <div
              onClick={() => openCompletedModal(id)}
              className={`w-[20px] h-[4px]  rounded-sm cursor-pointer ${
                status === "Done"
                  ? "bg-[#5fcf65a3]"
                  : status === "Pending"
                  ? "bg-[#c4b131a2] animate-lightInfinite"
                  : ""
              }`}
            ></div>
          </TooltipComponent>

          <TooltipComponent
            content="See details"
            position="TopCenter"
            offsetY={-5}
            animation={TooltipAnimation}
          >
            <button
              className="bg-[#94a3b866] hover:bg-[#94a3b8b4] rounded-full"
              onClick={() => openTask(id)}
            >
              <BsExclamation size={13} />
            </button>
          </TooltipComponent>

          <TooltipComponent
            content="Delete"
            position="TopCenter"
            offsetY={-5}
            animation={TooltipAnimation}
          >
            <button
              className="bg-[#ff4d4dad] hover:bg-[#c6141d9d]  rounded-full"
              onClick={openDeleteTaskModal}
            >
              <HiOutlineMinusSm size={13} />
            </button>
          </TooltipComponent>

          {/* Delete a task */}
          <Modal
            isOpen={isDeleteTaskModalOpen}
            onRequestClose={closeDeleteTaskModal}
            contentLabel="Delete Task"
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
                height: "18%",
                margin: "auto",
              },
            }}
          >
            <div className="flex flex-col h-full">
              <h2 className="flex justify-center mt-3">
                Are you sure you want to delete this task?
              </h2>
              <div className="flex justify-center items-center my-8 gap-3">
                <button
                  className="border border-[#ff3333] hover:bg-[#ff4d4dde] bg-[#ff4d4dad] px-4 py-2 rounded-md text-sm transition-all ease-in duration-150 hover:opacity-75 gap-2"
                  onClick={() => handleDeleteTask(id)}
                >
                  Delete
                </button>
                <SecondaryBtn onClick={closeDeleteTaskModal} text={"Cancel"} />
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{truncatedDescription}</p>
        <span className="text-[10px] text-slate-400">{date}</span>
      </div>
    </div>
  );
}

export default ToDoCard;
