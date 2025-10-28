import React from 'react';
import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Users,
  ArrowUpDown,
  PieChart,
  Bell,
  Settings,
  BookOpen,
  Database,
  Map,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import { DiabetesReport } from './DiabetesReport';

interface DashboardProps {
  username: string;
  onLogout: () => void;
  onBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ username, onLogout, onBack }) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'diabetes'>('dashboard');

  if (currentView === 'diabetes') {
    return <DiabetesReport onBack={() => setCurrentView('dashboard')} />;
  }

  const dashboardCards = [
    {
      title: 'Produção APS',
      subtitle: 'AB, SAD, Atendimentos',
      icon: BarChart3,
      color: 'from-yellow-400 to-orange-500',
      onClick: () => {}
    },
    {
      title: 'Indicadores Previne',
      subtitle: 'Acompanhamento por quadrimestre',
      icon: TrendingUp,
      color: 'from-yellow-400 to-orange-500',
      onClick: () => {}
    },
    {
      title: 'Cobertura Populacional',
      subtitle: 'Vínculo, Cadastro, Território',
      icon: MapPin,
      color: 'from-yellow-400 to-orange-500',
      onClick: () => {}
    },
    {
      title: 'Mapa de Equipes',
      subtitle: 'Distribuição geográfica por área',
      icon: Users,
      color: 'from-yellow-400 to-orange-500',
      onClick: () => {}
    },
    {
      title: 'Comparativo de Produção',
      subtitle: 'Mensal, Trimestral, Anual',
      icon: ArrowUpDown,
      color: 'from-yellow-400 to-orange-500',
      onClick: () => {}
    },
    {
      title: 'Painéis de Análise',
      subtitle: 'Gráficos interativos por indicador',
      icon: PieChart,
      color: 'from-yellow-400 to-orange-500',
      onClick: () => {}
    }
  ];

  // Atualizar o card de Cobertura Populacional para abrir o relatório de diabéticos
  dashboardCards[2] = {
    title: 'Atenção Especializada',
    subtitle: 'Relatórios de Diabéticos',
    icon: MapPin,
    color: 'from-yellow-400 to-orange-500',
    onClick: () => setCurrentView('diabetes')
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo da Prefeitura e Botão Voltar */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="text-sm">Voltar</span>
              </button>
              <div className="w-px h-6 bg-blue-600"></div>
              <img
                src="/prefeitura_negativo.png"
                alt="Prefeitura de Dourados"
                className="h-10 w-auto"
              />
              <h1 className="text-xl font-bold">SUS Connect</h1>
            </div>
            
            {/* Menu Centralizado */}
            <div className="flex-1 flex justify-center">
              <nav className="hidden md:flex space-x-6 text-sm">
                <a href="#" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
                  <BarChart3 size={16} />
                  <span>Indicadores</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
                  <BookOpen size={16} />
                  <span>Educação</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
                  <Database size={16} />
                  <span>Dados</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
                  <Map size={16} />
                  <span>Mapa</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
                  <Settings size={16} />
                  <span>Configurações</span>
                </a>
              </nav>
            </div>
            
            {/* User Info e Logout */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Bell className="text-blue-200 hover:text-white cursor-pointer transition-colors" size={20} />
                <span className="text-sm">Olá, {username}</span>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 text-blue-200 hover:text-white transition-colors"
                >
                  <LogOut size={16} />
                  <span className="text-sm">Sair</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">SUS Connect</h2>
          <p className="text-xl text-gray-600 mb-2">Área Interna</p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Coraavir</span>
            </span>
            <span className="flex items-center space-x-1">
              <Bell size={14} />
              <span>Sistema de Notificação</span>
            </span>
            <span>• Dados sensíveis</span>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              onClick={card.onClick}
            >
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <card.icon size={28} className="text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-blue-900 text-center mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
            <div className="text-sm text-gray-600">Atendimentos Hoje</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
            <div className="text-sm text-gray-600">Cobertura Populacional</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">156</div>
            <div className="text-sm text-gray-600">Equipes Ativas</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">23</div>
            <div className="text-sm text-gray-600">Alertas Pendentes</div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
        <footer className="bg-blue-950 backdrop-blur-sm border-t border-blue-700/30 mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              {/* Logos à esquerda */}
              <div className="flex items-start space-x-4 mb-4 md:mb-0">
                <img 
                  src="/sems-logo.png" 
                  alt="SEMS - Coordenação Saúde Digital & Inovação" 
                  className="h-12 w-auto"
                />
                <div className="text-left">
                  <p className="text-blue-200 text-sm">
                    © 2025 SUS Connect - Sistema de Monitoramento da Saúde
                  </p>
                  <p className="text-blue-300 text-xs mt-1">
                    Prefeitura Municipal de Dourados/MS
                  </p>
                </div>
              </div>
              
              {/* Links à direita */}
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  Política de Privacidade
                </a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  Termos de Uso
                </a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  Contato
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
};