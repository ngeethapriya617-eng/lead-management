import "./AgentLayout.css";

function AgentLayout({ children }) {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <div className="agent-layout">
      <div className="agent-sidebar">
        <h2 className="logo">Agent Panel</h2>
        <a href="/agent/leads">My Leads</a>
      </div>

      <div className="agent-main">
        <div className="agent-header">
          <span>Agent Dashboard</span>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <div className="agent-content">{children}</div>
      </div>
    </div>
  );
}

export default AgentLayout;
