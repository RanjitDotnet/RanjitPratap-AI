import Sidebar from "./Sidebar/SidebarOLD";

export default function DashboardLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
}