import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imcService } from '../services/api';

const IMCCalculator: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!formData.weight || !formData.height) {
        throw new Error('Por favor, preencha peso e altura');
      }

      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);

      if (weight <= 0 || weight > 500) {
        throw new Error('Peso deve estar entre 0 e 500 kg');
      }

      if (height <= 0 || height > 3) {
        throw new Error('Altura deve estar entre 0 e 3 metros');
      }

      const response = await imcService.calculate(weight, height);
      setResult(response.data.result);
      setSuccess('IMC calculado com sucesso!');
      setFormData({ weight: '', height: '' });
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Erro ao calcular IMC');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-900">Calculadora de IMC</h1>
          <p className="text-center text-gray-600 mb-8">
            Calcule seu Indice de Massa Corporal de forma precisa e confiavel
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peso (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Ex: 75.5"
                step="0.1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Altura (metros)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Ex: 1.75"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 text-lg"
            >
              {loading ? 'Calculando...' : 'Calcular IMC'}
            </button>
          </form>

          {result && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resultado</h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-600 text-sm">Peso</p>
                  <p className="text-2xl font-bold text-gray-900">{result.weight} kg</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-600 text-sm">Altura</p>
                  <p className="text-2xl font-bold text-gray-900">{result.height} m</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 mb-6">
                <p className="text-gray-600 text-sm mb-2">Seu IMC</p>
                <p className="text-5xl font-bold text-blue-600 mb-4">{result.imc}</p>
                <span className={`inline-block px-4 py-2 rounded-lg font-semibold ${getIMCColor(result.classification)}`}>
                  {result.classification}
                </span>
              </div>

              <div className="bg-white rounded-lg p-4 text-sm text-gray-600">
                <p className="font-semibold text-gray-900 mb-2">Tabela de Classificacao (OMS)</p>
                <ul className="space-y-1">
                  <li>Abaixo do peso: IMC &lt; 18.5</li>
                  <li>Peso normal: 18.5 ≤ IMC &lt; 25</li>
                  <li>Sobrepeso: 25 ≤ IMC &lt; 30</li>
                  <li>Obesidade Grau I: 30 ≤ IMC &lt; 35</li>
                  <li>Obesidade Grau II: 35 ≤ IMC &lt; 40</li>
                  <li>Obesidade Grau III: IMC ≥ 40</li>
                </ul>
              </div>

              <button
                onClick={() => navigate('/dashboard')}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                Ver Historico
              </button>
            </div>
          )}

          {!result && (
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Como usar a calculadora?</h3>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li>Insira seu peso em quilogramas (kg)</li>
                <li>Insira sua altura em metros (m)</li>
                <li>Clique em "Calcular IMC"</li>
                <li>Veja o resultado e sua classificacao</li>
                <li>O calculo e salvo automaticamente no historico</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IMCCalculator;