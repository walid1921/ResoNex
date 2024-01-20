import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useStateContext } from "../contexts/ContextProvider";
import useTaskAPI from "../services/TaskAPI";

const AppLayout = () => {
  const { activeMenu } = useStateContext();
  const { tasksData } = useTaskAPI();

  return (
    <div className={activeMenu ? " appLayoutActive" : " appLayout"}>
      <Sidebar tasksData={tasksData}  />
      <Header  />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
