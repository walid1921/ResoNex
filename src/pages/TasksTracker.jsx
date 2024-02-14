import ToDoCard from "../ui/ToDoCard";
import { HiOutlineClipboardList } from "react-icons/hi";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; //npm install react-circular-progressbar
// import "react-circular-progressbar/dist/styles.css";
// import {Line} from "react-progress-bar"; // npm install react-progress-bar
// import ProgressBar from "react-progress-bar-plus";
// import "react-progress-bar-plus/lib/progress-bar.css";
import BarChart from "../ui/BarChart";
import LineChart from "../ui/LineChart";
import Spinner from "../ui/Spinner";
import TodayDate from "../ui/TodayDate";
import CompleteTaskModal from "../ui/ModelsWindow/CompleteTaskModal";
import EditTaskModal from "../ui/ModelsWindow/EditTaskModal";
import DetailsTaskModal from "../ui/ModelsWindow/DetailsTaskModal";
import DeleteAllTasksModal from "../ui/ModelsWindow/DeleteAllTasksModal";
import NoTasks from "../ui/NoTasks";
import BarProgress from "../ui/BarProgress";
import SaveTasksModal from "../ui/ModelsWindow/SaveTasksModal";
import SeeAllTasksModal from "../ui/ModelsWindow/SeeAllTasksModal";
import ChartHistory from "../ui/ModelsWindow/ChartHistoryModel";
import useTaskAPI from "../services/TaskAPI";

import AddTaskBtn from "../ui/buttons/AddTaskBtn";
import DeleteAllTasksBtn from "../ui/buttons/DeleteAllTasksBtn";
import SortTasksBtn from "../ui/buttons/SortTasksBtn";
import InfoTaskBtn from "../ui/buttons/InfoTaskBtn";
import TaskStatus from "../ui/buttons/TaskStatus";
import SaveBtn from "../ui/buttons/SaveBtn";
import SeeAllTasksBtn from "../ui/buttons/SeeAllTasksBtn";
import ChartHistoryBtn from "../ui/buttons/ChartHistoryBtn";
import SaveChart from "../ui/buttons/SaveChart";
import AddTaskFormModal from "../ui/ModelsWindow/AddTaskFormModal";

