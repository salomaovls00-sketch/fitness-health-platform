import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.fullName || !formData.age || !formData.gender || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error('Por favor, preencha todos os campos');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('As senhas nao coincidem');
      }

      if (formData.password.length < 6) {
        throw new Error('A senha deve ter no minimo 6 caracteres');
      }

      const response = await authService.register({
        fullName: formData.fullName,
        age: parseInt(formData.age),
        gender: formData.gender,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      const { token, user } = response.data;
      login(token, user);
      navigate('/calculator');
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
        err.message ||
        'Erro ao se cadastrar. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">Cadastro</h1>
          <p className="text-center text-gray-600 mb-8">
            Crie sua conta na Fitness Platform
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idade
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="18"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genero
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu.email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimo 6 caracteres"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Senha
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme sua senha"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Ja tem conta?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Faca login aqui
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => navigate('/')}
              className="w-full text-gray-600 hover:text-gray-900 font-semibold py-2 px-4"
            >
              ← Voltar para Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;