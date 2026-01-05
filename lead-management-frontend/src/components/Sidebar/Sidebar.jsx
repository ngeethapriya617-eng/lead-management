import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">LeadAdmin</h2>

      <nav>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/rules">Rules</Link>
        <Link to="/admin/audit-logs">Audit Logs</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
