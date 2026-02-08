import React, { useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Home from './Components/Home';
import About from './Components/About';
import Team from './Components/Team';
import Contact from './Components/Contact';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'team':
        return <Team />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Header onLogout={handleLogout} setView={setCurrentView} currentView={currentView} />
          <main>
            {renderView()}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
