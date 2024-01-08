import ToDoCard from "../ui/ToDoCard";
import { useState, useEffect } from "react";
import { HiOutlineClipboardList, HiOutlineSearch } from "react-icons/hi";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; //npm install react-circular-progressbar
import "react-circular-progressbar/dist/styles.css";
// import {Line} from "react-progress-bar"; // npm install react-progress-bar
import ProgressBar from "react-progress-bar-plus";
import "react-progress-bar-plus/lib/progress-bar.css";
import toast from "react-hot-toast";
import BarChart from "../ui/BarChart";
import LineChart from "../ui/LineChart";
import TodayDate from "../ui/TodayDate";
import CompleteTaskModal from "../ui/CompleteTaskModal";
import EditTaskModal from "../ui/EditTaskModal";
import DetailsTaskModal from "../ui/DetailsTaskModal";
import DeleteAllTasksModal from "../ui/DeleteAllTasksModal";
import AddTaskModal from "../ui/AddTaskModal";
import AddTaskBtn from "../ui/buttons/AddTaskBtn";
import DeleteAllTasksBtn from "../ui/buttons/DeleteAllTasksBtn";
import SortTasksBtn from "../ui/buttons/SortTasksBtn";
import InfoTaskBtn from "../ui/buttons/InfoTaskBtn";
import NoTasks from "../ui/NoTasks";
import BarProgress from "../ui/BarProgress";
import TaskStatus from "../ui/buttons/TaskStatus";
import { hasChartBeenUpdatedToday } from "../utils/utils";
import SaveBtn from "../ui/buttons/SaveBtn";
import SaveTasksModal from "../ui/SaveTasksModal";
import SeeAllTasksModal from "../ui/SeeAllTasksModal";
import SeeAllTasksBtn from "../ui/buttons/SeeAllTasksBtn";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { LuEye } from "react-icons/lu";

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

const getCurrentDay = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  const dayIndex = now.getDay();
  return daysOfWeek[dayIndex];
};

