import { Navigate, Route, Routes} from "react-router-dom";
import  { Toaster } from "react-hot-toast"; // npm i react-hot-toast (you can check the docs for more customization options)


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
import Features from "./pages/Features";
import About from "./pages/About";
import UserGuide from "./pages/UserGuide";
import ResourcesList from "./ui/ResourcesList";

import PrivateRoute from "./pages/PrivateRoute";
import resourcesFastAccess from "./data/ResourcesFastAccess";
import useResourcesAPI from "./services/ResourcesAPI";

// react-progress-bar / react-progress-bar-plus / react-circular-progressbar


export default function App() {
  const {
    resourcesData,
    isLoading,
    handleSubmit,
    formData,
    setFormData,
    handleCloseList,
    handleDeleteData,
    isAddResourceModalOpen,
    openAddResourceModal,
    closeAddResourceModal,
  } = useResourcesAPI();

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
          <Route
            path="dashboard"
            element={
              <Dashboard
                resourcesData={resourcesData}
                resourcesFastAccess={resourcesFastAccess}
                isLoading={isLoading}
              />
            }
          />

          {/* Resources */}
          <Route
            path="resources"
            element={
              <Resources
                resourcesFastAccess={resourcesFastAccess}
                resourcesData={resourcesData}
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
        <Route path="features" element={<Features />} />
        <Route path="about" element={<About />} />
        <Route path="userGuide" element={<UserGuide />} />
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
