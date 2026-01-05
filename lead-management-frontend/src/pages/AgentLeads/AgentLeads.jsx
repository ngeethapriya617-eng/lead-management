import { useEffect, useState } from "react";
import api from "../../api/axios";
import AgentLayout from "../../components/AgentLayout/AgentLayout";

function AgentLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leads
  useEffect(() => {
    api
      .get("agent/leads/")
      .then((res) => {
        setLeads(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load leads");
        setLoading(false);
      });
  }, []);

  // Update lead status
  const updateStatus = async (leadId, newStatus) => {
    try {
      const res = await api.patch(`leads/${leadId}/status/`, {
        status: newStatus,
      });

      // Update UI immediately
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === leadId ? res.data : lead
        )
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return <AgentLayout>Loading...</AgentLayout>;

  return (
    <AgentLayout>
      <h1>My Leads</h1>

      <table className="leads-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.phone}</td>
              <td>{lead.status}</td>
              <td>
                <select
                  value={lead.status}
                  onChange={(e) =>
                    updateStatus(lead.id, e.target.value)
                  }
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AgentLayout>
  );
}

export default AgentLeads;
