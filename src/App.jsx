import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Tracker from "./pages/CodingTracker";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import Account from "./pages/Account";
import ToDoList from "./pages/TasksTracker";
import Design from "./pages/Design";
import Web from "./pages/Web";
import Study from "./pages/Study";
import Calendar from "./pages/Calendar";
import { Toaster } from "react-hot-toast"; // npm i react-hot-toast (you can check the docs for more customization options)
import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasksData, setTasksData] = useState([]);
  const [savedTasks, setSavedTasks] = useState([]);
  const [tasksDataChart, setTasksDataChart] = useState([]);
  const [chartHistory, setChartHistory] = useState([]);

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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout tasksData={tasksData} />}>
            {/* Dashboard */}
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route
              path="dashboard"
              element={<Dashboard tasksDataChart={tasksDataChart} />}
            />

            {/* Resources */}
            <Route path="resources/design" element={<Design />} />
            <Route path="resources/web" element={<Web />} />
            <Route path="resources/study" element={<Study />} />

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
