import React from 'react';
import { X } from 'lucide-react';

interface PowerBIViewerProps {
  isOpen: boolean;
  onClose: () => void;
  powerBIUrl: string;
  title: string;
}

export const PowerBIViewer: React.FC<PowerBIViewerProps> = ({ isOpen, onClose, powerBIUrl, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white rounded-lg shadow-2xl w-[95vw] h-[95vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-blue-900 text-white rounded-t-lg">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="hover:bg-blue-800 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 p-4 bg-gray-50">
          <iframe
            src={powerBIUrl}
            className="w-full h-full rounded border-2 border-gray-200"
            frameBorder="0"
            allowFullScreen
            title={title}
          />
        </div>
      </div>
    </div>
  );
};
