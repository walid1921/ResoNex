import ModalWindow from "./ModalWindow";
import SecondaryBtn from "../buttons/SecondaryBtn";

function DeleteAllTasksModal({
  isDeleteModalOpen,
  closeDeleteModal,
  handleDeleteAllTasks,
}) {
  return (
    <ModalWindow isModalOpen={isDeleteModalOpen} closeModal={closeDeleteModal}>
      <div className="flex flex-col w-[350px] my-4">
        <h2 className="flex justify-center ">
          Are you sure you want to delete all tasks?
        </h2>
        <div className="flex justify-center items-center mt-8 gap-6">
          <button
            className="border border-[#ff3333] hover:bg-[#ff4d4dde] bg-[#ff4d4dad] px-4 py-2 rounded-md text-sm transition-all ease-in duration-150 hover:opacity-75 gap-2"
            onClick={handleDeleteAllTasks}
          >
            Delete
          </button>
          <SecondaryBtn onClick={closeDeleteModal} text={"Cancel"} />
        </div>
      </div>
    </ModalWindow>
  );
}

export default DeleteAllTasksModal;
