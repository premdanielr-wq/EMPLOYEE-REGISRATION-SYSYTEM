import { useState, useEffect } from 'react';
import { Users, Briefcase, Activity } from 'lucide-react';

const API_URL = '/api/employees';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    departments: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const departments = new Set(data.map(e => e.department));
        const active = data.filter(e => e.status === 'Active').length;
        
        setStats({
          total: data.length,
          active: active,
          departments: departments.size
        });
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Overview of your organization</p>
      </div>

      {isLoading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="dashboard-grid">
          <div className="glass-card metric-card">
            <div className="metric-icon">
              <Users size={24} />
            </div>
            <div className="metric-info">
              <p>Total Employees</p>
              <h3>{stats.total}</h3>
            </div>
          </div>

          <div className="glass-card metric-card">
            <div className="metric-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7' }}>
              <Activity size={24} />
            </div>
            <div className="metric-info">
              <p>Active Staff</p>
              <h3>{stats.active}</h3>
            </div>
          </div>

          <div className="glass-card metric-card">
            <div className="metric-icon" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fcd34d' }}>
              <Briefcase size={24} />
            </div>
            <div className="metric-info">
              <p>Departments</p>
              <h3>{stats.departments}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card" style={{ marginTop: '2rem', padding: '3rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Welcome to CorpNet</h2>
        <p style={{ color: 'var(--text-muted)' }}>Manage your workforce seamlessly with our modern HR portal.</p>
      </div>
    </div>
  );
}
