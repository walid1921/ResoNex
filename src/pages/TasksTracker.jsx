import ToDoCard from "../ui/ToDoCard";
import { useState, useEffect } from "react";
import { HiOutlineClipboardList } from "react-icons/hi";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; //npm install react-circular-progressbar
import "react-circular-progressbar/dist/styles.css";
// import {Line} from "react-progress-bar"; // npm install react-progress-bar
import ProgressBar from "react-progress-bar-plus";
import "react-progress-bar-plus/lib/progress-bar.css";
import toast from "react-hot-toast";
import BarChart from "../ui/BarChart";
import LineChart from "../ui/LineChart";
import Spinner from "../ui/Spinner";
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
import ChartHistoryBtn from "../ui/buttons/ChartHistoryBtn";
import axios from "axios";
import ChartHostory from "../ui/ChartHistoryModel";
import ChartHistory from "../ui/ChartHistoryModel";
import SaveChart from "../ui/buttons/saveChart";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
  editTask,
  tasksDataChart,
  setTasksDataChart,
  savedTasks,
  setSavedTasks,
  chartHistory,
  setChartHistory,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const [date, setDate] = useState(getCurrentDate());

  const [sortBy, setSortBy] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isSavingModalOpen, setIsSavingModalOpen] = useState(false);
  const [allTasksOpen, setAllTasksOpen] = useState(false);
  const [chartHistoryOpen, setChartHistoryOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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

    const todayTasks = tasksData.filter((task) => {
      const taskDay = task.day; // or task.date.split(" ")[0];
      return taskDay === today;
    });

    const totalTasks = todayTasks.length;
    const doneTasks = todayTasks.filter(
      (task) => task.status === "Done"
    ).length;

    const percentage = totalTasks === 0 ? 0 : (doneTasks / totalTasks) * 100;

    return percentage;
  };

  //! Update the chart data for the current day
  const handleUpdateChartClick = async () => {
    // A check using localStorage to see if the current date is different from the last update date stored in localStorage. If it's different, the chart gets updated, and the current date is stored as the last update date. If it's the same, it means the chart has already been updated today, and a message is shown. This ensures that the chart gets updated only once per day.

    if (!hasChartBeenUpdatedToday()) {
      const newPercentage = calculatePercentageForToday();
      const date = getCurrentDay();

      try {
        const response = await axios.post(`${BACKEND_URL}/percentages`, {
          percentage: newPercentage,
          date,
        });

        if (response.status === 200) {
          setTasksDataChart([...tasksDataChart, response.data]);

          toast.success("Chart Updated with Today's Percentage!");
          setIsLoading(false);
        } else {
          toast.error("Failed to update Chart");
        }
      } catch (error) {
        console.error("Error updating Chart:", error);
        toast.error("Failed to update Chart");
      } finally {
        closeEditModal();
      }

      // Save the current date as the last update date
      localStorage.setItem("lastUpdateDate", getCurrentDate().split(" ")[0]);
    } else {
      toast.error("Chart already updated today!");
    }

    handleSaveAllTasks();
    closeUpdateModal();
  };

  // !

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

  const openChartHistoryModal = () => {
    setChartHistoryOpen(true);
  };

  const closeChartHistoryModal = () => {
    setChartHistoryOpen(false);
  };

  //! Edit Completed Task
  const handleCompleted = async () => {
    setIsLoading(true);

    try {
      // Send a PUT request to update the completion status on the backend
      const response = await axios.put(`${BACKEND_URL}/tasks/${completed}`, {
        status: formData.status,
      });

      // Handle the response from the backend
      if (response.status === 200) {
        // Update the local state with the edited task
        setTasksData((prevTasks) =>
          prevTasks.map((task) =>
            task._id === completed ? response.data : task
          )
        );

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

        setIsLoading(false);
      } else {
        toast.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status");
    }
  };

  //! Edit Task
  const handleEditTask = async () => {
    setIsLoading(true);

    if (formData.title.trim() === "") {
      toast.error("Title is required!");
      return;
    } else if (formData.description.trim() === "") {
      toast.error("Description is required!");
      return;
    }

    try {
      // Send a PUT request to update the task on the backend
      const response = await axios.put(
        `${BACKEND_URL}/tasks/${editingTask}`,
        formData
      );

      // Handle the response from the backend
      if (response.status === 200) {
        // Update the local state with the edited task
        setTasksData((prevTasks) =>
          prevTasks.map((task) =>
            task._id === editingTask ? response.data : task
          )
        );

        toast.success("Task updated successfully");
        setIsLoading(false);
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error editing task:", error);
      toast.error("Failed to update task");
    } finally {
      closeEditModal();
    }
  };

  //! Add Task
  const handleAddTask = async () => {
    setIsLoading(true);
    try {
      if (formData.title.trim() === "") {
        toast.error("Title is required!");
        return;
      }

      // Send a POST request to create a new task on the backend
      const response = await axios.post(`${BACKEND_URL}/tasks`, {
        title: formData.title,
        description: formData.description,
        date: getCurrentDate(),
        status: formData.status,
        day: getCurrentDay(),
      });

      // Handle the response from the backend
      if (response.status === 200) {
        // Update the local state with the newly created task
        setTasksData([...tasksData, response.data]);

        setFormData({
          title: "",
          description: "",
          status: "Pending",
        });

        closeAddModal();
        toast.success("New Task Added Successfully");
        setIsLoading(false);
      } else {
        toast.error("Failed to add a new task");
      }
    } catch (error) {
      console.error("Error adding a new task:", error);
      toast.error("Failed to add a new task");
    }
  }; //!

  //! Delete Task
  const handleDeleteTask = async (id) => {
    setIsLoading(true);

    try {
      // Send a DELETE request to delete the task on the backend
      const response = await axios.delete(`${BACKEND_URL}/tasks/${id}`);

      // Handle the response from the backend
      if (response.status === 200) {
        // Update the local state by filtering out the deleted task
        const filteredTasks = tasksData.filter((task) => task._id !== id);
        setTasksData(filteredTasks);

        closeTask();
        toast.success("Task Deleted Successfully");
        setIsLoading(false);
      } else {
        toast.error("Failed to delete the task");
      }
    } catch (error) {
      console.error("Error deleting the task:", error);
      toast.error("Failed to delete the task");
    }
  }; //!

  //! Delete All Tasks
  const handleDeleteAllTasks = async () => {
    setIsLoading(true);

    try {
      if (tasksData.length === 0) {
        toast.error("No tasks to delete!");
        return;
      }

      // Send a DELETE request to delete all tasks on the backend
      const response = await axios.delete(`${BACKEND_URL}/tasks`);

      // Handle the response from the backend
      if (response.status === 200) {
        // Update the local state by setting tasksData to an empty array
        setTasksData([]);

        closeDeleteModal();
        toast.success("All Tasks Deleted Successfully");
        setIsLoading(false);
      } else {
        toast.error("Failed to delete all tasks");
      }
    } catch (error) {
      console.error("Error deleting all tasks:", error);
      toast.error("Failed to delete all tasks");
    }
  }; //!

  //! Delete All Saved Tasks
  const handleDeleteAllSavedTasks = async () => {
    try {
      if (savedTasks.length === 0) {
        toast.error("No saved tasks to delete!");
        return;
      }

      const response = await axios.delete(`${BACKEND_URL}/savedTasks`);

      if (response.status === 200) {
        // Update the local state by setting savedTasks to an empty array
        setSavedTasks([]);

        toast.success("All Saved Tasks Deleted Successfully");
      } else {
        toast.error("Failed To Delete All Saved Tasks");
      }
    } catch (error) {
      console.error("Error Deleting All Saved Tasks:", error);
      toast.error("Failed To Delete All Saved Tasks");
    }
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
    } else if (value === "pending") {
      sortedTasks = tasksData
        .slice()
        .sort((a, b) => b.status.localeCompare(a.status));
    } else if (value === "all") {
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

  //! Save All Tasks
  const handleSaveAllTasks = async () => {
    setIsLoading(true);

    try {
      if (tasksData.length === 0) {
        toast.error("No tasks to save!");
        return;
      }

      const newSavedTask = {
        savedDay: getCurrentDate(),
        percentage,
        tasks: tasksData.map((task) => ({
          title: task.title,
          description: task.description,
          status: task.status,
          date: task.date,
          day: task.day,
        })),
      };

      // Make a POST request to save the tasks on the backend
      const response = await axios.post(
        `${BACKEND_URL}/savedTasks`,
        newSavedTask
      );

      // Handle the response from the backend if needed

      setSavedTasks([...savedTasks, response.data]);

      closeSavingModal();
      handleDeleteAllTasks();
      toast.success("Tasks Saved Successfully");

      setIsLoading(false);
    } catch (error) {
      console.error("Error saving tasks:", error);
      toast.error("Failed to save tasks");
    }
  };

  //! Delete All tasksDataChart
  const handleDeleteAllTasksDataChart = async () => {
    try {
      if (tasksDataChart.length === 0) {
        toast.error("No tasks to delete!");
        return;
      }

      // Send a DELETE request to delete all tasks on the backend
      const response = await axios.delete(`${BACKEND_URL}/percentages`);

      // Handle the response from the backend
      if (response.status === 200) {
        // Update the local state by setting tasksData to an empty array
        setTasksDataChart([]);
      } else {
        toast.error("Failed to save Chart data");
      }
    } catch (error) {
      console.error("Error saving Chart data:", error);
      toast.error("Failed to save Chart data");
    }
  }; //!

  //! Save Progress
  const handleSaveProgress = async () => {
    try {
      if (tasksDataChart.length === 0) {
        toast.error("No progress to save!");
        return;
      }

      const hasSunday = tasksDataChart.some((chart) => chart.date === "Sun");

      if (!hasSunday) {
        toast.warning(
          "You still have to wait until the end of the week to save your progress!"
        );
        return;
      }

      const newChartHistory = {
        duration: getCurrentDate(),
        weekProgress: tasksDataChart.map((chart) => ({
          date: chart.date,
          percentage: chart.percentage,
        })),
      };

      // Make a POST request to save the tasks on the backend
      const response = await axios.post(
        `${BACKEND_URL}/chartHistory`,
        newChartHistory
      );

      // Handle the response from the backend if needed

      setChartHistory([...chartHistory, response.data]);

      handleDeleteAllTasksDataChart();
      toast.success("Progress Saved in the Chart History Successfully");
    } catch (error) {
      console.error("Error saving progress:", error);
      toast.error("Failed to save progress");
    }
  };

  //! Save progress automatically when the current day is Sunday
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const currentDay = new Date().toLocaleDateString("en-US", {
  //       weekday: "short",
  //     });

  //     if (currentDay === "Sun") {
  //       handleSaveProgress();
  //     }
  //   }, 1000 * 60 * 60); // Check every hour

  //   return () => clearInterval(intervalId); // Cleanup on component unmount
  // }, [handleSaveProgress]);

  console.log(chartHistory);

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

        <div className="flex items-center gap-5">
          <ChartHistoryBtn openChartHistoryModal={openChartHistoryModal} />
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
                  handleDeleteAllSavedTasks={handleDeleteAllSavedTasks}
                />

                {/* Chart History (Modal) */}
                <ChartHistory
                  chartHistoryOpen={chartHistoryOpen}
                  setChartHistoryOpen={setChartHistoryOpen}
                  chartHistory={chartHistory}
                  closeChartHistoryModal={closeChartHistoryModal}
                />
              </div>
            </div>
          </div>

          <AddTaskBtn openAddModal={openAddModal} />

          {!tasksData ? (
            <NoTasks
              text="Error fetching tasks"
              border="border-[#ff4d4dad]"
              bg="bg-[#ff4d4d42]"
            />
          ) : isLoading ? (
            <Spinner />
          ) : tasksData.length === 0 ? (
            <NoTasks />
          ) : (
            <div
              className={`flex flex-col gap-5 mt-4 h-[78%] overflow-y-scroll custom-scrollbar mx-4`}
            >
              {tasksData.map((task) => (
                <ToDoCard
                  key={task._id}
                  id={task._id}
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

            <div className="mt-8 mb-4 w-[600px] h-[300px]">
              {barsView ? (
                <BarChart tasksDataChart={tasksDataChart} />
              ) : (
                <LineChart tasksDataChart={tasksDataChart} />
              )}
            </div>

            <SaveChart handleSaveProgress={handleSaveProgress} />
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
