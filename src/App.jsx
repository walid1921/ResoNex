import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Tracker from "./pages/CodingTracker";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import Account from "./pages/Account";
import ToDoList from "./pages/TasksTracker";
import Resources from "./pages/Resources";
import Calendar from "./pages/Calendar";
import toast, { Toaster } from "react-hot-toast"; // npm i react-hot-toast (you can check the docs for more customization options)
import { useEffect, useState } from "react";
import axios from "axios";
import ResourcesList from "./ui/ResourcesList";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasksData, setTasksData] = useState([]);
  const [savedTasks, setSavedTasks] = useState([]);
  const [tasksDataChart, setTasksDataChart] = useState([]);
  const [chartHistory, setChartHistory] = useState([]);
  const [resourcesData, setResourcesData] = useState([]);

  const [folderId, setFolderId] = useState("");

  const initialData = { name: "", logoUrl: "", url: "" };
  const [formData, setFormData] = useState(initialData);

  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);

  const openAddResourceModal = () => {
    setIsAddResourceModalOpen(true);
  };

  const closeAddResourceModal = () => {
    setIsAddResourceModalOpen(false);
  };

  const navigate = useNavigate();

  const handleCloseList = () => {
    navigate("/resources");
  };

  //! Fetch tasks data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/tasks`);
        setTasksData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  //! Fetch savedTasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/savedTasks`);
        setSavedTasks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  //! Fetch tasks data for chart
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/percentages`);
        setTasksDataChart(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  //! Fetch chart History
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/chartHistory`);
        setChartHistory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  //! Fetch resources data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/resources`);
        setResourcesData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  //! Fetch resources data for each folder
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/resources/${folderId}`
        );
        setResourcesData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [folderId, setResourcesData]); // Trigger the fetch when folderId changes

  const handleAddData = (newData) => {
    setResourcesData((prevDataList) => [...prevDataList, newData]);
  };

  //! Add data to a folder
  const handleSubmit = async (e, folderId) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.logoUrl || !formData.url) {
        setError("Please fill in all fields.");
        toast.error("Please fill in all fields.");
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/resources/${folderId}`,
        formData
      );

      if (response.status === 200) {
        handleAddData(response.data); // Pass the new data back to the parent component
        setFormData(initialData); // Reset form after successful submission

        closeAddResourceModal(); // Close the modal
        toast.success("Resource added successfully!");
      } else {
        toast.error("Failed to add the resource");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error submitting form. Please try again."); // Display a generic error message
      toast.error("Error submitting form. Please try again.");
    }
  };

  //! Delete data from a folder
  const handleDeleteData = async (dataId, folderId) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/resources/${folderId}/${dataId}`
      );

      if (response.status === 200) {
        setResourcesData((prevDataList) =>
          prevDataList.filter((data) => data._id !== dataId)
        );

        toast.success("Resource deleted successfully!");
      } else {
        toast.error("Failed to delete the resource");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      setError("Error deleting data. Please try again.");
      toast.error("Error deleting data. Please try again.");
    }
  };

  return (
    <>
      <Routes>
        <Route element={<AppLayout tasksData={tasksData} />}>
          {/* Dashboard */}
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route
            path="dashboard"
            element={<Dashboard tasksDataChart={tasksDataChart} />}
          />

          {/* Resources */}
          <Route
            path="resources"
            element={
              <Resources
                resourcesData={resourcesData}
                setResourcesData={setResourcesData}
              />
            }
          />
          {resourcesData.map((resource) => (
            <Route
              key={resource._id}
              path={resource.path}
              element={
                <ResourcesList
                  resourcesDataName={resource.name}
                  resourcesDataData={resource.data}
                  handleSubmit={handleSubmit}
                  formData={formData}
                  setFormData={setFormData}
                  folderId={resource._id}
                  handleCloseList={handleCloseList}
                  handleDeleteData={handleDeleteData}
                  isAddResourceModalOpen={isAddResourceModalOpen}
                  openAddResourceModal={openAddResourceModal}
                  closeAddResourceModal={closeAddResourceModal}
                />
              }
            />
          ))}

          {/* Apps */}
          <Route path="apps/coding-tracker" element={<Tracker />} />
          <Route
            path="apps/tasks-tracker"
            element={
              <ToDoList
                tasksData={tasksData}
                setTasksData={setTasksData}
                tasksDataChart={tasksDataChart}
                setTasksDataChart={setTasksDataChart}
                savedTasks={savedTasks}
                setSavedTasks={setSavedTasks}
                chartHistory={chartHistory}
                setChartHistory={setChartHistory}
              />
            }
          />
          <Route path="apps/calendar" element={<Calendar />} />

          {/* Settings */}
          <Route path="help" element={<Help />} />
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "14px",
            maxWidth: "400px",
            padding: "14px 20px",
            backgroundColor: "#10121b92",
            color: "#fff",
          },
        }}
      />
    </>
  );
}
