import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import ModalWindow from "./ModalWindow";

function CompleteTaskModal({
  isCompletedModalOpen,
  closeCompletedModal,
  formData,
  handleStatusChange,
  handleCompleted,
}) {
  return (
    <ModalWindow
      isModalOpen={isCompletedModalOpen}
      closeModal={closeCompletedModal}
    >
      <div className="flex flex-col h-full w-[300px] my-4">
        <label className="flex justify-center mb-6">
          Update your task status
        </label>
        <select
          className="p-2 rounded-md bg-transparent border border-slate-600 mt-2"
          value={formData.status}
          onChange={handleStatusChange}
        >
          <option className="text-black" value="Pending">
            Pending
          </option>
          <option className="text-black" value="Done">
            Done
          </option>
        </select>

        <div className="flex justify-center items-center mt-8 gap-3">
          <PrimaryBtn onClick={handleCompleted} text={"Save"} />

          <SecondaryBtn onClick={closeCompletedModal} text={"Cancel"} />
        </div>
      </div>
    </ModalWindow>
  );
}

export default CompleteTaskModal;
