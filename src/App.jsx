import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Tracker from "./pages/Tracker";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import Account from "./pages/Account";
import ToDoList from "./pages/ToDoList";
import Design from "./pages/Design";
import Web from "./pages/Web";
import Study from "./pages/Study";
import Calendar from "./pages/Calendar";
import { Toaster } from "react-hot-toast"; // npm i react-hot-toast (you can check the docs for more customization options)
import { useState } from "react";

export default function App() {

  //! To do list data
  const [tasksData, setTasksData] = useState([
    {
      id: 1,
      title: "Complete Project A",
      description: "Finish all the tasks related to Project A.",
      date: "02/01/2024 14:30",
      status: "Done",
      day: "Wed",
    },
    {
      id: 2,
      title: "Review Meeting",
      description: "Discuss the project status with the team.",
      date: "02/01/2024 15:45",
      status: "Pending",
      day: "Wed",
    },
    {
      id: 3,
      title: "Prepare Presentation",
      description: "Create a presentation for the upcoming client meeting.",
      date: "02/01/2024 12:00",
      status: "Pending",
      day: "Wed",
    },
    {
      id: 4,
      title: "Call with Client",
      description: "Schedule and conduct a call with the client.",
      date: "02/01/2024 16:30",
      status: "Done",
      day: "Wed",
    },
    {
      id: 5,
      title: "Update Documentation",
      description: "Revise and update project documentation.",
      date: "02/01/2024 11:15",
      status: "Pending",
      day: "Wed",
    },
    {
      id: 6,
      title: "Team Training",
      description: "Conduct a training session for the team.",
      date: "02/01/2024 14:30",
      status: "Done",
      day: "Wed",
    },
    {
      id: 7,
      title: "Project Planning",
      description: "Plan tasks and milestones for the next project phase.",
      date: "02/01/2024 09:00",
      status: "Pending",
      day: "Wed",
    },
    {
      id: 8,
      title: "Code Review",
      description: "Review and provide feedback on the team's code.",
      date: "02/01/2024 13:45",
      status: "Done",
      day: "Wed",
    },
  ]);

  const [tasksDataChart, setTasksDataChart] = useState([
    { day: "Sun", percentage: 0 },
    { day: "Mon", percentage: 0 },
    { day: "Tue", percentage: 0 },
    { day: "Wed", percentage: 0 },
    { day: "Thu", percentage: 0 },
    { day: "Fri", percentage: 0 },
    { day: "Sat", percentage: 0 },
  ]);

  const [savedTasks, setSavedTasks] = useState([
    {
      id: 1,
      savedDay: "02/01/2024 13:45",
      percentage: 20,
      tasks: [
        {
          id: 1,
          title: "Complete Project A",
          description: "Finish all the tasks related to Project A.",
          date: "02/01/2024 14:30",
          status: "Pending",
          day: "Tue",
        },
        {
          id: 2,
          title: "Review Meeting",
          description: "Discuss the project status with the team.",
          date: "02/01/2024 15:45",
          status: "Pending",
          day: "Tue",
        },
        {
          id: 3,
          title: "Prepare Presentation",
          description: "Create a presentation for the upcoming client meeting.",
          date: "02/01/2024 12:00",
          status: "Pending",
          day: "Tue",
        },
      ],
    },
    {
      id: 2,
      savedDay: "03/01/2024 15:33",
      percentage: 90,
      tasks: [
        {
          id: 1,
          title: "Complete Project A",
          description: "Finish all the tasks related to Project A.",
          date: "03/01/2024 14:30",
          status: "Done",
          day: "Wed",
        },
        {
          id: 2,
          title: "Review Meeting",
          description: "Discuss the project status with the team.",
          date: "03/01/2024 15:45",
          status: "Pending",
          day: "Wed",
        },
        {
          id: 3,
          title: "Prepare Presentation",
          description: "Create a presentation for the upcoming client meeting.",
          date: "03/01/2024 12:00",
          status: "Pending",
          day: "Wed",
        },
      ],
    },
  ]);
  //! To do list data end

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout tasksData={tasksData} />}>
            {/* Dashboard */}
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard tasksDataChart={tasksDataChart} />} />

            {/* Resources */}
            <Route path="resources/design" element={<Design />} />
            <Route path="resources/web" element={<Web />} />
            <Route path="resources/study" element={<Study />} />

            {/* Apps */}
            <Route path="apps/tracker" element={<Tracker />} />
            <Route
              path="apps/todolist"
              element={
                <ToDoList
                  tasksData={tasksData}
                  setTasksData={setTasksData}
                  tasksDataChart={tasksDataChart}
                  setTasksDataChart={setTasksDataChart}
                  savedTasks={savedTasks}
                  setSavedTasks={setSavedTasks}
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
      </BrowserRouter>

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
