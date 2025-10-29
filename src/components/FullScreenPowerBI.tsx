import React, { useEffect, useState } from 'react';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

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

        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          setError('Você precisa estar autenticado para visualizar este relatório.');
          setIsLoading(false);
          return;
        }

        const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/powerbi-proxy?report=${reportType}`;

        const response = await fetch(functionUrl, {
  headers: {
    'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Falha ao carregar relatório');
        }

        // ✅ MODIFICADO: Agora recebemos HTML em vez de JSON
        const html = await response.text();
        
        // ✅ MODIFICADO: Criar uma URL blob para o HTML recebido
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        setPowerBIUrl(url);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching Power BI URL:', err);
        setError('Erro ao carregar o relatório. Tente novamente.');
        setIsLoading(false);
      }
    };

    fetchPowerBIUrl();

    // ✅ ADICIONADO: Cleanup function para revogar a URL blob
    return () => {
      if (powerBIUrl) {
        URL.revokeObjectURL(powerBIUrl);
      }
    };
  }, [reportType, powerBIUrl]); // ✅ ADICIONADO: powerBIUrl nas dependências

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
              // ✅ ADICIONADO: sandbox para segurança
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
        )}
      </div>
    </div>
  );
};
