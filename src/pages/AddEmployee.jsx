import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = '/api/employees';

export default function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', email: '', department: '', role: '', status: 'Active', joinDate: '' 
  });
  const [statusMsg, setStatusMsg] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', message: '' });

    if (!formData.name || !formData.email || !formData.department) {
      setStatusMsg({ type: 'error', message: 'Please fill in required fields (*)' });
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add employee');
      }

      setStatusMsg({ type: 'success', message: 'Employee successfully registered! Redirecting...' });
      setTimeout(() => navigate('/directory'), 1500);
    } catch (err) {
      setStatusMsg({ type: 'error', message: err.message });
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Register Employee</h1>
        <p style={{ color: 'var(--text-muted)' }}>Onboard a new team member to the system.</p>
      </div>

      <div className="glass-card" style={{ maxWidth: '800px' }}>
        {statusMsg.message && (
          <div className={`message ${statusMsg.type === 'error' ? 'error-message' : 'success-message'}`}>
            {statusMsg.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleInputChange} placeholder="e.g. Jane Doe" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleInputChange} placeholder="e.g. jane@example.com" />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <select id="department" name="department" className="form-control" value={formData.department} onChange={handleInputChange}>
                <option value="" disabled>Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="role">Job Role</label>
              <input type="text" id="role" name="role" className="form-control" value={formData.role} onChange={handleInputChange} placeholder="e.g. UX Designer" />
            </div>

            <div className="form-group">
              <label htmlFor="joinDate">Date of Joining</label>
              <input type="date" id="joinDate" name="joinDate" className="form-control" value={formData.joinDate} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label htmlFor="status">Current Status</label>
              <select id="status" name="status" className="form-control" value={formData.status} onChange={handleInputChange}>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/directory')}>Cancel</button>
            <button type="submit" className="btn btn-primary">Complete Registration</button>
          </div>
        </form>
      </div>
    </div>
  );
}
