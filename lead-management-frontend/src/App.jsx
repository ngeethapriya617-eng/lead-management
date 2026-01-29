import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminUsers from "./pages/AdminUsers/AdminUsers";
import ProtectedRoute from "./components/ProtectedRoute";
import AgentLeads from "./pages/AgentLeads/AgentLeads";
import AdminAuditLogs from "./pages/AdminAuditLogs/AdminAuditLogs";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute >
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agent/leads"
        element={
          <ProtectedRoute role="AGENT">
            <AgentLeads />
          </ProtectedRoute>
        }
      />

      <Route
      path="/admin/audit-logs"
      element={
        <ProtectedRoute>
          <AdminAuditLogs />
        </ProtectedRoute>
      }
    />

      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