function TasksTracker() {
  //! All are in the TaskAPI.js File
  const {
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
  } = useTaskAPI(); //!

  console.log(chartHistory);

  return (
    <>
      {/* <ProgressBar
        className=" px-3 pt-[2px] rounded-md"
        percent={loading}
        autoIncrement
      /> */}

      <div className="flex justify-between items-center">
        <div className=" flex items-center gap-3 mb-10">
          <HiOutlineClipboardList size={25} />
          <h2 className="text-2xl font-semibold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
            Tasks Tracker
          </h2>
        </div>

        <div className="flex items-center gap-5">
          <ChartHistoryBtn openChartHistoryModal={openChartHistoryModal} />
          <SeeAllTasksBtn openAllTasksModal={openAllTasksModal} />
        </div>
      </div>

      <div className="mt-5 justify-center items-center h-[500px] flex gap-10 ">
        <div className=" h-full w-[50%] rounded-md border border-slate-600">
          <div className="flex items-center justify-between  mt-5 mx-5 ">
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-3 items-center">
                <h3 className="text-lg">Project Tasks</h3>

                <InfoTaskBtn numTasks={numTasks} percentage={percentage} />
              </div>

              <div className="flex items-center gap-3">
                <SortTasksBtn
                  sortBy={sortBy}
                  handleSortChange={handleSortChange}
                />

                <DeleteAllTasksBtn openDeleteModal={openDeleteModal} />

                <SaveBtn openSavingModal={openSavingModal} />

                {/* Add Task component (Modal) */}
                <AddTaskFormModal
                  isAddModalOpen={isAddModalOpen}
                  closeAddModal={closeAddModal}
                  formData={formData}
                  handleTitleChange={handleTitleChange}
                  handleDescriptionChange={handleDescriptionChange}
                  handleStatusChange={handleStatusChange}
                  handleDateChange={handleDateChange}
                  handleAddTask={handleAddTask}
                  date={date}
                />

                {/* Deleting all tasks Confirmation component (Modal) */}
                <DeleteAllTasksModal
                  isDeleteModalOpen={isDeleteModalOpen}
                  closeDeleteModal={closeDeleteModal}
                  handleDeleteAllTasks={handleDeleteAllTasks}
                />

                {/* Task Details components (Modal) */}
                <DetailsTaskModal
                  selectedTask={selectedTask}
                  closeTask={closeTask}
                  tasksData={tasksData}
                  handleDeleteTask={handleDeleteTask}
                  openEditModal={openEditModal}
                />

                {/* Edit a Task component (Modal) */}
                <EditTaskModal
                  isEditModalOpen={isEditModalOpen}
                  closeEditModal={closeEditModal}
                  formData={formData}
                  handleTitleChange={handleTitleChange}
                  handleDescriptionChange={handleDescriptionChange}
                  handleStatusChange={handleStatusChange}
                  handleEditTask={handleEditTask}
                />

                {/* Complete a task component (Modal) */}
                <CompleteTaskModal
                  isCompletedModalOpen={isCompletedModalOpen}
                  closeCompletedModal={closeCompletedModal}
                  formData={formData}
                  handleStatusChange={handleStatusChange}
                  handleCompleted={handleCompleted}
                />

                {/* Save Tasks component (Modal) */}
                <SaveTasksModal
                  isSavingModalOpen={isSavingModalOpen}
                  closeSavingModal={closeSavingModal}
                  handleSaveAllTasks={handleSaveAllTasks}
                />

                {/* See All Tasks (Modal) */}
                <SeeAllTasksModal
                  allTasksOpen={allTasksOpen}
                  setAllTasksOpen={setAllTasksOpen}
                  savedTasks={savedTasks}
                  closeAllTasksModal={closeAllTasksModal}
                  handleDeleteAllSavedTasks={handleDeleteAllSavedTasks}
                />

                {/* Chart History (Modal) */}
                <ChartHistory
                  chartHistoryOpen={chartHistoryOpen}
                  setChartHistoryOpen={setChartHistoryOpen}
                  chartHistory={chartHistory}
                  closeChartHistoryModal={closeChartHistoryModal}
                />
              </div>
            </div>
          </div>

          <AddTaskBtn openAddModal={openAddModal} />

          {!tasksData ? (
            <NoTasks
              text="Error fetching tasks"
              border="border-[#ff4d4dad]"
              bg="bg-[#ff4d4d42]"
            />
          ) : isLoading ? (
            <Spinner />
          ) : tasksData.length === 0 ? (
            <NoTasks />
          ) : (
            <div
              className={`flex flex-col gap-5 mt-4 h-[73%] overflow-y-scroll custom-scrollbar mx-4`}
            >
              {tasksData.map((task) => (
                <ToDoCard
                  key={task._id}
                  id={task._id}
                  title={task.title}
                  description={task.description}
                  date={task.date}
                  status={task.status}
                  handleDeleteTask={handleDeleteTask}
                  openTask={openTask}
                  openCompletedModal={openCompletedModal}
                  closeCompletedModal={closeCompletedModal}
                  isCompletedModalOpen={isCompletedModalOpen}
                  handleCompleted={handleCompleted}
                  selectedTask={selectedTask}
                />
              ))}
            </div>
          )}
        </div>

        <div className=" h-full flex flex-col w-[50%] px-4 border border-slate-600 rounded-md">
          <div className="flex justify-between items-center">
            <h3 className="text-lg mr-5 my-6">Progress Details</h3>
            <div className="flex items-center gap-5">
              <TodayDate />
              <TaskStatus
                numDoneTasks={numDoneTasks}
                numPendingTasks={numPendingTasks}
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mt-2 flex items-center justify-between">
              <BarProgress
                percentage={percentage}
                numTasks={numTasks}
                barsView={barsView}
                showBarsView={showBarsView}
                handleUpdateChartClick={handleUpdateChartClick}
                openUpdateModal={openUpdateModal}
                closeUpdateModal={closeUpdateModal}
                isUpdateModalOpen={isUpdateModalOpen}
                getCurrentDay={getCurrentDay}
              />
            </div>

            <div className="mt-8 mb-4 w-[480px] h-[250px]">
              {barsView ? (
                <BarChart tasksDataChart={tasksDataChart} />
              ) : (
                <LineChart tasksDataChart={tasksDataChart} />
              )}
            </div>

            <SaveChart handleSaveProgress={handleSaveProgress} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TasksTracker;
