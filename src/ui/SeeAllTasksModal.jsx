import SecondaryBtn from "./buttons/SecondaryBtn";
import Modal from "react-modal"; //npm install react-modal

function SeeAllTasksModal({ closeAllTasksModal, allTasksOpen, savedTasks }) {
  return (
    <Modal
      isOpen={allTasksOpen}
      onRequestClose={closeAllTasksModal}
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
          width: "35%",
          height: "80%",
          margin: "auto",
        },
      }}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="overflow-y-scroll custom-scrollbar">
          <h2 className="flex justify-center mt-3">Saved Tasks</h2>
          <div className="mt-10 mr-3">
            {savedTasks.map((task) => (
              <div key={task.id} className="flex flex-col justify-center mt-8">
                <div className="flex justify-center gap-5 border-b pb-4 border-slate-400 text-slate-400">
                  <p>Saved: {task.savedDay}</p>
                  <p
                    className={`${
                      task.percentage <= 25
                        ? "text-[rgb(255,51,51,0.5)]"
                        : task.percentage <= 60
                        ? "text-[rgb(255,187,51,0.5)]"
                        : "text-[rgb(46,204,113,0.5)]"
                    }`}
                  >
                    {task.percentage}%
                  </p>
                </div>
                <div className="flex justify-center mb-2 flex-col text-center">
                  {task.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex justify-between mt-4 mx-5 text-sm"
                    >
                      <p>{task.title}</p>

                      {task.status === "Done" ? (
                        <>
                          <p className="text-[10px] text-slate-400">
                            {task.date}
                          </p>
                          <p className="text-green-600 bg-[rgba(22,163,74,0.2)] border-green-800 text-[10px] border px-1 rounded-md">
                            {task.status}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-[10px] text-slate-400">
                            {task.date}
                          </p>
                          <p className="bg-[#ffbb3333] border-[#ffbb33a3] text-[#ffbb33a3] text-[10px] border px-1 rounded-md">
                            {task.status}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <SecondaryBtn onClick={closeAllTasksModal} text={"Close"} />
        </div>
      </div>
    </Modal>
  );
}

export default SeeAllTasksModal;
