import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Tracker from "./pages/Tracker";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Tasks from "./pages/Tasks";
import Design from "./pages/Design";
import Web from "./pages/Web";
import Study from "./pages/Study";
import Calendar from "./pages/Calendar";
import { Toaster } from "react-hot-toast"; // npm i react-hot-toast (you can check the docs for more customization options)



export default function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>

            {/* Dashboard */}
            <Route index element={<Navigate replace to='dashboard' />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Resources */}
            <Route path="resources/design" element={<Design />} />
            <Route path="resources/web" element={<Web />} />
            <Route path="resources/study" element={<Study />} />

            {/* Apps */}
            <Route path="apps/tracker" element={<Tracker />} />
            <Route path="apps/tasks" element={<Tasks />} />
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

      <Toaster position="top-center" gutter={12} containerStyle={{ margin: "8px" }} toastOptions={{
        success: { duration: 3000 },
        error: { duration: 5000 },
        style: {
          fontSize: "14px",
          maxWidth: "400px",
          padding: "14px 20px",
          backgroundColor: "#10121b92",
          color: "#fff",
        },

      }} />
    </>
  )
}