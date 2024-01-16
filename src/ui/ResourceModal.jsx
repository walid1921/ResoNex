import Modal from "react-modal";
import PrimaryBtn from "./buttons/PrimaryBtn";
import SecondaryBtn from "./buttons/SecondaryBtn";
import axios from "axios";
import { useState } from "react";

function ResourceModal({
  closeAddResourceModal,
  openAddResourceModal,
  onAddData,
  folderId,
}) {
  const initialData = { name: "", logoUrl: "", url: "" };
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      // Update the URL to match your backend API
      const response = await axios.post(
        `http://localhost:5001/api/resources/${folderId}/data`,
        formData
      );
      onAddData(response.data); // Pass the new data back to the parent component
      setFormData(initialData); // Reset form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error submitting form. Please try again."); // Display a generic error message
    }
  };

  return (
    <Modal
      isOpen={openAddResourceModal}
      onRequestClose={closeAddResourceModal}
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

        <label className="mt-8">Name:</label>
        <input
          className="p-2 rounded-md bg-transparent border border-slate-600  mt-2"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />

        <label className="mt-8">Path:</label>
        <input
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
          <PrimaryBtn onClick={handleSubmit} text={"Add"} />
          <SecondaryBtn onClick={closeAddResourceModal} text={"Cancel"} />
        </div>
      </div>
    </Modal>
  );
}

export default ResourceModal;
