import StatCard from "./Dashboard/StatCard";
import TaskChart from "./Dashboard/TaskChart";
import StatusChart from "./Dashboard/StatusChart";

export default function Dashboard() {
  return (
    <>
      <h1>Welcome back, Aisha</h1>
      <p>Here's what's happening across your projects this week.</p>

      <div className="card-row">
        <StatCard title="Active Projects" value="4" />
        <StatCard title="In Progress" value="3" />
        <StatCard title="Completed" value="3" />
        <StatCard title="Overdue" value="6" />
      </div>

      <div className="chart-row">
        <TaskChart />
        <StatusChart />
      </div>
    </>
  );
}