import LineChart from "../ui/LineChart";

const Dashboard = ({ tasksDataChart }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="w-[500px]">
        <LineChart tasksDataChart={tasksDataChart} />
      </div>
    </div>
  );
};

export default Dashboard;
