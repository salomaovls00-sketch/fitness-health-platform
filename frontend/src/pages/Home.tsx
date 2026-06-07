import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Fitness Platform</h1>
            <div className="space-x-4">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate('/calculator')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Calculadora
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-blue-600 hover:text-blue-700"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Cadastro
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Sua Jornada de Saude Comeca Aqui
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Acompanhe seu indice de massa corporal, monitore sua evolucao e alcan e seus objetivos de fitness com nossa plataforma completa e intuitiva.
        </p>
        {!isAuthenticated && (
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Comece Agora
          </button>
        )}
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Recursos Principais</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Calculo de IMC</h4>
            <p className="text-gray-600">
              Calcule seu indice de massa corporal de forma precisa e obtenha uma classificacao conforme padroes da OMS.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl mb-4">📈</div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Historico Completo</h4>
            <p className="text-gray-600">
              Mantenha um historico detalhado de todas as suas medicoes e acompanhe sua evolucao ao longo do tempo.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Dashboard Intuitivo</h4>
            <p className="text-gray-600">
              Visualize suas estatisticas, graficos interativos e todas as informacoes importantes em um unico lugar.
            </p>
          </div>
        </div>
      </div>

      {/* IMC Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Classificacao de IMC (OMS)</h3>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Classificacao</th>
                <th className="px-6 py-3 text-left">Indice de Massa Corporal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-3 font-semibold text-gray-900">Abaixo do peso</td>
                <td className="px-6 py-3 text-gray-600">IMC &lt; 18.5</td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="px-6 py-3 font-semibold text-gray-900">Peso normal</td>
                <td className="px-6 py-3 text-gray-600">18.5 ≤ IMC &lt; 25</td>
              </tr>
              <tr className="hover:bg-yellow-50">
                <td className="px-6 py-3 font-semibold text-gray-900">Sobrepeso</td>
                <td className="px-6 py-3 text-gray-600">25 ≤ IMC &lt; 30</td>
              </tr>
              <tr className="hover:bg-red-50">
                <td className="px-6 py-3 font-semibold text-gray-900">Obesidade Grau I</td>
                <td className="px-6 py-3 text-gray-600">30 ≤ IMC &lt; 35</td>
              </tr>
              <tr className="hover:bg-red-50">
                <td className="px-6 py-3 font-semibold text-gray-900">Obesidade Grau II</td>
                <td className="px-6 py-3 text-gray-600">35 ≤ IMC &lt; 40</td>
              </tr>
              <tr className="hover:bg-red-50">
                <td className="px-6 py-3 font-semibold text-gray-900">Obesidade Grau III</td>
                <td className="px-6 py-3 text-gray-600">IMC ≥ 40</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 Fitness & Health Platform. Desenvolvido para apresentacao em mostra cientifica universitaria.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;