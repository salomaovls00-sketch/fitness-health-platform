import React, { useEffect, useState } from 'react';
import { imcService } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface IMCRecord {
  id: number;
  weight: number;
  height: number;
  imc: number;
  classification: string;
  recordDate: string;
}

interface Statistics {
  totalRecords: number;
  averageIMC: number;
  minIMC: number;
  maxIMC: number;
  minWeight: number;
  maxWeight: number;
}

const Dashboard: React.FC = () => {
  const [lastIMC, setLastIMC] = useState<IMCRecord | null>(null);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [history, setHistory] = useState<IMCRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lastResponse, statsResponse, historyResponse] = await Promise.all([
          imcService.getLastIMC(),
          imcService.getStatistics(),
          imcService.getHistory(),
        ]);

        setLastIMC(lastResponse.data.record);
        setStatistics(statsResponse.data.statistics);
        setHistory(historyResponse.data.records);
      } catch (err: any) {
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getIMCColor = (classification: string) => {
    switch (classification) {
      case 'Abaixo do peso':
        return 'bg-blue-100 text-blue-800';
      case 'Peso normal':
        return 'bg-green-100 text-green-800';
      case 'Sobrepeso':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const chartData = history.slice().reverse().map((record) => ({
    date: new Date(record.recordDate).toLocaleDateString('pt-BR'),
    imc: parseFloat(record.imc.toString()),
    weight: parseFloat(record.weight.toString()),
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">Acompanhe sua evolucao fitness</p>

        {lastIMC && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Seu Ultimo Calculo</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Peso</p>
                <p className="text-3xl font-bold text-gray-900">{lastIMC.weight} kg</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Altura</p>
                <p className="text-3xl font-bold text-gray-900">{lastIMC.height} m</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">IMC</p>
                <p className="text-3xl font-bold text-blue-600">{lastIMC.imc}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Classificacao</p>
                <span className={`inline-block px-4 py-2 rounded-lg font-semibold ${getIMCColor(lastIMC.classification)}`}>
                  {lastIMC.classification}
                </span>
              </div>
            </div>
          </div>
        )}

        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <p className="text-gray-600 text-sm">Total de Registros</p>
              <p className="text-3xl font-bold text-gray-900">{statistics.totalRecords}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <p className="text-gray-600 text-sm">IMC Medio</p>
              <p className="text-3xl font-bold text-gray-900">{statistics.averageIMC}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <p className="text-gray-600 text-sm">Variacao IMC</p>
              <p className="text-3xl font-bold text-gray-900">
                {(statistics.maxIMC - statistics.minIMC).toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {chartData.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Evolucao do IMC</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="imc" stroke="#0ea5e9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {history.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Historico de Medicoes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Data</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Peso (kg)</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Altura (m)</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">IMC</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Classificacao</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {history.slice(0, 10).map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(record.recordDate).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{record.weight}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{record.height}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{record.imc}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getIMCColor(record.classification)}`}>
                          {record.classification}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;