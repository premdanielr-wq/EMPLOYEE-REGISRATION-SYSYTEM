const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// In-memory storage for employees with extended details
let employees = [
  { 
    id: 1, 
    name: 'Alice Smith', 
    email: 'alice@example.com', 
    department: 'Engineering',
    role: 'Senior Developer',
    status: 'Active',
    joinDate: '2022-03-15'
  },
  { 
    id: 2, 
    name: 'Bob Johnson', 
    email: 'bob@example.com', 
    department: 'Human Resources',
    role: 'HR Manager',
    status: 'Active',
    joinDate: '2021-11-01'
  },
  { 
    id: 3, 
    name: 'Charlie Davis', 
    email: 'charlie@example.com', 
    department: 'Marketing',
    role: 'Content Strategist',
    status: 'On Leave',
    joinDate: '2023-06-20'
  }
];

// API Routes
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

// GET single employee by ID
app.get('/api/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find(e => e.id === id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

app.post('/api/employees', (req, res) => {
  const { name, email, department, role, status, joinDate } = req.body;
  
  if (!name || !email || !department) {
    return res.status(400).json({ error: 'Please provide name, email, and department at minimum' });
  }

  const newEmployee = {
    id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1,
    name,
    email,
    department,
    role: role || 'Employee',
    status: status || 'Active',
    joinDate: joinDate || new Date().toISOString().split('T')[0]
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

app.delete('/api/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = employees.length;
  
  employees = employees.filter(e => e.id !== id);
  
  if (employees.length < initialLength) {
    res.status(200).json({ message: 'Employee deleted successfully' });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

// Serve the static files from the React frontend build
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Anything that doesn't match the API routes should be handled by the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
