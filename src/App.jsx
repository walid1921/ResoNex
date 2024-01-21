import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ResourcesList from "./ui/ResourcesList";
import PrivateRoute from "./pages/PrivateRoute";
import { useAuth } from "./contexts/authContext";

// react-progress-bar / react-progress-bar-plus / react-circular-progressbar

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const { isAuthenticated } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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

  //! Fetch resources data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!isAuthenticated) return; // this is to prevent the app from making a request to the backend when the user is not logged in, because will return unauthorized error
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
  }, [isAuthenticated]);

  //! Fetch resources data for each folder
  const fetchResourcesData = useCallback(async () => {
    setIsLoading(true);
    if (!isAuthenticated) return; // this is to prevent the app from making a request to the backend when the user is not logged in, because will return unauthorized error
    try {
      const response = await axios.get(`${BACKEND_URL}/resources/${folderId}`);
      setResourcesData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [folderId, isAuthenticated]);

  useEffect(() => {
    fetchResourcesData();
  }, [fetchResourcesData]); // Trigger the fetch when folderId changes

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

        fetchResourcesData(); // Fetch the data again to update the list
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

        fetchResourcesData(); // Fetch the data again to update the list
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
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          {/* Dashboard */}
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Resources */}
          <Route
            path="resources"
            element={
              <Resources
                resourcesData={resourcesData}
                setResourcesData={setResourcesData}
                isLoading={isLoading}
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
                  isLoading={isLoading}
                />
              }
            />
          ))}

          {/* Apps */}
          <Route path="apps/coding-tracker" element={<Tracker />} />
          <Route path="apps/tasks-tracker" element={<ToDoList />} />
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
