import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import ModalWindow from "./ModalWindow";

function AddTaskFormModal({
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
    <ModalWindow isModalOpen={isAddModalOpen} closeModal={closeAddModal}>
      <div className="flex flex-col mx-3 w-[400px]">
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
    </ModalWindow>
  );
}

export default AddTaskFormModal;
