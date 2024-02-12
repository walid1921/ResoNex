import Modal from "react-modal";
import PrimaryBtn from "./buttons/PrimaryBtn";
import SecondaryBtn from "./buttons/SecondaryBtn";



function ResourceModal({
  isAddResourceModalOpen,
  closeAddResourceModal,
  folderId,
  handleChange,
  handleSubmit,
  formData,
}) {
  return (
    <Modal
      isOpen={isAddResourceModalOpen}
      onRequestClose={closeAddResourceModal}
      contentLabel="Add Resource"
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
          height: "53%",
          margin: "auto",
        },
      }}
    >
      <div className="flex flex-col h-full mx-3">
        <h2 className="text-xl">Add Resource</h2>

        <label className="mt-8">Name:</label>
        <input
          className="p-2 rounded-md bg-transparent border border-slate-600  mt-2"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="mt-8">Logo URL:</label>
        <input
          className="p-2 rounded-md bg-transparent border border-slate-600  mt-2"
          type="text"
          name="logoUrl"
          value={formData.logoUrl}
          onChange={handleChange}
        />

        <label className="mt-8">URL:</label>
        <input
          className="p-2 rounded-md bg-transparent border border-slate-600  mt-2"
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
        />

        <div className="flex justify-center items-center mt-6 gap-3">
          <PrimaryBtn onClick={(e) => handleSubmit(e, folderId)} text={"Add"} />
          <SecondaryBtn onClick={closeAddResourceModal} text={"Cancel"} />
        </div>
      </div>
    </Modal>
  );
}

export default ResourceModal;
