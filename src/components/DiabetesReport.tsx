import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  MapPin, 
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Activity,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface DiabetesReportProps {
  onBack: () => void;
}

export const DiabetesReport: React.FC<DiabetesReportProps> = ({ onBack }) => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedUnit, setSelectedUnit] = useState('Dourados');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [filterStatus, setFilterStatus] = useState('Válidos');

  // Dados simulados para as métricas
  const metrics = [
    { label: '% com hemoglobina glicada válida', value: 'xx%', color: 'bg-blue-100 text-blue-800' },
    { label: '% pacientes avaliados', value: 'xx%', color: 'bg-blue-100 text-blue-800' },
    { label: '% com PA aferida', value: 'xx%', color: 'bg-blue-100 text-blue-800' },
    { label: '% Visita ACS', value: 'xx%', color: 'bg-blue-100 text-blue-800' },
    { label: '% Antropometria', value: 'xx%', color: 'bg-blue-100 text-blue-800' },
    { label: 'Nota ESF %', value: 'xx%', color: 'bg-green-100 text-green-800', highlight: true }
  ];

  // Dados das equipes
  const teamData = [
    { team: 'ESF 39', percentage: 94, color: 'bg-blue-500' },
    { team: 'ESF 27', percentage: 89, color: 'bg-blue-400' },
    { team: 'ESF 58', percentage: 87, color: 'bg-blue-400' },
    { team: 'ESF 17', percentage: 74, color: 'bg-green-500' },
    { team: 'ESF 40', percentage: 42, color: 'bg-yellow-500' },
    { team: 'ESF 39', percentage: 21, color: 'bg-red-500' }
  ];

  // Dados dos pacientes
  const patients = [
    {
      name: 'AIDA RAMONA FERREIRA DA COSTA',
      cpf: '53231892134',
      cns: '708089757311',
      age: 79,
      team: 'Clínico',
      esf: '39',
      visitaAcs: false,
      antropometria: true,
      paValida: true,
      classification: 'Suficiente',
      whatsapp: true
    },
    {
      name: 'AIDIA PINHEIRO DA SILVA',
      cpf: '0358424719',
      cns: '708022535165',
      age: 85,
      team: 'Clínico',
      esf: '39',
      visitaAcs: true,
      antropometria: true,
      paValida: false,
      classification: 'Regular',
      whatsapp: true
    },
    {
      name: 'DIAS ALVES DA SILVA FILHO',
      cpf: '0112841941',
      cns: '708014467253',
      age: 39,
      team: 'Clínico',
      esf: '39',
      visitaAcs: true,
      antropometria: true,
      paValida: false,
      classification: 'Bom',
      whatsapp: true
    },
    {
      name: 'DIAS FIRMINO DA SILVA',
      cpf: '05377827891',
      cns: '008040478997',
      age: 85,
      team: 'Clínico',
      esf: '39',
      visitaAcs: true,
      antropometria: false,
      paValida: true,
      classification: 'Ótimo',
      whatsapp: true
    },
    {
      name: 'AIDAI RAMONA FERREIRA DA COSTA',
      cpf: '51202131269',
      cns: '73318981',
      age: 39,
      team: 'Clínico',
      esf: '30',
      visitaAcs: true,
      antropometria: true,
      paValida: true,
      classification: 'Ótimo',
      whatsapp: false
    }
  ];

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'Regular': return 'bg-red-500 text-white';
      case 'Suficiente': return 'bg-yellow-500 text-white';
      case 'Bom': return 'bg-green-500 text-white';
      case 'Ótimo': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg">
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
              <h1 className="text-2xl font-bold">Gerencial Consolidado - Diabéticos</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unidade</label>
              <select 
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Dourados">Dourados</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Equipe</label>
              <select 
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas</option>
                <option value="39">ESF 39</option>
                <option value="27">ESF 27</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Idade Mínima</label>
              <input
                type="number"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Min"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Idade Máxima</label>
              <input
                type="number"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`rounded-lg p-4 text-center ${
                metric.highlight 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                  : 'bg-white shadow-md'
              }`}
            >
              <div className={`text-2xl font-bold mb-2 ${metric.highlight ? 'text-white' : 'text-blue-600'}`}>
                {metric.value}
              </div>
              <div className={`text-xs ${metric.highlight ? 'text-green-100' : 'text-gray-600'}`}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Classificação por Equipe */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Classificação por equipe</h3>
            <div className="space-y-3">
              {teamData.map((team, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-16 text-sm font-medium text-gray-700">{team.team}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                    <div
                      className={`${team.color} h-6 rounded-full flex items-center justify-end pr-2`}
                      style={{ width: `${team.percentage}%` }}
                    >
                      <span className="text-white text-xs font-medium">{team.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mapa */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="mr-2" size={20} />
              Mapa
            </h3>
            <div className="bg-green-50 rounded-lg h-64 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200">
                {/* Simulação de pontos no mapa */}
                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="absolute top-2/3 left-2/3 w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-green-500 rounded-full"></div>
                
                {/* Labels do mapa */}
                <div className="absolute bottom-4 right-4 text-xs text-gray-600">Jardim Guaicurus</div>
              </div>
            </div>
            
            {/* Legenda de classificação */}
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center">
                  <div className="bg-blue-500 text-white rounded px-2 py-1 mb-1">7,25</div>
                  <div className="text-gray-600">NOTA DA ESF</div>
                </div>
                <div className="text-center">
                  <div className="bg-green-500 text-white rounded px-2 py-1 mb-1">Bom</div>
                </div>
              </div>
              
              <div className="mt-3 flex justify-between text-xs text-gray-600">
                <span>Regular</span>
                <span>Suficiente</span>
                <span>Bom</span>
                <span>Ótimo</span>
              </div>
              <div className="flex mt-1">
                <div className="flex-1 bg-red-400 h-2"></div>
                <div className="flex-1 bg-yellow-400 h-2"></div>
                <div className="flex-1 bg-green-400 h-2"></div>
                <div className="flex-1 bg-blue-400 h-2"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>&lt; 25%</span>
                <span>&gt; 50%</span>
                <span>&gt; 75%</span>
                <span>&gt; 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Exportação */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <FileText size={16} />
            <span>NOTA TÉCNICA</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download size={16} />
            <span>EXPORTAR CSV</span>
          </button>
          <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            <Download size={16} />
            <span>EXPORTAR EXCEL</span>
          </button>
        </div>

        {/* Lista de Pacientes */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Lista de Pacientes</h3>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Válidos">Válidos</option>
                <option value="Todos">Todos</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Nome</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">CPF</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">CNS</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Idade</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">ESF</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Visita ACS</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Antropometria</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">P.A Válida</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Pontuação</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Classificação</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">WhatsApp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {patients.map((patient, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{patient.name}</td>
                      <td className="px-4 py-3 text-gray-600">{patient.cpf}</td>
                      <td className="px-4 py-3 text-gray-600">{patient.cns}</td>
                      <td className="px-4 py-3 text-gray-600">{patient.age}</td>
                      <td className="px-4 py-3 text-gray-600">{patient.team}</td>
                      <td className="px-4 py-3 text-gray-600">{patient.esf}</td>
                      <td className="px-4 py-3">
                        {patient.visitaAcs ? (
                          <CheckCircle className="text-green-500" size={20} />
                        ) : (
                          <XCircle className="text-red-500" size={20} />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {patient.antropometria ? (
                          <CheckCircle className="text-green-500" size={20} />
                        ) : (
                          <XCircle className="text-red-500" size={20} />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {patient.paValida ? (
                          <CheckCircle className="text-green-500" size={20} />
                        ) : (
                          <XCircle className="text-red-500" size={20} />
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">-</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getClassificationColor(patient.classification)}`}>
                          {patient.classification}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {patient.whatsapp && (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">W</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};