import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import {
  HiArrowCircleLeft,
  HiOutlineFolder,
  HiOutlineMinusSm,
  HiOutlinePlus,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import ResourceModal from "./ResourceModal";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

function ResourcesList({
  resourcesDataName,
  resourcesDataData,
  folderId,
  handleSubmit,
  formData,
  handleCloseList,
  handleDeleteData,
  setFormData,
  isAddResourceModalOpen,
  openAddResourceModal,
  closeAddResourceModal
}) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <div className=" flex items-center gap-3 mb-10">
        <HiOutlineFolder size={25} />
        <h2 className="text-2xl font-semibold">{resourcesDataName}</h2>
      </div>

      <div className="flex gap-6">
        <button
          onClick={handleCloseList}
          className="hover:text-[#3a6df0] cursor-pointer text-[#e2e2e2] opacity-50 hover:opacity-100 transition-all ease-in-out duration-300"
        >
          <HiArrowCircleLeft size={30} />
        </button>

        <ul className="flex items-center flex-wrap gap-5">
          {resourcesDataData &&
            resourcesDataData.map((resource) => (
              <li
                key={resource._id}
                className="flex items-center gap-5 bg-[rgba(148,163,184,0.26)] hover:bg-[rgba(58,111,240,0.2)] hover:border-[rgba(58,111,240,0.5)] hover:text-[#bbb] rounded-lg border border-slate-400 transition-all ease-in-out duration-300 px-4 py-1"
              >
                <Link
                  to={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex justify-center items-center gap-4  ">
                    <img
                      className="h-8 rounded-full"
                      src={resource.logoUrl}
                      alt=""
                    />

                    <span>{resource.name}</span>
                  </div>
                </Link>

                <TooltipComponent
                  content="Delete"
                  position="TopCenter"
                  offsetY={-5}
                  animation={TooltipAnimation}
                  className="flex items-center justify-normal"
                >
                  <button
                    className="bg-[#ff4d4dad] hover:bg-[#c6141d9d] rounded-full p-[2px]"
                    onClick={() => {
                      console.log(resource._id);
                      handleDeleteData(resource._id, folderId);
                    }}
                  >
                    <HiOutlineMinusSm size={15} />
                  </button>
                </TooltipComponent>
              </li>
            ))}

          <TooltipComponent
            content="Add"
            position="TopCenter"
            offsetY={-5}
            animation={TooltipAnimation}
          >
            <button
              className="border border-[#ffffff66] hover:border-white  border-dashed rounded-md py-3 px-10 justify-center items-center flex mx-auto transition-all ease-in-out duration-200 text-[#ffffff66] hover:text-white"
              onClick={openAddResourceModal}
            >
              <HiOutlinePlus size={15} />
            </button>
          </TooltipComponent>
        </ul>
      </div>

      {/* Add Resource Modal */}
      <ResourceModal
        isAddResourceModalOpen={isAddResourceModalOpen}
        closeAddResourceModal={closeAddResourceModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        folderId={folderId}
      />
    </>
  );
}

export default ResourcesList;
