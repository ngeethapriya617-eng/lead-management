import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminLayout from "../../components/AdminLayout/AdminLayout";

function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("admin/audit-logs/")
      .then(res => setLogs(res.data))
      .catch(() => alert("Failed to load audit logs"));
  }, []);

  return (
    <AdminLayout>
      <h1>Audit Logs</h1>

      <table className="users-table">
        <thead>
          <tr>
            <th>Actor</th>
            <th>Entity</th>
            <th>Action</th>
            <th>Old</th>
            <th>New</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.actor_username || "System"}</td>
              <td>{log.entity_type} #{log.entity_id}</td>
              <td>{log.action}</td>
              <td>{JSON.stringify(log.old_value)}</td>
              <td>{JSON.stringify(log.new_value)}</td>
              <td>{new Date(log.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default AdminAuditLogs;
