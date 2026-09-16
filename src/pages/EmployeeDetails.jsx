import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Building, Briefcase, Calendar, Activity, Trash2 } from 'lucide-react';

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/employees/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Employee not found');
        return res.json();
      })
      .then(data => setEmployee(data))
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to completely remove this employee?')) return;
    
    try {
      const response = await fetch(`/api/employees/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      navigate('/directory');
    } catch (err) {
      alert(err.message);
    }
  };

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return (
    <div className="glass-card" style={{ textAlign: 'center' }}>
      <p className="error-message">{error}</p>
      <Link to="/directory" className="btn btn-primary">Return to Directory</Link>
    </div>
  );
  if (!employee) return null;

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => navigate('/directory')}>
          <ArrowLeft size={16} /> Back to Directory
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          <Trash2 size={16} /> Delete Record
        </button>
      </div>

      <div className="glass-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {employee.name.charAt(0)}
          </div>
          <div>
            <h1 style={{ marginBottom: '0.5rem', fontSize: '2.5rem' }}>{employee.name}</h1>
            <span className={`status-badge ${employee.status === 'Active' ? 'status-active' : 'status-leave'}`}>
              {employee.status}
            </span>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />

        <div className="detail-grid">
          <div className="detail-item">
            <p><Briefcase size={14} style={{ display: 'inline', marginRight: '4px' }}/> Role</p>
            <p>{employee.role || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p><Building size={14} style={{ display: 'inline', marginRight: '4px' }}/> Department</p>
            <p>{employee.department}</p>
          </div>
          <div className="detail-item">
            <p><Mail size={14} style={{ display: 'inline', marginRight: '4px' }}/> Email</p>
            <p><a href={`mailto:${employee.email}`} style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>{employee.email}</a></p>
          </div>
          <div className="detail-item">
            <p><Calendar size={14} style={{ display: 'inline', marginRight: '4px' }}/> Join Date</p>
            <p>{employee.joinDate || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