function TasksTracker({
  tasksData,
  setTasksData,
  tasksDataChart,
  setTasksDataChart,
  savedTasks,
  setSavedTasks,
}) {
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
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isSavingModalOpen, setIsSavingModalOpen] = useState(false);
  const [allTasksOpen, setAllTasksOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [completed, setCompleted] = useState(null);

  const [barsView, setBarsView] = useState(false);

  const [loading, setLoading] = useState(0);

  const showBarsView = () => {
    setBarsView(!barsView);
  };

  useEffect(() => {
    // Simulate progress update
    const interval = setInterval(() => {
      setLoading((prevProgress) =>
        prevProgress < 100 ? prevProgress + 10 : 100
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const numTasks = tasksData.length;
  const numDoneTasks = tasksData.filter(
    (task) => task.status === "Done"
  ).length;
  const numPendingTasks = tasksData.filter(
    (task) => task.status === "Pending"
  ).length;

  const percentage = Math.round((numDoneTasks / numTasks) * 100);
  // console.log("Percentage:", percentage);

  const calculatePercentageForToday = () => {
    const today = getCurrentDay();
    console.log("Today:", today);

    const todayTasks = tasksData.filter((task) => {
      const taskDay = task.day; // or task.date.split(" ")[0];
      return taskDay === today;
    });
    console.log("Today's Tasks:", todayTasks);

    const totalTasks = todayTasks.length;
    const doneTasks = todayTasks.filter(
      (task) => task.status === "Done"
    ).length;
    console.log("Total Tasks:", totalTasks);
    console.log("Done Tasks:", doneTasks);

    const percentage = totalTasks === 0 ? 0 : (doneTasks / totalTasks) * 100;
    console.log("Today's Percentage:", percentage);

    return percentage;
  };

  //! Update the chart data for the current day
  const handleUpdateChartClick = () => {
    //A check using localStorage to see if the current date is different from the last update date stored in localStorage. If it's different, the chart gets updated, and the current date is stored as the last update date. If it's the same, it means the chart has already been updated today, and a message is shown. This ensures that the chart gets updated only once per day.

    if (!hasChartBeenUpdatedToday()) {
      const todayPercentage = calculatePercentageForToday();

      // Update the chart data for the current day
      setTasksDataChart((prevChartData) => {
        return prevChartData.map((chartItem) =>
          chartItem.day === getCurrentDay()
            ? { ...chartItem, percentage: todayPercentage }
            : chartItem
        );
      });

      toast.success("Chart Updated with Today's Percentage!");

      // Save the current date as the last update date
      localStorage.setItem("lastUpdateDate", getCurrentDate().split(" ")[0]);
    } else {
      toast.error("Chart already updated today!");
    }

    handleSaveAllTasks();
    closeUpdateModal();
  };

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

  const openCompletedModal = (taskId) => {
    setCompleted(taskId);
    setIsCompletedModalOpen(true);
  };

  const closeCompletedModal = () => {
    setCompleted(null);
    setIsCompletedModalOpen(false);
  };

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const openSavingModal = () => {
    setIsSavingModalOpen(true);
  };

  const closeSavingModal = () => {
    setIsSavingModalOpen(false);
  };

  const openAllTasksModal = () => {
    setAllTasksOpen(true);
  };

  const closeAllTasksModal = () => {
    setAllTasksOpen(false);
  };

  //! Edit Completed
  const handleCompleted = () => {
    const updatedTasks = tasksData.map((task) =>
      task.id === completed
        ? {
            ...task,
            status: formData.status,
          }
        : task
    );

    setTasksData(updatedTasks);

    setFormData({
      status: "Pending",
    });

    closeCompletedModal();

    if (formData.status === "Done") {
      toast.success("Task completed");
    } else {
      toast("Task Pending!", {
        icon: <span className="text-xl">⏳</span>,
      });
    }
  };

  //! Edit Task
  const handleEditTask = () => {
    if (formData.title.trim() === "") {
      toast.error("Title is required!");
      return;
    } else if (formData.description.trim() === "") {
      toast.error("Description is required!");
      return;
    }

    // Simulating save action
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
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

          resolve();
        }, 1000);
      }),
      {
        loading: "Saving...",
        success: <p>Task Updated!</p>,
        error: <p>Could not save.</p>,
      }
    );
  };

  //! Add Task
  const handleAddTask = () => {
    if (formData.title.trim() === "") {
      toast.error("Title is required!");
      return;
    }

    const newTask = {
      id: tasksData.length + 1,
      title: formData.title,
      description: formData.description,
      date: getCurrentDate(),
      status: formData.status,
      day: getCurrentDay(),
    };

    setTasksData([...tasksData, newTask]);

    setFormData({
      title: "",
      description: "",
      status: "Pending",
    });

    closeAddModal();
    toast.success("New Task Added Successfully");
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
    if (tasksData.length === 0) {
      toast.error("No tasks to delete!");
      return;
    }

    setTasksData([]);
    closeDeleteModal();
    toast.success("All Tasks Deleted Successfully");
  }; //!

  //! Delete All Saved Tasks
  const handleDeleteAllSavedTasks = () => {
    if (savedTasks.length === 0) {
      toast.error("No saved tasks to delete!");
      return;
    }

    setSavedTasks([]);
    toast.success("All Saved Tasks Deleted Successfully");
  }; //!

  //! handle change
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormData({ ...formData, title: newTitle });
    setIsTitleValid(newTitle.trim() !== "");
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

  //! Save Tasks
  const handleSaveAllTasks = () => {
    if (tasksData.length === 0) {
      toast.error("No tasks to save!");
      return;
    }

    const newSavedTask = {
      savedDay: getCurrentDate(),
      percentage,
      tasks: tasksData,
    };

    setSavedTasks([...savedTasks, newSavedTask]);

    closeSavingModal();
    handleDeleteAllTasks();
    toast.success("Tasks Saved Successfully");
  };

  return (
    <div>
      <ProgressBar
        className=" px-3 pt-[2px] rounded-md"
        percent={loading}
        autoIncrement
      />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold flex items-center gap-3">
          <HiOutlineClipboardList size={25} /> Task Tracker
        </h2>

        <div className="flex items-center gap-4 ">
          <div className="relative text-slate-400 transition-all ease-in-out duration-300">
            <input
              type="text"
              placeholder="Search"
              name="search"
              className="border border-gray-700 focus:border-gray-700 bg-[rgba(148,163,184,0.26)]  focus:pr-16 pl-3 py-2 rounded-full text-sm focus:outline-none transition-all ease-in-out duration-300 "
            />
            <button
              type="submit"
              className="absolute right-0 top-[10px] mr-3 border-l border-slate-400 pl-2 "
            >
              <HiOutlineSearch size={20} />
            </button>
          </div>
          <SeeAllTasksBtn openAllTasksModal={openAllTasksModal} />
        </div>
      </div>

      <div className="mt-5 justify-center items-center h-[574px]  flex gap-10 ">
        <div className=" h-full w-[50%] rounded-md border border-slate-600">
          <div className="flex items-center justify-between  mt-5 mx-5 ">
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-3 items-center">
                <h3 className="text-lg">Project Tasks</h3>

                <InfoTaskBtn numTasks={numTasks} percentage={percentage} />
              </div>

              <div className="flex items-center gap-3">
                <SortTasksBtn
                  sortBy={sortBy}
                  handleSortChange={handleSortChange}
                />

                <DeleteAllTasksBtn openDeleteModal={openDeleteModal} />

                <SaveBtn openSavingModal={openSavingModal} />

                <AddTaskBtn openAddModal={openAddModal} />

                {/* Add Task component (Modal) */}
                <AddTaskModal
                  isAddModalOpen={isAddModalOpen}
                  closeAddModal={closeAddModal}
                  formData={formData}
                  handleTitleChange={handleTitleChange}
                  handleDescriptionChange={handleDescriptionChange}
                  handleStatusChange={handleStatusChange}
                  handleDateChange={handleDateChange}
                  handleAddTask={handleAddTask}
                  date={date}
                />

                {/* Deleting all tasks Confirmation component (Modal) */}
                <DeleteAllTasksModal
                  isDeleteModalOpen={isDeleteModalOpen}
                  closeDeleteModal={closeDeleteModal}
                  handleDeleteAllTasks={handleDeleteAllTasks}
                />

                {/* Task Details components (Modal) */}
                <DetailsTaskModal
                  selectedTask={selectedTask}
                  closeTask={closeTask}
                  tasksData={tasksData}
                  handleDeleteTask={handleDeleteTask}
                  openEditModal={openEditModal}
                />

                {/* Edit a Task component (Modal) */}
                <EditTaskModal
                  isEditModalOpen={isEditModalOpen}
                  closeEditModal={closeEditModal}
                  formData={formData}
                  handleTitleChange={handleTitleChange}
                  handleDescriptionChange={handleDescriptionChange}
                  handleStatusChange={handleStatusChange}
                  handleEditTask={handleEditTask}
                />

                {/* Complete a task component (Modal) */}
                <CompleteTaskModal
                  isCompletedModalOpen={isCompletedModalOpen}
                  closeCompletedModal={closeCompletedModal}
                  formData={formData}
                  handleStatusChange={handleStatusChange}
                  handleCompleted={handleCompleted}
                />

                {/* Save Tasks component (Modal) */}
                <SaveTasksModal
                  isSavingModalOpen={isSavingModalOpen}
                  closeSavingModal={closeSavingModal}
                  handleSaveAllTasks={handleSaveAllTasks}
                />

                {/* See All Tasks (Modal) */}
                <SeeAllTasksModal
                  allTasksOpen={allTasksOpen}
                  setAllTasksOpen={setAllTasksOpen}
                  savedTasks={savedTasks}
                  closeAllTasksModal={closeAllTasksModal}
                  openAllTasksModal={openAllTasksModal}
                  handleDeleteAllSavedTasks={handleDeleteAllSavedTasks}
                />
              </div>
            </div>
          </div>

          {tasksData.length === 0 ? (
            <NoTasks />
          ) : (
            <div
              className={`flex flex-col gap-5 justify-center mt-8 pt-52 h-[82%] overflow-y-scroll custom-scrollbar mx-4`}
            >
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
                  openCompletedModal={openCompletedModal}
                  closeCompletedModal={closeCompletedModal}
                  isCompletedModalOpen={isCompletedModalOpen}
                  handleCompleted={handleCompleted}
                  selectedTask={selectedTask}
             
                />
              ))}
            </div>
          )}
        </div>

        <div className=" h-full flex flex-col w-[50%] px-4 border border-slate-600 rounded-md">
          <div className="flex justify-between items-center">
            <h3 className="text-lg mr-5 my-6">Progress Details</h3>
            <div className="flex items-center gap-5">
              <TodayDate />
              <TaskStatus
                numDoneTasks={numDoneTasks}
                numPendingTasks={numPendingTasks}
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mt-2 flex items-center justify-between">
              <BarProgress
                percentage={percentage}
                numTasks={numTasks}
                barsView={barsView}
                showBarsView={showBarsView}
                handleUpdateChartClick={handleUpdateChartClick}
                openUpdateModal={openUpdateModal}
                closeUpdateModal={closeUpdateModal}
                isUpdateModalOpen={isUpdateModalOpen}
                getCurrentDay={getCurrentDay}
              />
            </div>

            <div className="mt-8 w-[600px] h-[800px]">
              {barsView ? (
                <BarChart tasksDataChart={tasksDataChart} />
              ) : (
                <LineChart tasksDataChart={tasksDataChart} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TasksTracker;

// const chartData = {
//   labels: ["Date 1", "Date 2", "Date 3"], // Replace with your actual dates
//   datasets: [
//     {
//       label: "Time Created",
//       borderColor: "rgba(255, 99, 132, 1)",
//       backgroundColor: "rgba(255, 99, 132, 0.2)",
//       data: [10, 20, 30], // Replace with your actual data
//     },
//     {
//       label: "Time Finished",
//       borderColor: "rgba(75, 192, 192, 1)",
//       backgroundColor: "rgba(75, 192, 192, 0.2)",
//       data: [15, 25, 35], // Replace with your actual data
//     },
//     {
//       label: "Spent Time",
//       borderColor: "rgba(255, 206, 86, 1)",
//       backgroundColor: "rgba(255, 206, 86, 0.2)",
//       data: [5, 5, 5], // Replace with your actual data
//     },
//   ],
// };

// const chartOptions = {
//   scales: {
//     x: {
//       type: "time",
//       time: {
//         unit: "day", // You can customize the time unit
//       },
//     },
//     y: {
//       beginAtZero: true,
//     },
//   },
// };
