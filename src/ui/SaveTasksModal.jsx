import { BsFillExclamationCircleFill } from "react-icons/bs";
import PrimaryBtn from "./buttons/PrimaryBtn";
import SecondaryBtn from "./buttons/SecondaryBtn";
import Modal from "react-modal"; //npm install react-modal

function SaveTasksModal({
  isSavingModalOpen,
  closeSavingModal,
  handleSaveAllTasks,
}) {
  return (
    <Modal
      isOpen={isSavingModalOpen}
      onRequestClose={closeSavingModal}
      contentLabel="Save All Tasks"
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
          height: "27%",
          margin: "auto",
        },
      }}
    >
      <div className="flex flex-col h-full">
        <h2 className="flex justify-center mt-3 mb-6">
          Are you sure you want to Save all tasks?
        </h2>
        <div className="flex items-center gap-2 opacity-70 text-[13px] text-rose-400 mx-2">
          <span className="p-1 rounded-full  hover:cursor-pointer">
            <BsFillExclamationCircleFill size={13} />
          </span>
          <p>
            Your tasks will be saved but without updating the chart
          </p>
        </div>
        <div className="flex justify-center items-center my-8 gap-6">
          <PrimaryBtn onClick={handleSaveAllTasks} text={"Save"} />
          <SecondaryBtn onClick={closeSavingModal} text={"Cancel"} />
        </div>
      </div>
    </Modal>
  );
}

export default SaveTasksModal;
