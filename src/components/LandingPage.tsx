import React from 'react';
import {
  Heart,
  Eye,
  DollarSign,
  AlertTriangle,
  Menu,
  Activity,
  LogOut,
  Mail,
  Map,
  Layers
} from 'lucide-react';

interface LandingPageProps {
  onAtencaoPrimariaClick: () => void;
  onVigilanciaClick: () => void;
  onRepassesFinanceirosClick: () => void;
  userEmail?: string;
  onLogout?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onAtencaoPrimariaClick, 
  onVigilanciaClick, 
  onRepassesFinanceirosClick,
  userEmail,
  onLogout
}) => {
  
  const formatEmail = (email: string) => {
    const atIndex = email.indexOf('@');
    return atIndex > 0 ? email.substring(0, atIndex) : email;
  };

  const openUBSMap = () => {
    window.open('https://www.google.com/maps/d/u/0/viewer?hl=pt-BR&mid=1aOdQQ9s9vBtyibgLy5cPTEMU2Oqq6mw&ll=-22.23198731693114%2C-54.83619882987065&z=13', '_blank');
  };

  const openCCZMaps = () => {
    window.open('https://drive.google.com/drive/folders/14VBRXCmS_pviSqblQ01VBtlhthwnae6P', '_blank');
  };

  return (
    <div className="min-h-screen relative text-white">
      {/* Background Image with Blue Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/profissionais-saude.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70 backdrop-blur-[0.5px]"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-blue-900/60 backdrop-blur-sm border-b border-blue-700/30">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              {/* Logo da Prefeitura */}
              <div className="flex items-center">
                <img 
                  src="/prefeitura_negativo.png" 
                  alt="Prefeitura de Dourados" 
                  className="h-12 w-auto"
                />
              </div>
              
              {/* User Info and Logout */}
              <div className="flex items-center space-x-4">
                {userEmail && (
                  <div className="flex items-center space-x-3">
                    {/* Ícone do usuário e email */}
                    <div className="flex items-center space-x-2 text-blue-100">
                      <Mail size={16} className="text-blue-200" />
                      <span className="text-sm font-medium">
                        {formatEmail(userEmail)}
                      </span>
                    </div>
                    
                    {/* Separador */}
                    <div className="w-px h-6 bg-blue-400/50"></div>
                    
                    {/* Botão de Logout */}
                    <button
                      onClick={onLogout}
                      className="flex items-center space-x-2 bg-red-600/80 hover:bg-red-700/80 px-3 py-2 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                    >
                      <LogOut size={16} className="text-white" />
                      <span className="text-sm font-medium text-white">Sair</span>
                    </button>
                  </div>
                )}
                
                {/* Mobile Menu Button */}
                <button className="md:hidden">
                  <Menu size={24} />
                </button>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              SUS CONNECT
            </h1>
            <p className="text-xl md:text-2xl font-light text-blue-100 max-w-2xl mx-auto">
              MONITORAMENTO DA SAÚDE EM DOURADOS/MS
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {/* Atenção Primária */}
            <button onClick={onAtencaoPrimariaClick} className="group w-full">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-white/20 cursor-pointer">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-400 transition-colors">
                    <Heart size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white">
                    ATENÇÃO PRIMÁRIA
                  </h3>
                  <div className="space-y-2 text-sm text-blue-100">
                    <p>Cuidados</p>
                    <p>Informações básicas</p>
                  </div>
                </div>
              </div>
            </button>

            {/* Vigilância em Saúde */}
            <button onClick={onVigilanciaClick} className="group w-full">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-white/20 cursor-pointer">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-cyan-400 transition-colors">
                    <Eye size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white">
                    VIGILÂNCIA EM SAÚDE
                  </h3>
                  <div className="space-y-2 text-sm text-blue-100">
                    <p>Servidor</p>
                    <p>Relatórios, Boletins</p>
                  </div>
                </div>
              </div>
            </button>

            {/* Repasses Financeiros */}
            <button onClick={onRepassesFinanceirosClick} className="group w-full">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-white/20 cursor-pointer">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-400 transition-colors">
                    <DollarSign size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white">
                    REPASSES FINANCEIROS
                  </h3>
                  <div className="space-y-2 text-sm text-blue-100">
                    <p>Visualize os Dados</p>
                    <p>de Repasses Financeiros</p>
                  </div>
                </div>
              </div>
            </button>

            {/* Arboviroses */}
            <a
              href="https://arbonotifica.sems.dourados.ms.gov.br/app/auth/login/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-white/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-400 transition-colors">
                    <AlertTriangle size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white">
                    ARBOVIRÓSES
                  </h3>
                  <div className="space-y-2 text-sm text-blue-100">
                    <p>Acesse o Sistema</p>
                    <p>Arbo Notifica Dourados</p>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Additional Info Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity size={24} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Monitoramento em Tempo Real</h4>
              <p className="text-blue-200 text-sm">
                Acompanhe indicadores de saúde da cidade de Dourados em tempo real
              </p>
            </div>
            
            {/* Substituído "Dados Seguros" por "Mapas CCZ" */}
            <button 
              onClick={openCCZMaps}
              className="text-center group cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Layers size={24} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">Mapas CCZ</h4>
              <p className="text-blue-200 text-sm">
                Mapas territoriais por áreas específicas dos agentes de endemias
              </p>
            </button>
            
            {/* Mapa Territorial das UBSs */}
            <button 
              onClick={openUBSMap}
              className="text-center group cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Map size={24} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">Mapa Territorial das UBSs</h4>
              <p className="text-blue-200 text-sm">
                Acesse o mapa das Unidades Básicas de Saúde de Dourados
              </p>
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-blue-950/70 backdrop-blur-sm border-t border-blue-700/30 mt-20">
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
    </div>
  );
};
