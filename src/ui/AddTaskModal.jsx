import PrimaryBtn from "./buttons/PrimaryBtn";
import SecondaryBtn from "./buttons/SecondaryBtn";
import Modal from "react-modal"; //npm install react-modal

function AddTaskModal({
  isAddModalOpen,
  closeAddModal,
  formData,
  handleTitleChange,
  handleDescriptionChange,
  handleStatusChange,
  handleDateChange,
  handleAddTask,
  date,
}) {
  return (
    <Modal
      isOpen={isAddModalOpen}
      onRequestClose={closeAddModal}
      contentLabel="Add Task"
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
          height: "70%",
          margin: "auto",
        },
      }}
    >
      <div className="flex flex-col h-full mx-3">
        <h2 className="text-xl">Add Task</h2>

        <label className="mt-8">Title:</label>
        <input
          className="p-2 rounded-md bg-transparent border border-slate-600  mt-2"
          type="text"
          value={formData.title}
          onChange={handleTitleChange}
        />

        <label className="mt-8">Description:</label>
        <textarea
          rows={5}
          className="p-2 resize-none  rounded-md bg-transparent border border-slate-600  mt-2"
          value={formData.description}
          onChange={handleDescriptionChange}
        />

        <label className="mt-8">Date:</label>
        <input
          className="p-4 rounded-md bg-transparent border border-slate-600  mt-2"
          type="datetime-local"
          value={date}
          onChange={handleDateChange}
        />

        <label className="mt-8">Status:</label>
        <select
          className="p-2 rounded-md bg-transparent border border-slate-600  mt-2"
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

        <div className="flex justify-center items-center mt-6 gap-3">
          <PrimaryBtn onClick={handleAddTask} text={"Add"} />
          <SecondaryBtn onClick={closeAddModal} text={"Cancel"} />
        </div>
      </div>
    </Modal>
  );
}

export default AddTaskModal;
