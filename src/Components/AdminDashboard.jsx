import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/api/users');
      if (!response.ok) {
        throw new Error(`Failed to fetch users (Status: ${response.status})`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Failed to create user');
      
      setIsCreateModalOpen(false);
      setFormData({ name: '', email: '', password: '' });
      showSuccess('User created successfully!');
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete user');
      showSuccess('User deleted successfully!');
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email })
      });
      if (!response.ok) throw new Error('Failed to update user');
      
      setEditingUser(null);
      setFormData({ name: '', email: '', password: '' });
      showSuccess('User updated successfully!');
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Stats calculation
  const totalUsers = users.length;
  const recentUsers = users.filter(u => {
    const date = new Date(u.created_at);
    const now = new Date();
    return (now - date) / (1000 * 60 * 60 * 24) < 7;
  }).length;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="subtitle">Manage your application users and monitor activity</p>
        </div>
        <button className="add-user-btn" onClick={() => {
          setFormData({ name: '', email: '', password: '' });
          setIsCreateModalOpen(true);
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add New User
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Users</span>
            <span className="stat-value">{totalUsers}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon recent-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <polyline points="17 11 19 13 23 9"></polyline>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">New This Week</span>
            <span className="stat-value">{recentUsers}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">System Status</span>
            <span className="stat-value">Active</span>
          </div>
        </div>
      </div>

      {successMessage && <div className="toast-success">{successMessage}</div>}
      {error && <div className="error-message">Error: {error}</div>}

      {(isCreateModalOpen || editingUser) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingUser ? 'Edit User' : 'Create New User'}</h2>
            <form onSubmit={editingUser ? handleUpdate : handleCreate}>
              <div className="form-group">
                <label>Name</label>
                <input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="John Doe"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="john@example.com"
                  required 
                />
              </div>
              {!editingUser && (
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Min 6 characters"
                    required 
                  />
                </div>
              )}
              <div className="modal-footer">
                <button type="button" onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingUser(null);
                }} className="cancel-btn">Cancel</button>
                <button type="submit" className="save-btn">
                  {editingUser ? 'Save Changes' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Fetching records...</p>
          </div>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Joined Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="user-name">{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{new Date(user.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}</td>
                    <td className="text-right">
                      <button onClick={() => handleEdit(user)} className="action-btn edit" title="Edit User">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="action-btn delete" title="Delete User">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No users found in the database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
