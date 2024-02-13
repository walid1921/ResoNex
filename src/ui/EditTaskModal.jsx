import Modal from "react-modal"; //npm install react-modal

import PrimaryBtn from "./buttons/PrimaryBtn"
import SecondaryBtn from "./buttons/SecondaryBtn"

function EditTaskModal({isEditModalOpen, closeEditModal, formData, handleTitleChange, handleDescriptionChange, handleStatusChange, handleEditTask}) {
    return (
        <Modal
                  isOpen={isEditModalOpen}
                  onRequestClose={closeEditModal}
                  contentLabel="Edit Task"
                  style={{
                    overlay: {
                      backgroundColor: "rgba(0, 0, 0, 0)",
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
                      height: "60%",
                      margin: "auto",
                      left: "60%",
                      top: "5%",
                    },
                  }}
                >
                  <div className="flex flex-col h-full mx-3">
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
                </Modal>
    )
}

export default EditTaskModal
