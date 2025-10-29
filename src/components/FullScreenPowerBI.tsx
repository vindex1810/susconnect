import React, { useEffect, useState } from 'react';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

interface FullScreenPowerBIProps {
  reportType: 'vigilancia' | 'repasses' | 'atencao';
  title: string;
  onBack: () => void;
}

// Mapeamento das URLs públicas do Power BI
const REPORT_URLS = {
  vigilancia: 'https://app.powerbi.com/view?r=eyJrIjoiZjY2YTUwM2QtMWQyZS00MDQ2LWE5NDctMGRjYWFmZTU3YjQwIiwidCI6IjVkOGE4N2Q5LTZkODAtNDM5My05ZjNkLTUyOWE3MjU1MmQ3ZiJ9',
  repasses: 'https://app.powerbi.com/view?r=eyJrIjoiNzRmODJmZDEtYzFkZS00MjkyLWEwMDYtNzRhNzJiMjAxZWMwIiwidCI6IjVkOGE4N2Q5LTZkODAtNDM5My05ZjNkLTUyOWE3MjU1MmQ3ZiJ9', // ATUALIZE ESTA URL
  atencao: 'https://app.powerbi.com/view?r=eyJrIjoiYzIyZTdiOTMtN2QxMS00NDcyLWJkZDEtNjdkM2M0MjNlMDNmIiwidCI6IjVkOGE4N2Q5LTZkODAtNDM5My05ZjNkLTUyOWE3MjU1MmQ3ZiJ9' // ATUALIZE ESTA URL
};

export const FullScreenPowerBI: React.FC<FullScreenPowerBIProps> = ({
  reportType,
  title,
  onBack
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Reset states quando o reportType mudar
    setIsLoading(true);
    setError('');
  }, [reportType]);

  const handleIframeLoad = () => {
    console.log('✅ Power BI carregado com sucesso!');
    setIsLoading(false);
  };

  const handleIframeError = () => {
    console.error('❌ Erro ao carregar Power BI');
    setError('Erro ao carregar o relatório. Verifique a conexão e tente novamente.');
    setIsLoading(false);
  };

  const reportUrl = REPORT_URLS[reportType];

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <header className="bg-blue-900 text-white shadow-lg z-10 flex-shrink-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Voltar</span>
              </button>
              <div className="w-px h-6 bg-blue-700"></div>
              <h1 className="text-xl font-bold">{title}</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col min-h-0">
        {isLoading && (
          <div className="flex-1 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
              <p className="text-white text-lg">Carregando relatório Power BI...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex-1 flex items-center justify-center bg-gray-900">
            <div className="text-center max-w-md mx-auto px-6">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-white text-lg mb-4">{error}</p>
              <button
                onClick={onBack}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Voltar
              </button>
            </div>
          </div>
        )}

        {/* Iframe do Power BI */}
        {!error && (
          <div 
            className="flex-1 min-h-0" 
            style={{ display: isLoading ? 'none' : 'block' }}
          >
            <iframe
              key={reportType} // Força recarregar quando mudar o relatório
              src={reportUrl}
              className="w-full h-full border-0"
              allowFullScreen
              title={`Relatório Power BI - ${title}`}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        )}
      </div>
    </div>
  );
};
