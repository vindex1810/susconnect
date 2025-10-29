import React, { useEffect, useState } from 'react';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

interface FullScreenPowerBIProps {
  reportType: 'vigilancia' | 'repasses' | 'atencao';
  title: string;
  onBack: () => void;
}

export const FullScreenPowerBI: React.FC<FullScreenPowerBIProps> = ({
  reportType,
  title,
  onBack
}) => {
  const [powerBIUrl, setPowerBIUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPowerBIUrl = async () => {
      try {
        setIsLoading(true);
        setError('');

        console.log('🔄 Starting fetch for report:', reportType);

        // URL da Edge Function
        const functionUrl = `https://yimjmqkwlptdaswljgty.supabase.co/functions/v1/powerbi-proxy?report=${reportType}`;

        console.log('📡 Fetching from:', functionUrl);

        const response = await fetch(functionUrl);
        console.log('✅ Response status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        // Recebe HTML
        const html = await response.text();
        console.log('📄 HTML received, length:', html.length);
        
        // Cria URL blob
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        console.log('🔗 Blob URL created:', url);
        
        setPowerBIUrl(url);
        setIsLoading(false);
        console.log('🎉 State updated, iframe should load');
        
      } catch (err) {
        console.error('❌ Error:', err);
        setError('Erro ao carregar o relatório. Tente novamente.');
        setIsLoading(false);
      }
    };

    fetchPowerBIUrl();

    // Cleanup
    return () => {
      if (powerBIUrl) {
        URL.revokeObjectURL(powerBIUrl);
        console.log('🧹 Cleanup: blob URL revoked');
      }
    };
  }, [reportType, powerBIUrl]);

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
              <p className="text-white text-lg">Carregando relatório...</p>
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

        {!isLoading && !error && powerBIUrl && (
          <div className="flex-1 min-h-0">
            <iframe
              src={powerBIUrl}
              className="w-full h-full border-0"
              allowFullScreen
              title={title}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              onLoad={() => console.log('✅ Iframe loaded successfully!')}
              onError={(e) => console.error('❌ Iframe error:', e)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
