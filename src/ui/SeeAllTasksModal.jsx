import { HiOutlineSearch } from "react-icons/hi";
import SecondaryBtn from "./buttons/SecondaryBtn";
import Modal from "react-modal"; //npm install react-modal

function SeeAllTasksModal({
  closeAllTasksModal,
  allTasksOpen,
  savedTasks,
  handleDeleteAllSavedTasks,
}) {
  return (
    <Modal
      isOpen={allTasksOpen}
      onRequestClose={closeAllTasksModal}
      contentLabel="Saved All Tasks"
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
          width: savedTasks.length === 0 ? "28%" : "35%",
          height: savedTasks.length === 0 ? "35%" : "80%",
          margin: "auto",
        },
      }}
    >
      <div className="flex flex-col h-full justify-between ">
        <div className="overflow-y-scroll custom-scrollbar mx-3 my-3">
          <div className="flex items-center justify-between gap-4 mx-4 ">
            <h2 className="text-lg">Saved Tasks</h2>

            <div className="relative  text-slate-400 transition-all ease-in-out duration-300">
              <input
                type="text"
                placeholder="Search"
                name="search"
                className="border border-gray-700 focus:border-gray-700 bg-[rgba(148,163,184,0.26)]  focus:pr-16 pl-3 py-1 rounded-full text-sm focus:outline-none transition-all ease-in-out duration-300 "
              />
              <button
                type="submit"
                className="absolute right-0 top-[8px] mr-3 border-l border-slate-400 pl-2 "
              >
                <HiOutlineSearch size={16} />
              </button>
            </div>
          </div>

          <div className="mt-10 mx-6">
            {savedTasks.length === 0 ? (
              <div className=" flex justify-center items-center  ">
                <span className="text-md text-center font-light px-6 py-6 border bg-[rgba(148,163,184,0.26)] border-[rgba(58,111,240,0.5)] text-[#ffffff6f] rounded-md">
                  No saved tasks found
                </span>
              </div>
            ) : (
              savedTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex flex-col justify-center mt-8"
                >
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
                        key={task._id}
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
              ))
            )}
          </div>
        </div>

        <div className="flex justify-center mt-5 gap-4">
          <button
            className="border border-[#ff3333] hover:bg-[#ff4d4dde] bg-[#ff4d4dad] px-4 py-2 rounded-md text-sm transition-all ease-in duration-150 hover:opacity-75 gap-2"
            onClick={handleDeleteAllSavedTasks}
          >
            Delete All
          </button>
          <SecondaryBtn onClick={closeAllTasksModal} text={"Close"} />
        </div>
      </div>
    </Modal>
  );
}

export default SeeAllTasksModal;
