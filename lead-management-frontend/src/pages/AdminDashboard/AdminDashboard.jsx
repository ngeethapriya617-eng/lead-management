import AdminLayout from "../../components/AdminLayout/AdminLayout";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Total Leads</h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>Qualified Leads</h3>
          <p>75</p>
        </div>

        <div className="card">
          <h3>Active Agents</h3>
          <p>8</p>
        </div>

        <div className="card">
          <h3>Conversion Rate</h3>
          <p>32%</p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
