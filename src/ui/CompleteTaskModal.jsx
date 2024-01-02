import PrimaryBtn from "./buttons/PrimaryBtn"
import SecondaryBtn from "./buttons/SecondaryBtn"
import Modal from "react-modal"; //npm install react-modal


function CompleteTaskModal({isCompletedModalOpen, closeCompletedModal, formData, handleStatusChange, handleCompleted}) {
    return (
        <Modal
                  isOpen={isCompletedModalOpen}
                  onRequestClose={closeCompletedModal}
                  contentLabel="Complete Task"
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
                      height: "30%",
                      margin: "auto",
                    },
                  }}
                >
                  <div className="flex flex-col h-full">
                    <label className="flex justify-center my-6">
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

                    <div className="flex justify-center items-center my-8 gap-3">
                      <PrimaryBtn onClick={handleCompleted} text={"Save"} />

                      <SecondaryBtn
                        onClick={closeCompletedModal}
                        text={"Cancel"}
                      />
                    </div>
                  </div>
                </Modal>
    )
}

export default CompleteTaskModal
