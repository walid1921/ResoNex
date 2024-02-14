import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import ModalWindow from "./ModalWindow";

function EditTaskModal({
  isEditModalOpen,
  closeEditModal,
  formData,
  handleTitleChange,
  handleDescriptionChange,
  handleStatusChange,
  handleEditTask,
}) {
  return (
    <ModalWindow isModalOpen={isEditModalOpen} closeModal={closeEditModal}>
      <div className="flex flex-col h-full mx-3 w-[400px] my-4">
        <h2 className="text-xl">Edit Task</h2>

        <label className="mt-8">Title:</label>
        <input
          className="p-2 rounded-md bg-transparent border border-slate-600 mt-2"
          type="text"
          value={formData.title}
          onChange={handleTitleChange}
        />

        <label className="mt-8">Description:</label>
        <textarea
          rows={5}
          className="p-2 resize-none rounded-md bg-transparent border border-slate-600 mt-2"
          value={formData.description}
          onChange={handleDescriptionChange}
        />

        <label className="mt-8">Status:</label>
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

        <div className="flex justify-center items-center mt-6 gap-3">
          <PrimaryBtn onClick={handleEditTask} text={"Save"} />
          <SecondaryBtn onClick={closeEditModal} text={"Cancel"} />
        </div>
      </div>
    </ModalWindow>
  );
}

export default EditTaskModal;
