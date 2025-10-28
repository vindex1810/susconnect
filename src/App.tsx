import React from 'react';
import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './components/LandingPage';
import { PowerBIViewer } from './components/PowerBIViewer';
import { supabase } from './lib/supabase';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [currentUser, setCurrentUser] = useState('');
  const [isPowerBIOpen, setIsPowerBIOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session?.user?.email) {
        setCurrentUser(session.user.email);
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (session?.user?.email) {
        setCurrentUser(session.user.email);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLoginSuccess = (email: string) => {
    setCurrentUser(email);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setCurrentUser('');
    setCurrentView('landing');
  };

  const navigateToDashboard = () => {
    setCurrentView('dashboard');
  };

  const navigateToLanding = () => {
    setCurrentView('landing');
  };

  const openPowerBI = () => {
    setIsPowerBIOpen(true);
  };

  const closePowerBI = () => {
    setIsPowerBIOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      {currentView === 'dashboard' ? (
        <Dashboard username={currentUser} onLogout={handleLogout} onBack={navigateToLanding} />
      ) : (
        <LandingPage
          onAtencaoPrimariaClick={navigateToDashboard}
          onVigilanciaClick={openPowerBI}
        />
      )}

      <PowerBIViewer
        isOpen={isPowerBIOpen}
        onClose={closePowerBI}
        powerBIUrl="https://app.powerbi.com/view?r=eyJrIjoiZjY2YTUwM2QtMWQyZS00MDQ2LWE5NDctMGRjYWFmZTU3YjQwIiwidCI6IjVkOGE4N2Q5LTZkODAtNDM5My05ZjNkLTUyOWE3MjU1MmQ3ZiJ9"
        title="Vigilância em Saúde - Power BI"
      />
    </div>
  );
}

export default App;