import React from 'react';
import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './components/LandingPage';
import { FullScreenPowerBI } from './components/FullScreenPowerBI';
import { supabase } from './lib/supabase';

type PowerBIReport = 'vigilancia' | 'repasses' | 'atencao' | null;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'powerbi'>('landing');
  const [currentUser, setCurrentUser] = useState('');
  const [activePowerBIReport, setActivePowerBIReport] = useState<PowerBIReport>(null);

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
    setActivePowerBIReport(null);
  };

  const openPowerBIReport = (reportType: 'vigilancia' | 'repasses' | 'atencao') => {
    setActivePowerBIReport(reportType);
    setCurrentView('powerbi');
  };

  const closePowerBIReport = () => {
    setActivePowerBIReport(null);
    setCurrentView('landing');
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

  if (currentView === 'powerbi' && activePowerBIReport) {
    const titles = {
      vigilancia: 'Vigilância em Saúde',
      repasses: 'Repasses Financeiros',
      atencao: 'Atenção Primária'
    };

    return (
      <FullScreenPowerBI
        reportType={activePowerBIReport}
        title={titles[activePowerBIReport]}
        onBack={closePowerBIReport}
      />
    );
  }

  return (
    <div>
      {currentView === 'dashboard' ? (
        <Dashboard username={currentUser} onLogout={handleLogout} onBack={navigateToLanding} />
      ) : (
        <LandingPage
          onAtencaoPrimariaClick={() => openPowerBIReport('atencao')}
          onVigilanciaClick={() => openPowerBIReport('vigilancia')}
          onRepassesFinanceirosClick={() => openPowerBIReport('repasses')}
        />
      )}
    </div>
  );
}
useEffect(() => {
  // Remover elementos do Bolt
  const removeBoltElements = () => {
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      if (
        el.innerHTML?.includes('bolt.host') ||
        el.src?.includes('bolt') ||
        el.className?.includes('bolt')
      ) {
        el.remove();
      }
    });
  };

  removeBoltElements();
  setTimeout(removeBoltElements, 1000);
  setTimeout(removeBoltElements, 3000);
}, []);
export default App;