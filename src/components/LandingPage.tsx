import React from 'react';
import {
  Heart,
  Eye,
  DollarSign,
  AlertTriangle,
  Menu,
  Activity,
  Shield,
  MapPin,
  LogOut,
  User,
  Mail
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
  
  // Função para formatar o email (opcional)
  const formatEmail = (email: string) => {
    // Pega a parte antes do @ ou retorna o email completo
    const atIndex = email.indexOf('@');
    return atIndex > 0 ? email.substring(0, atIndex) : email;
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
                    <div className="w-px h-6 bg-blue-400/50"></div>
                    <button
                      onClick={onLogout}
                      className="flex items-center space-x-2 bg-red-600/80 hover:bg-red-700/80 px-3 py-2 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                    >
                      <LogOut size={16} className="text-white" />
                      <span className="text-sm font-medium text-white">Sair</span>
                    </button>
                  </div>
                )}
                <button className="md:hidden">
                  <Menu size={24} />
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
};
