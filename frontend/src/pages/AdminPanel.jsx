function AdminPanel() {
  return (
    <div className="page-container">
      <h1>Admin Panel</h1>
      <p>Manage cases, scenarios, and user accounts</p>
      <div className="admin-sections">
        <div className="admin-card">
          <h2>📋 Manage Cases</h2>
          <p>Create, edit, or delete clinical cases</p>
        </div>
        <div className="admin-card">
          <h2>📤 Upload Scenarios</h2>
          <p>Upload new scenario files and configure cases</p>
        </div>
        <div className="admin-card">
          <h2>👥 User Management</h2>
          <p>Manage resident and faculty accounts</p>
        </div>
        <div className="admin-card">
          <h2>📊 Analytics</h2>
          <p>View training metrics and performance data</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
