import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import {
  HiArrowCircleLeft,
  HiOutlineFolder,
  HiOutlineMinusSm,
  HiOutlinePlus,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import ResourceModal from "./ResourceModal";
import Spinner from "../ui/Spinner";

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
  closeAddResourceModal,
  isLoading,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const folderLength = resourcesDataData.length;

  return (
    <>
      <div className=" flex items-center gap-3 mb-10">
        <HiOutlineFolder size={25} />
        <h2 className="text-2xl font-semibold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
          {resourcesDataName}{" "}
          <span className="text-[16px]">({folderLength})</span>
        </h2>
      </div>
      <button
        onClick={handleCloseList}
        className="hover:text-[#3a6df0] cursor-pointer text-[#e2e2e2] opacity-50 hover:opacity-100 transition-all ease-in-out duration-300"
      >
        <HiArrowCircleLeft size={30} />
      </button>

      {resourcesDataData.length === 0 ? (
        <>
          <TooltipComponent
            content="Add"
            position="TopCenter"
            offsetY={-5}
            animation={TooltipAnimation}
          >
            <button
              className="border border-[#ffffff66] hover:border-white  border-dashed rounded-md py-4 px-10 justify-center items-center flex mx-auto transition-all ease-in-out duration-200 text-[#ffffff66] hover:text-white"
              onClick={openAddResourceModal}
            >
              <HiOutlinePlus size={15} />
            </button>
          </TooltipComponent>
          <div className="h-[60%] flex justify-center items-center">
            <div
              className={`text-md text-center font-light px-6 py-6 border bg-[rgba(148,163,184,0.24)] border-[rgba(58,111,240,0.5)]  text-[#ffffff6f] rounded-md`}
            >
              Start by Adding New Resources in{" "}
              <span className=" text-xl font-semibold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
                {resourcesDataName}
              </span>{" "}
              Folder
            </div>
          </div>
        </>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <ul className="flex items-start flex-wrap gap-5 overflow-y-scroll custom-scrollbar h-[480px] mt-5">
          {resourcesDataData &&
            resourcesDataData.map((resource) => (
              <li
                key={resource._id}
                className="relative flex items-center gap-5 bg-[rgba(148,163,184,0.26)] hover:bg-[rgba(58,111,240,0.2)] hover:border-[rgba(58,111,240,0.5)] rounded-lg border border-slate-400 transition-all ease-in-out duration-300 px-4 py-2"
              >
                <Link
                  to={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex justify-center items-center opacity-70 hover:opacity-100 transition-all ease-in-out duration-200">
                    <img
                      className="h-8 w-8 rounded-full object-cover object-center  transition-all ease-in-out duration-200"
                      src={resource.logoUrl}
                      alt=""
                    />

                    <span className="mx-5">
                      {resource.name}
                    </span>
                  </div>
                </Link>

                <TooltipComponent
                  content="Delete"
                  position="TopCenter"
                  offsetY={-5}
                  animation={TooltipAnimation}
                  className="absolute top-[2px] right-[2px]"
                >
                  <button
                    className="bg-[#ff4d4dad] hover:bg-[#c6141d9d] rounded-full"
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
              className="border border-[#ffffff66] hover:border-white  border-dashed rounded-md py-4 px-10 justify-center items-center flex mx-auto transition-all ease-in-out duration-200 text-[#ffffff66] hover:text-white"
              onClick={openAddResourceModal}
            >
              <HiOutlinePlus size={15} />
            </button>
          </TooltipComponent>
        </ul>
      )}

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
