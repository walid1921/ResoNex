import SecondaryBtn from "./buttons/SecondaryBtn";
import Modal from "react-modal"; //npm install react-modal

function DeleteAllTasksModal({
  isDeleteModalOpen,
  closeDeleteModal,
  handleDeleteAllTasks,
}) {
  return (
    <Modal
      isOpen={isDeleteModalOpen}
      onRequestClose={closeDeleteModal}
      contentLabel="Delete All Tasks"
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
          Are you sure you want to delete all tasks?
        </h2>
        <div className="flex justify-center items-center my-8 gap-6">
          <button
            className="border border-[#ff3333] hover:bg-[#ff4d4dde] bg-[#ff4d4dad] px-4 py-2 rounded-md text-sm transition-all ease-in duration-150 hover:opacity-75 gap-2"
            onClick={handleDeleteAllTasks}
          >
            Delete
          </button>
          <SecondaryBtn onClick={closeDeleteModal} text={"Cancel"} />
        </div>
      </div>
    </Modal>
  );
}

export default DeleteAllTasksModal;
