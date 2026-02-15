import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import About from './Components/About';
import Team from './Components/Team';
import Contact from './Components/Contact';
import AdminDashboard from './Components/AdminDashboard';
import AdminLogin from './Components/AdminLogin';
import NotFound from './Components/NotFound';
import './App.css';

function AppContent({ user, isAuthenticated, handleLogin, handleLogout }) {
  const location = useLocation();
  const hideLayout = location.pathname === '/admin/login';

  return (
    <div className="App">
      {!hideLayout && <Header onLogout={handleLogout} user={user} isAuthenticated={isAuthenticated} />}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" replace />} />
          <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
          <Route 
            path="/admin" 
            element={
              !isAuthenticated ? <Navigate to="/admin/login" replace /> :
              user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />
            } 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <AppContent 
        user={user} 
        isAuthenticated={isAuthenticated} 
        handleLogin={handleLogin} 
        handleLogout={handleLogout} 
      />
    </Router>
  );
}

export default App;
