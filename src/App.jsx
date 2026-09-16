import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import EmployeeDirectory from './pages/EmployeeDirectory';
import AddEmployee from './pages/AddEmployee';
import EmployeeDetails from './pages/EmployeeDetails';

function App() {
  return (
    <Router>
      <div className="app-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>CorpNet</h2>
          <nav className="nav-links">
            <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} end>
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
            <NavLink to="/directory" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <Users size={20} />
              Directory
            </NavLink>
            <NavLink to="/add" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <UserPlus size={20} />
              Register
            </NavLink>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/directory" element={<EmployeeDirectory />} />
            <Route path="/add" element={<AddEmployee />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
