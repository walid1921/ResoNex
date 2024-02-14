import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import ModalWindow from "./ModalWindow";



function ResourceModal({
  isAddResourceModalOpen,
  closeAddResourceModal,
  folderId,
  handleChange,
  handleSubmit,
  formData,
}) {
  return (
    <ModalWindow isModalOpen={isAddResourceModalOpen} closeModal={closeAddResourceModal}
    >
      <div className="flex flex-col h-full mx-3 w-[400px] my-4">
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
    </ModalWindow>
  );
}

export default ResourceModal;
