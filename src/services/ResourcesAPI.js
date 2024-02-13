import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useResourcesAPI = () => {
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
      if (!formData.name || !formData.url) {
        setError("Please fill in all fields.");
        toast.error("Please fill in all fields.");
        return;
      }

      const logoUrl =
        formData.logoUrl.trim() === ""
          ? "https://cdn.icon-icons.com/icons2/3409/PNG/512/unknown_icon_217159.png"
          : formData.logoUrl;

      const response = await axios.post(
        `${BACKEND_URL}/resources/${folderId}`,
        { ...formData, logoUrl }
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

  return {
    isLoading,
    error,
    resourcesData,
    setResourcesData,
    folderId,
    setFolderId,
    formData,
    setFormData,
    isAddResourceModalOpen,
    openAddResourceModal,
    closeAddResourceModal,
    handleCloseList,
    handleSubmit,
    handleDeleteData,
  };
};

export default useResourcesAPI;
