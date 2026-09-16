import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Building, ExternalLink, Trash2 } from 'lucide-react';

const API_URL = '/api/employees';

export default function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState({ type: '', message: '' });

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to load employees.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this employee?')) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      
      setEmployees(prev => prev.filter(e => e.id !== id));
      setStatus({ type: 'success', message: 'Employee removed successfully.' });
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1>Employee Directory</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage and view all registered staff.</p>
        </div>
        <Link to="/add" className="btn btn-primary">Add Employee</Link>
      </div>

      {status.message && (
        <div className={`message ${status.type === 'error' ? 'error-message' : 'success-message'}`}>
          {status.message}
        </div>
      )}

      {isLoading ? (
        <p>Loading directory...</p>
      ) : employees.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No employees found.</p>
          <Link to="/add" className="btn btn-primary">Add Your First Employee</Link>
        </div>
      ) : (
        <div className="directory-grid">
          {employees.map(emp => (
            <div key={emp.id} className="glass-card employee-card">
              <div className="employee-header">
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={18} style={{ color: 'var(--primary-color)' }} />
                    {emp.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{emp.role}</p>
                </div>
                <span className={`status-badge ${emp.status === 'Active' ? 'status-active' : 'status-leave'}`}>
                  {emp.status}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <Building size={16} />
                {emp.department}
              </div>

              <div className="employee-actions">
                <Link to={`/employee/${emp.id}`} className="btn btn-secondary btn-sm" style={{ flex: 1, textDecoration: 'none' }}>
                  <ExternalLink size={16} /> View Profile
                </Link>
                <button onClick={() => handleDelete(emp.id)} className="btn btn-danger btn-sm" title="Remove Employee">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
