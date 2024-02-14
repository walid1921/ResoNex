import SecondaryBtn from "../buttons/SecondaryBtn";
import ModalWindow from "./ModalWindow";

function DetailsTaskModal({
  selectedTask,
  closeTask,
  tasksData,
  handleDeleteTask,
  openEditModal,
}) {
  return (
    <ModalWindow isModalOpen={selectedTask !== null} closeModal={closeTask}>
      <div className="flex flex-col h-full w-[450px] my-4">
        {selectedTask !== null && (
          <div
            className="flex flex-col justify-between h-full px-3"
            key={selectedTask}
          >
            <h2 className="text-xl text-center mb-5 pb-5 border-b-1 border-slate-600">
              {tasksData
                .filter((task) => task._id === selectedTask)
                .map((task) => task.title)}
            </h2>

            <div className="mx-4">
              <p className=" mt-4 mb-10">
                {
                  tasksData.find((task) => task._id === selectedTask)
                    .description
                }
              </p>
              <div className="flex justify-between items-center ">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-[20px] h-[4px] rounded-sm cursor-pointer ${
                      tasksData.find((task) => task._id === selectedTask)
                        .status === "Done"
                        ? "bg-[#5fcf65a3]"
                        : tasksData.find((task) => task._id === selectedTask)
                            .status === "Pending"
                        ? "bg-[#c4b131a2] animate-lightInfinite"
                        : ""
                    }`}
                  ></div>

                  <p className="text-sm">
                    {tasksData.find((task) => task._id === selectedTask).status}
                  </p>
                </div>

                <div className="text-slate-400 text-sm">
                  {tasksData.find((task) => task._id === selectedTask).date}
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center mt-8 gap-6">
              <button
                className="border border-[#ffbb33] hover:bg-[#ffbb33] bg-[#d19b31] px-4 py-2 rounded-md text-sm transition-all ease-in duration-150 hover:opacity-75 gap-2"
                onClick={() => openEditModal(selectedTask)}
              >
                Edit
              </button>
              <button
                className="border border-[#ff3333] hover:bg-[#ff4d4dde] bg-[#ff4d4dad] px-4 py-2 rounded-md text-sm transition-all ease-in duration-150 hover:opacity-75 gap-2"
                onClick={() => handleDeleteTask(selectedTask)}
              >
                Delete
              </button>
              <SecondaryBtn onClick={closeTask} text={"Cancel"} />
            </div>
          </div>
        )}
      </div>
    </ModalWindow>
  );
}

export default DetailsTaskModal;
