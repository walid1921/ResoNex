import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BACKEND_URL = "http://localhost:5001/api";

const useTaskAPI = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasksData, setTasksData] = useState([]);

  //! Fetch data from the backend
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
  
  //! Edit task
  const editTask = useCallback(async (taskId, updatedTask) => {
    try {
      setIsLoading(true);
      const response = await axios.put(`${BACKEND_URL}/tasks/${taskId}`, updatedTask);
      setTasksData((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? response.data : task))
      );
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Error editing task:", error);
      toast.error("Failed to update task");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    editTask()
  }, [fetchData, editTask]);

  return {
    isLoading,
    error,
    tasksData,
    setTasksData,
    editTask,
  };
};

export default useTaskAPI;
