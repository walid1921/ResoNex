import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { HiOutlinePlus, HiOutlineMinusSm } from "react-icons/hi";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import ToDoCard from "../ui/ToDoCard";
import Modal from "react-modal"; //npm install react-modal
import { useState } from "react";
import PrimaryBtn from "../ui/buttons/PrimaryBtn";
import SecondaryBtn from "../ui/buttons/SecondaryBtn";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; //npm install react-circular-progressbar
import "react-circular-progressbar/dist/styles.css"; // Import the styles
import toast from "react-hot-toast";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

const ToDoList = () => {
  const [tasksData, setTasksData] = useState([
    {
      id: 1,
      title: "Complete Project A",
      description: "Finish all the tasks related to Project A.",
      date: "10/12/23 14:30",
      status: "Done",
    },
    {
      id: 2,
      title: "Review Meeting",
      description: "Discuss the project status with the team.",
      date: "10/12/23 15:45",
      status: "Pending",
    },
    {
      id: 3,
      title: "Prepare Presentation",
      description: "Create a presentation for the upcoming client meeting.",
      date: "10/12/23 12:00",
      status: "Pending",
    },
    {
      id: 4,
      title: "Call with Client",
      description: "Schedule and conduct a call with the client.",
      date: "10/12/23 16:30",
      status: "Done",
    },
    {
      id: 5,
      title: "Update Documentation",
      description: "Revise and update project documentation.",
      date: "10/12/23 11:15",
      status: "Pending",
    },
    {
      id: 6,
      title: "Team Training",
      description: "Conduct a training session for the team.",
      date: "10/12/23 14:30",
      status: "Done",
    },
    {
      id: 7,
      title: "Project Planning",
      description: "Plan tasks and milestones for the next project phase.",
      date: "10/12/23 09:00",
      status: "Pending",
    },
    {
      id: 8,
      title: "Code Review",
      description: "Review and provide feedback on the team's code.",
      date: "10/12/23 13:45",
      status: "Done",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const [date, setDate] = useState(getCurrentDate());

  const [sortBy, setSortBy] = useState("pending");
  const [selectedTask, setSelectedTask] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const numTasks = tasksData.length;
  const numDoneTasks = tasksData.filter(
    (task) => task.status === "Done"
  ).length;
  const numPendingTasks = tasksData.filter(
    (task) => task.status === "Pending"
  ).length;
  const percentage = Math.round((numDoneTasks / numTasks) * 100);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (taskId) => {
    setEditingTask(taskId);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingTask(null);
    setIsEditModalOpen(false);
  };

  //! Edit Task
  const handleEditTask = () => {
    const updatedTasks = tasksData.map((task) =>
      task.id === editingTask
        ? {
            ...task,
            title: formData.title,
            description: formData.description,
            date: date,
            status: formData.status,
          }
        : task
    );

    setTasksData(updatedTasks);

    setFormData({
      title: "",
      description: "",
      status: "Pending",
    });

    closeEditModal();
    toast.success("Task Edited Successfully");
  };

  //! Add Task
  const handleAddTask = () => {
    const newTask = {
      id: tasksData.length + 1,
      title: formData.title,
      description: formData.description,
      date: getCurrentDate(),
      status: formData.status,
    };

    setTasksData([...tasksData, newTask]);

    setFormData({
      title: "",
      description: "",
      status: "Pending",
    });

    closeAddModal();
    toast.success("Task Added Successfully");
  }; //!

  //! Delete Task
  const handleDeleteTask = (id) => {
    const filteredTasks = tasksData.filter((task) => task.id !== id);
    setTasksData(filteredTasks);
    closeTask();
    toast.success("Task Deleted Successfully");
  }; //!

  //! Delete All Tasks
  const handleDeleteAllTasks = () => {
    setTasksData([]);
    closeDeleteModal();
    toast.success("All Tasks Deleted Successfully");
  }; //!

  //! handle change
  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleStatusChange = (e) => {
    setFormData({ ...formData, status: e.target.value });
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  }; //!

  //! Sort Tasks

  const handleSortChange = (value) => {
    setSortBy(value);

    // Apply sorting logic based on the selected option
    let sortedTasks;

    if (value === "done") {
      sortedTasks = tasksData
        .slice()
        .sort((a, b) => a.status.localeCompare(b.status));
    } else if (value === "date") {
      sortedTasks = tasksData
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date));
    } else if (value === "pending") {
      sortedTasks = tasksData
        .slice()
        .sort((a, b) => b.status.localeCompare(a.status));
    } else {
      sortedTasks = tasksData
        .slice()
        .sort((a, b) => b.status.localeCompare(a.status));
    }

    // Set the sorted tasks back to the state
    setTasksData(sortedTasks);
  };

  //! See Task Details and Delete and Edit
  const openTask = (taskId) => {
    setSelectedTask(taskId);
  };

  const closeTask = () => {
    setSelectedTask(null);
  }; //!

  return (
    <div>
      <h2>To Do List</h2>

      <div className="mt-10 justify-center items-center h-[540px]  flex gap-10 ">
        <div className=" h-full w-[60%] rounded-md border border-slate-600">
          <div className="flex items-center justify-between  mt-5 mx-5 ">
            <div className="flex flex-col gap-6">
              <div className="flex gap-3 items-center">
                <h3 className="text-lg">Your Tasks</h3>

                <TooltipComponent
                  content={
                    numTasks
                      ? `You have ${numTasks} Tasks | ${percentage}%`
                      : `Let's get started`
                  }
                  position="TopCenter"
                  offsetY={-5}
                  animation={TooltipAnimation}
                >
                  <div className="p-1 rounded-full opacity-50 hover:opacity-100 hover:cursor-pointer">
                    <BsFillExclamationCircleFill size={18} />
                  </div>
                </TooltipComponent>
              </div>

              <div className="flex gap-3 ml-2">
                <TooltipComponent
                  content={
                    numDoneTasks
                      ? `${numDoneTasks} already Done `
                      : `No Done Tasks`
                  }
                  position="TopCenter"
                  offsetY={-5}
                  animation={TooltipAnimation}
                >
                  <div
                    className={
                      "h-3 w-3 rounded-full cursor-pointer bg-[#5fcf65a3]"
                    }
                  ></div>
                </TooltipComponent>

                <TooltipComponent
                  content={
                    numPendingTasks
                      ? ` ${numPendingTasks} Pending Tasks`
                      : `No Pending Tasks`
                  }
                  position="TopCenter"
                  offsetY={-5}
                  animation={TooltipAnimation}
                >
                  <div
                    className={`${
                      !numPendingTasks
                        ? "h-3 w-3 rounded-full cursor-pointer bg-[#c4b131a2] "
                        : "h-3 w-3 rounded-full cursor-pointer bg-[#c4b131a2]  animate-lightInfinite"
                    }`}
                  ></div>
                </TooltipComponent>
              </div>
            </div>
            <div className="flex gap-3">
              <TooltipComponent
                content="Sort"
                position="TopCenter"
                offsetY={-5}
                animation={TooltipAnimation}
              >
                <select
                  className=" hover:cursor-pointer px-2 py-[1px] rounded-md w-[85px] text-[#fff] font-extralight"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  style={{ backgroundColor: "#76829285" }}
                >
                  <option value="pending">Pending</option>
                  <option value="done">Done</option>
                  <option value="date">Date</option>
                </select>
              </TooltipComponent>

              <TooltipComponent
                content="Delete all"
                position="TopCenter"
                offsetY={-5}
                animation={TooltipAnimation}
              >
                <button
                  className="bg-[#ff4d4dad] p-1 rounded-md"
                  onClick={openDeleteModal}
                >
                  <HiOutlineMinusSm size={11} />
                </button>
              </TooltipComponent>

              <TooltipComponent
                content="Add"
                position="TopCenter"
                offsetY={-5}
                animation={TooltipAnimation}
              >
                <button
                  className="bg-[rgba(58,111,240,0.60)] p-1 rounded-md"
                  onClick={openAddModal}
                >
                  <HiOutlinePlus size={11} />
                </button>
              </TooltipComponent>

              {/* Adding Window Form */}
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

              {/* Deleting all tasks Confirmation */}

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

              {/* Task Details */}
              <Modal
                isOpen={selectedTask !== null}
                onRequestClose={closeTask}
                contentLabel="Task Details"
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
                    height: "49%",
                    margin: "auto",
                  },
                }}
              >
                <div className="flex flex-col h-full ">
                  {selectedTask !== null && (
                    <div
                      className="flex flex-col justify-between h-full px-3"
                      key={selectedTask}
                    >
                      <h2 className="text-xl text-center my-5 pb-5 border-b-1 border-slate-600">
                        {tasksData
                          .filter((task) => task.id === selectedTask)
                          .map((task) => task.title)}
                      </h2>

                      <div>
                        <p className="text-center mb-10">
                          {
                            tasksData.find((task) => task.id === selectedTask)
                              .description
                          }
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-[20px] h-[4px] rounded-sm cursor-pointer ${
                                tasksData.find(
                                  (task) => task.id === selectedTask
                                ).status === "Done"
                                  ? "bg-[#5fcf65a3]"
                                  : tasksData.find(
                                      (task) => task.id === selectedTask
                                    ).status === "Pending"
                                  ? "bg-[#c4b131a2] animate-lightInfinite"
                                  : ""
                              }`}
                            ></div>

                            <p className="text-sm">
                              {
                                tasksData.find(
                                  (task) => task.id === selectedTask
                                ).status
                              }
                            </p>
                          </div>

                          <div className="text-slate-400 text-sm">
                            {
                              tasksData.find((task) => task.id === selectedTask)
                                .date
                            }
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center items-center my-8 gap-6">
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
              </Modal>

              {/* Edit Task */}
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
            </div>
          </div>

          <div className="flex flex-wrap gap-5 justify-center mt-8 h-[78%] overflow-y-scroll custom-scrollbar mr-3">
            {tasksData.map((task) => (
              <ToDoCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                date={task.date}
                status={task.status}
                handleDeleteTask={handleDeleteTask}
                openTask={openTask}
              />
            ))}
          </div>
        </div>

        <div className=" h-full flex justify-center items-end w-[40%] border border-slate-600 rounded-md">
          <TooltipComponent
            content={
              numTasks
                ? `You have ${numTasks} tasks to do | ${percentage}%`
                : `Let's get started`
            }
            position="TopCenter"
            offsetY={-5}
            animation={TooltipAnimation}
          >
            <div className="w-20 h-20">
              <CircularProgressbar
                value={percentage}
                text={numTasks ? `${percentage}%` : "0%"}
                styles={buildStyles({
                  textSize: "14px",
                  pathTransitionDuration: 0.5,
                  textColor: "#fff",
                  pathColor: `rgba(255, 255, 255, ${
                    numTasks ? percentage / 100 : 0
                  })`,
                  trailColor: "#38444d",
                })}
              />
            </div>
          </TooltipComponent>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
