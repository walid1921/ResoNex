import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { hasChartBeenUpdatedToday } from "../utils/utils";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getCurrentDay = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  const dayIndex = now.getDay();
  return daysOfWeek[dayIndex];
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

//! Task API
const useTaskAPI = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tasksData, setTasksData] = useState([]);
  const [savedTasks, setSavedTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [completed, setCompleted] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasksDataChart, setTasksDataChart] = useState([]);
  const [chartHistory, setChartHistory] = useState([]);

  const [date, setDate] = useState(getCurrentDate());
  const [sortBy, setSortBy] = useState("all");
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [barsView, setBarsView] = useState(false);
  const [loading, setLoading] = useState(0);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isSavingModalOpen, setIsSavingModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [allTasksOpen, setAllTasksOpen] = useState(false);
  const [chartHistoryOpen, setChartHistoryOpen] = useState(false);

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

  const numTasks = tasksData.length;
  const numDoneTasks = tasksData.filter(
    (task) => task.status === "Done"
  ).length;
  const numPendingTasks = tasksData.filter(
    (task) => task.status === "Pending"
  ).length;
  const percentage = Math.round((numDoneTasks / numTasks) * 100);

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

  //! Modals handlers
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

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
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

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
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
  }; //!

  //! Fetch tasks data
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/tasks`);
      setTasksData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  //! Fetch savedTasks
  const fetchSavedTasksData = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/savedTasks`);
      setSavedTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  //! Add a Task
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

  //! Edit a Task
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
            icon: "⏳",
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

  //! Fetch tasks data for chart
  const fetchChartData = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/percentages`);
      setTasksDataChart(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  //! Fetch chart History data
  const fetchChartHistoryData = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/chartHistory`);
      setChartHistory(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  //! Delete All Tasks in the to do list
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

  //! Save All Tasks from (to do list) to All tasks list (savedTasks)
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

  useEffect(() => {
    fetchData();
    fetchSavedTasksData();
    fetchChartData();
    fetchChartHistoryData();
  }, [fetchData, fetchSavedTasksData, fetchChartData, fetchChartHistoryData]);

  return {
    tasksData,
    savedTasks,
    tasksDataChart,
    chartHistory,
    date,
    numTasks,
    percentage,
    isAddModalOpen,
    isEditModalOpen,
    isUpdateModalOpen,
    isSavingModalOpen,
    isDeleteModalOpen,
    openEditModal,
    openCompletedModal,
    isCompletedModalOpen,
    openAddModal,
    openUpdateModal,
    openSavingModal,
    openDeleteModal,
    closeEditModal,
    closeAddModal,
    closeUpdateModal,
    closeSavingModal,
    closeDeleteModal,
    closeCompletedModal,
    handleAddTask,
    handleEditTask,
    handleCompleted,
    handleUpdateChartClick,
    handleSaveAllTasks,
    handleDeleteAllTasks,
    formData,
    numDoneTasks,
    numPendingTasks,
    getCurrentDay,
    openChartHistoryModal,
    openAllTasksModal,
    handleSortChange,
    handleTitleChange,
    handleDescriptionChange,
    handleStatusChange,
    handleDateChange,
    handleDeleteTask,
    handleSaveProgress,
    openTask,
    closeTask,
    closeAllTasksModal,
    handleDeleteAllSavedTasks,
    closeChartHistoryModal,
    selectedTask,
    sortBy,
    allTasksOpen,
    setAllTasksOpen,
    chartHistoryOpen,
    setChartHistoryOpen,
    isLoading,
    loading,
    showBarsView,
    barsView,
  };
};

export default useTaskAPI;
