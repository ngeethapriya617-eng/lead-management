import Sidebar from "../Sidebar/Sidebar.jsx";
import Header from "../Header/Header.jsx";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-section">
        <Header />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
 