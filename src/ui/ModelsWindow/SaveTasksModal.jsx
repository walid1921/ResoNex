import { BsFillExclamationCircleFill } from "react-icons/bs";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import ModalWindow from "./ModalWindow";

function SaveTasksModal({
  isSavingModalOpen,
  closeSavingModal,
  handleSaveAllTasks,
}) {
  return (
    <ModalWindow isModalOpen={isSavingModalOpen} closeModal={closeSavingModal}>
      <div className="flex flex-col h-full my-4">
        <h2 className="flex justify-center mt-3 mb-6">
          Are you sure you want to Save all tasks?
        </h2>
        <div className="flex items-center gap-2 opacity-70 text-[13px] text-rose-400 mx-2">
          <span className="p-1 rounded-full  hover:cursor-pointer">
            <BsFillExclamationCircleFill size={13} />
          </span>
          <p>Your tasks will be saved but without updating the chart</p>
        </div>
        <div className="flex justify-center items-center mt-8 gap-6">
          <PrimaryBtn onClick={handleSaveAllTasks} text={"Save"} />
          <SecondaryBtn onClick={closeSavingModal} text={"Cancel"} />
        </div>
      </div>
    </ModalWindow>
  );
}

export default SaveTasksModal;
